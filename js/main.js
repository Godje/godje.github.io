var opts = {
    count: 3,
    size: 50,
    sizeRandom: 10,
    sparkLife: 0.1,
    spawnOpacity: 1,

    //must be RGBA. alpha stands for opacity, usually 1
    color: "rgba(0,0,0, alpha)"
  },

  canvasBody = document.getElementById("canvas"),
  canvas = canvasBody.getContext("2d"),
  w = canvasBody.width = window.innerWidth,
  h = canvasBody.height = window.innerHeight;
//document.getElementsByClassName("card")[0].style["background-color"] = opts.color.replace("alp", "1");
function step() {
  var fillColor = opts.color.replace("alpha", opts.spawnOpacity);
  canvas.fillStyle = fillColor;
  for (var i = 0; i < Math.round(opts.count); i++) {
    var random = Math.random() * opts.sizeRandom;
    canvas.fillRect(-(opts.size/2) + Math.random() * w, -(opts.size/2) + Math.random() * h, opts.size + random, opts.size + random)
  }
  canvas.fillStyle = "rgba(255,255,255," + opts.sparkLife + ")"
  canvas.fillRect(0, 0, w, h)
}

function anim() {
  setTimeout(function() {
    window.requestAnimationFrame(anim)
  }, 1000 / 30)
  step();
}

anim();
window.addEventListener("resize", function(){
  w = canvasBody.width = window.innerWidth;
  h = canvasBody.height = window.innerHeight;
})
