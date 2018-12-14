module.exports = function(c){
	let $ = c.getContext("2d"),
		w = c.width = window.innerWidth,
		h = c.height = window.innerHeight,
		opts = {
			dotsize: 3,
			spacing: 5,
			color: "rgba(0,0,0,0.1)",
			acolor: "rgba(140,0,0,0.1)",
			background: "#eee",
			startRunners: 6,
			deathChance: 0.025,
			birthChance: 0.1,
			accentChance: 0.2,
			stepTime: 40
		},
		directions = [
			[0, 1],
			[0, -1],
			[1, 0],
			[-1, 0]
		],
		runners = [],
		maxw = Math.floor( w / opts.dotsize ),
		maxh = Math.floor( h / opts.dotsize ),
		randomFromArray = function(arr){
			let l = arr.length;
			let n = Math.floor( Math.random()*l );
			return arr[n];
		},
		resize = function(){
			w = c.width = window.innerWidth;
			h = c.height = window.innerHeight;
			maxw = Math.floor( w / opts.dotsize );
			maxh = Math.floor( h / opts.dotsize );
			$.fillStyle = opts.background;
			$.fillRect(0,0,w,h);
		}

	class Runner{
		constructor(){
			this.direction = [0, 0];
			this.birth();
			this.interval = setInterval( this.update.bind(this), opts.stepTime);
		}
		update(){
			this.direction = randomFromArray(directions);
			Math.random() < opts.deathChance ?
				this.die() : this.move();
		}
		move(){
			this.x += this.direction[0];
			this.y += this.direction[1];
		}
		birth(){
			this.x = Math.floor(Math.random()*maxw);
			this.y = Math.floor(Math.random()*maxh);
			this.color = Math.random() < opts.accentChance ? opts.acolor : opts.color;
		}
		die(){
			runners.splice( runners.indexOf( this ), 1);
			clearInterval(this.interval);
		}
		get pos(){
			return [this.x, this.y];
		}
	}

	function setup(){
		for(let i = 0; i < opts.startRunners; i++){
			runners.push(new Runner());
		}
		loop();
		$.fillStyle = opts.background;
		$.fillRect(0,0,w,h);
	}

	function loop(){
		$.fillStyle = opts.color;
		runners.forEach(function(r){
			$.fillStyle = r.color;
			$.fillRect(r.x*opts.spacing, r.y*opts.spacing, opts.dotsize, opts.dotsize);
		});
		if(Math.random() < opts.birthChance) runners.push(new Runner());
		requestAnimationFrame(loop);
	}

	setup();

	window.addEventListener("resize", resize);
}
