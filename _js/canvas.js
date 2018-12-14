(()=>{
  let $ = c.getContext('2d'),
      w = c.width = window.innerWidth,
      h = c.height = window.innerHeight,
      opts = {
        amount: 10,
      },
      {PI, cos, sin, sqrt} = Math, sqrt2 = sqrt(2), pi2 = PI*2, piDeg = PI/180,
      squares,
      random = n=>Math.random()*(n||1);
  function setup(){
    squares = new Array(opts.amount).fill(new Square());
  }
  function loop(){}

  class Square {
    constructor(){
      this.reach = 1 - random()*random();
      this.progress = random();
      this.speed = random()*random()*random();
    }
    update(){
      this.progress+=this.speed;
      return this;
    }
    render($){
      $.strokeStyle = "#333";
      $.lineWidth = 8;
      $.strokeRect(w*this.reach*this.progress)
    }
  }

  setup();
})()
