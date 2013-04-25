var Player = Backbone.Model.extend({
  settings : {
    playerSpeed : 5,
    bulletSpeed : 10
  },
  pos : {
    x : 40,
    y : 40
  },
  properties : {
    width : 40,
    height: 40
  },

  bullets : [],

  mouse : function(xpos, ypos, type) {
    if (type == "mousedown") {
      var xstart = this.pos.x + this.properties.width/2;
      var ystart = this.pos.y + this.properties.height/2;
      var xend = xpos;
      var yend = ypos;
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
    }
  },

  pressed : {},

  keys : function(key, state) {
    if (state == "keydown")
      this.pressed[key] = true
    else if (state == "keyup")
      this.pressed[key] = false
  },

  move : function(ctx) {
    var moveRate = this.settings.playerSpeed;
    for (key in this.pressed) {
      if (this.pressed[key]) {
        if (key == 87 && this.pos.y >= 0) // up
          this.pos.y -= moveRate;
        else if (key == 83 && this.pos.y <= ctx.canvas.height - this.properties.height) // down
          this.pos.y += moveRate;
        else if (key == 65 && this.pos.x >= 0) // left
          this.pos.x -= moveRate;
        else if (key == 68 && this.pos.x <= ctx.canvas.width - this.properties.width) // right
          this.pos.x += moveRate;
        else if (key == 16) 
          this.settings.playerSpeed = 20;
      }
      else {
        if (key == 16)
          this.settings.playerSpeed = 5;
      }
      
    }
  },

  draw : function(ctx) {
    ctx.fillStyle = "#4D8B4D";
    ctx.beginPath();
    ctx.rect(this.pos.x, this.pos.y, this.properties.width, this.properties.height);
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

      if (bullet.x > ctx.canvas.width || bullet.x < 0 ) {
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

    for ( var b in this.bullets ) {
      var bullet = this.bullets[b];
      ctx.fillStyle = "#333333";
      ctx.rect(bullet.x, bullet.y, 10, 10);
      ctx.closePath();
      ctx.fill();
    }
  }
    
});
