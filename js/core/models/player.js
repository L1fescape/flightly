var Player = Backbone.Model.extend({
  settings : {
    playerSpeed : 5,
    bulletSpeed : 10,
    width : 40,
    height: 40,
    bulletSize : 10
  },
  pos : {
    x : 40,
    y : 40
  },

  bullets : [],

  bullet : function() {
    var xstart = this.pos.x + this.settings.width/2;
    var ystart = this.pos.y + this.settings.height/2;
    var xend = this.mouse.xpos;
    var yend = this.mouse.ypos;
    var dir = (yend - ystart) / (xend - xstart);
    var ydir = Math.sin(dir);
    if (dir < 0)
      ydir *= -1;
    var xdir = Math.cos(dir); 
    if (xend-xstart < 0)
      xdir *= -1;
    if (yend-ystart < 0 || dir < 0)
      ydir *= -1;
    this.bullets.push({x : xstart, y : ystart, xdir : xdir, ydir : ydir});
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
    else
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
      this.bullet();
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
      ctx.fillRect(bullet.x, bullet.y, this.settings.bulletSize, this.settings.bulletSize);
    }
  }
    
});
