var Engine = Backbone.Model.extend({
  canvas : {},
  ctx : {},
  view : {},
    
  settings : {},
  interval : 0,
  init : function() {
    this.view = new GameView();
    this.view.init(this);
  },
  start : function() {
    clearInterval(this.interval);
    this.interval = setInterval(this.view.render, 10);
  },
  stop : function() {
    clearInterval(this.interval);
  }

});
