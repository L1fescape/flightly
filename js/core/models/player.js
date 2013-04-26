var Player = Backbone.Model.extend({
  settings : {
    playerSpeed : 5,
    bulletSpeed : 10,
    bulletRate : 20,
    bulletSize : 2,
    lastTimeFired : 0,
    width : 40,
    height: 40,
  },
  pos : {
    x : 40,
    y : 40
  },

  bullets : [],

  fire : function() {
    var curSeconds = (new Date).getTime();
    if (curSeconds - this.settings.lastTimeFired > this.settings.bulletRate) {
      this.settings.lastTimeFired = curSeconds;
      // start inside player
      var xplayer = this.pos.x + this.settings.width/2;
      var yplayer = this.pos.y + this.settings.height/2;
      var xmouse = this.mouse.xpos;
      var ymouse = this.mouse.ypos;
      // get slope
      var angleRadian = Math.atan2(ymouse - yplayer, xmouse - xplayer);
      // calculate x and y directions
      var ydir = Math.sin(angleRadian);
      var xdir = Math.cos(angleRadian); 
      console.log(ydir, xdir)
      // bullet rotation
      var rotation = angleRadian * 180 / Math.PI;
      this.bullets.push({x : xplayer, y : yplayer, xdir : xdir, ydir : ydir, rotation : rotation});
    }
  },

  mouse : {
    down : false,
    xpos : 0,
    ypos : 0
  },

  pressed : {},

  keys : function(key, state) {
    if (state == "keydown")
      this.pressed[key] = true
    else if (state == "keyup")
      this.pressed[key] = false
  },

  mouse : function(xpos, ypos, state) {
    this.mouse.xpos = xpos;
    this.mouse.ypos = ypos;
    if (state == "mousedown")
      this.mouse.down = true;
    else if (state == "mouseup")
      this.mouse.down = false;
  },

  move : function(ctx) {
    var moveRate = this.settings.playerSpeed;
    for (key in this.pressed) {
      if (this.pressed[key]) { // keydown
        if (key == 87 && this.pos.y >= 0) // up
          this.pos.y -= moveRate;
        else if (key == 83 && this.pos.y <= ctx.canvas.height - this.settings.height) // down
          this.pos.y += moveRate;
        else if (key == 65 && this.pos.x >= 0) // left
          this.pos.x -= moveRate;
        else if (key == 68 && this.pos.x <= ctx.canvas.width - this.settings.width) // right
          this.pos.x += moveRate;
        else if (key == 16) 
          this.settings.playerSpeed = 20;
      }
      else { // keyup
        if (key == 16)
          this.settings.playerSpeed = 5;
      }
    }
    if (this.mouse.down) {
      this.fire();
    }
  },

  draw : function(ctx) {
    ctx.fillStyle = "#4D8B4D";
    ctx.beginPath();
    ctx.rect(this.pos.x, this.pos.y, this.settings.width, this.settings.height);
    ctx.closePath();
    ctx.fill();

    this.moveBullets(ctx);
    this.drawBullets(ctx);
  },

  moveBullets : function(ctx) {
    var bulletSpeed = this.settings.bulletSpeed;
    var bulletsToDelete = [];

    for ( var b in this.bullets ) {
      var bullet = this.bullets[b];
      bullet.x += bullet.xdir * bulletSpeed;
      bullet.y += bullet.ydir * bulletSpeed;

      if (bullet.x > ctx.canvas.width || bullet.x + this.settings.bulletSize < 0 ||
          bullet.y > ctx.canvas.height || bullet.y + this.settings.bulletSize < 0) {
        bulletsToDelete.push(parseInt(b));
      }
    }

    var offset = 0;
    for (var b in bulletsToDelete) {
      this.bullets.splice(b-offset, 1);
      offset++;
    }
  },


  drawBullets : function(ctx) {
    ctx.fillStyle = "#333333";
    var bullet;
    for ( var b in this.bullets ) {
      bullet = this.bullets[b];
      ctx.fillRect(bullet.x, bullet.y, this.settings.bulletSize * 2, this.settings.bulletSize);
    }
  }
    
});
