var Player = Backbone.Model.extend({
  pos : {
    x : 40,
    y : 40
  },
  properties : {
    width : 40,
    height: 40
  },
	pressed : {},
	keys : function(key, state) {
    if ( key == 87 && state == "keydown" )
      this.pos.y -= 20;
    if ( key == 83 && state == "keydown" )
      this.pos.y += 20;
    if ( key == 68 && state == "keydown" )
      this.pos.x += 20;
    if ( key == 65 && state == "keydown" )
      this.pos.x -= 20;
	},
  draw : function(ctx) {
    ctx.fillStyle = "#4D8B4D";
    ctx.beginPath();
    ctx.rect(this.pos.x, this.pos.y, this.properties.width, this.properties.height);
    ctx.closePath();
    ctx.fill();
  }
		
});
