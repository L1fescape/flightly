var GameView = Backbone.View.extend({
  el : "#gameBoard",
  
  // Models
  engine : {},
  world : {},
  player : {},

  events : {
  },
  
  init : function(engine) {
    // Grab engine
    this.engine = engine;
    this.engine.canvas = $(this.el)[0];
    this.engine.ctx = this.engine.canvas.getContext('2d');
    
    // Create New Player
    this.player = new Player();


    // Bind keyboard input
    _.bindAll(this);
    $(document).bind({
      'keydown' : this.keys,
      'keyup' : this.keys,
      'mousedown' : this.mouse,
      'mouseup' : this.mouse
    });
    $(window).on("resize", this.resize)

    this.resize();
    this.render();
  },
  
  render : function() {
    this.clear();

    this.player.move(this.engine.ctx);
    this.player.draw(this.engine.ctx);
  },

  clear : function() {
    var width = this.engine.canvas.width;
    var height = this.engine.canvas.height;
    
    var ctx = this.engine.ctx;
    ctx.clearRect( 0, 0, width, height);
    
    ctx.fillStyle = "#CED6B4";
    ctx.beginPath();
    ctx.rect(0, 0, width, height);
    ctx.closePath();
    ctx.fill();
  },
  
  resize : function() {
    var width = $(this.el).width();
    var height = $(this.el).height();

    var canvas = this.engine.canvas;
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = width;
    canvas.style.height = height;
  },

  keys : function(e) {
    this.player.keys(e.which, e.type);
  },

  mouse : function(e) {
    this.player.mouse(e.clientX, e.clientY, e.type);
  }

});

