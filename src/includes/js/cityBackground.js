(function() {
	/** Configuration */
	const config = {
		smallBuildingMinCount: 5,
		bigBuildingMinCount: 2,
		cloudClustersMinCount: 5,
		backgroundColor: '#fcf4eb',
		buildingColor: '#9f6d59',

		// small buildings
		smallBuildingMinHeight: 0.05, // ratio to viewport height
		smallBuildingMaxHeight: 0.4,

		smallBuildingMinWidth: 0.3, // ratio to building's height
		smallBuildingMaxWidth: 0.8,

		smallBuildingMinOpacity: 0.8, // ratio to building's height
		smallBuildingMaxOpacity: 1,

		// big buildings
		bigBuildingMinHeight: 0.4, // ratio to viewport height
		bigBuildingMaxHeight: 0.8,

		bigBuildingMinWidth: 0.25, // ratio to building's height
		bigBuildingMaxWidth: 0.5,

		bigBuildingMinOpacity: 0.4,
		bigBuildingMaxOpacity: 0.6,

		// clouds
		cloudMinWidth: 0.05, // ratio to viewport's width
		cloudMaxWidth: 0.11,

		cloudMinHeight: 0.1, // ratio to cloud's width
		cloudMaxHeight: 0.4,

		cloudClusterMinSpeed: 0.1,
		cloudClusterMaxSpeed: 0.3,

		maxCloudsInCluster: 3,

		cloudMinY: 0.2, // from the ground, not from the top
		cloudMaxY: 0.4
	};

	/** Helper functions */
	function random(min, max) {
		return Math.random() * (max - min) + min;
	}

	function $(query) {
		let result = document.querySelectorAll(query);
		if (result.length > 1) return result;
		else return result[0];
	}

	function clearNode(myNode) {
		while (myNode.lastElementChild) {
			myNode.removeChild(myNode.lastElementChild);
		}
		myNode.textContent = '';
	}

	function createElement(sel, className) {
		const el = document.createElement(sel);
		if (className) el.className = className;

		return el;
	}

	function createSvgElement(sel, options) {
		const el = document.createElementNS("http://www.w3.org/2000/svg", sel);
		for (const option of Object.keys(options)) {
			el.setAttribute(option, options[option]);
		}
		return el;
	}

	function debounce(func, debounceMs) {
		let funcCallTimeout;
		return function() {
			if (funcCallTimeout != undefined) {
				clearTimeout(funcCallTimeout);
			}
			funcCallTimeout = setTimeout(func, debounceMs, ...arguments);
		}
	}

	/** Main Process */

	/**
	 * @typedef {Object} Rectangle
	 * @property {number} height
	 * @property {number} width
	 * @property {number} opacity
	 * @property {number} x
	 */

	/** @type {Array<Rectangle>} */
	const smallBuildings = [];
	/** @type {Array<Rectangle>} */
	const bigBuildings = [];

	const clouds = [];

	let mouseX = 0;
	let mouseY = 0;
	let windowWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
	let windowHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

	function generateBuildings(vw, vh) {
		let leftMost = 0;
		let passes = 0;
		let sb = 0;
		while (passes < 1 || sb < config.smallBuildingMinCount) {
			let height = random(config.smallBuildingMinHeight, config.smallBuildingMaxHeight) * vh;
			let width = random(config.smallBuildingMinWidth, config.smallBuildingMaxWidth) * height;
			smallBuildings.push({
				height,
				width,
				x: leftMost,
				opacity: random(config.smallBuildingMinOpacity, config.smallBuildingMaxOpacity)
			});
			sb++;
			leftMost += random(width * (2 / 3), width * (4 / 3));
			if (leftMost > vw) {
				leftMost = 0;
				passes++;
			}
		}

		leftMost = random(0, vw / 12);
		passes = 0;
		bb = 0;
		while (passes < 1 || bb < config.bigBuildingMinCount) {
			let height = random(config.bigBuildingMinHeight, config.bigBuildingMaxHeight) * vh;
			let width = random(config.bigBuildingMinWidth, config.bigBuildingMaxWidth) * height;
			bigBuildings.push({
				height,
				width,
				x: leftMost,
				opacity: random(config.bigBuildingMinOpacity, config.bigBuildingMaxOpacity)
			});
			bb++;
			leftMost += random(width * (8 / 9), width * (7 / 3));
			if (leftMost > vw) {
				leftMost = 0;
				passes++;
			}
		}
	}

	function generateClouds(vw, vh) {
		let leftMost = random(0, vw / 10);
		let passes = 0;
		let cc = 0;
		while (passes < 1 || cc < config.cloudClustersMinCount) {
			let cloudsInCluster = Math.round(random(1, config.maxCloudsInCluster));
			let clusterSpeed = random(config.cloudClusterMinSpeed, config.cloudClusterMaxSpeed);
			let x = leftMost;
			let y = vh - random(config.cloudMinY, config.cloudMaxY) * vh;
			let cluster = [];
			for (let i = 0; i < cloudsInCluster; i++) {
				let width = random(config.cloudMinWidth, config.cloudMaxWidth) * vw;
				let height = random(config.cloudMinHeight, config.cloudMaxHeight) * width;
				let shiftX = random(-width / 3, width / 3);
				let shiftY = random(-height / 3, height / 3);
				cluster.push({
					height,
					width,
					x: x + shiftX,
					y: y + shiftY,
					speed: clusterSpeed,
					opacity: random(0.6, 0.8)
				});
			}
			clouds.push(cluster);
			cc++;
			let step = random(vw / 6, vw / 4);
			leftMost += step;
			if (leftMost > vw) {
				leftMost = random(0, vw / 10);
				passes++;
			}
		}
	}

	function populateCanvas(svgCanvas) {
		clearNode(svgCanvas);
		let vh = svgCanvas.getAttribute("height");

		let bigBuildingsGroup = createSvgElement('g', {
			'class': 'big-buildings'
		});
		for (let bb = 0; bb < bigBuildings.length; bb++) {
			let el = createSvgElement('rect', {
				'class': 'building big-building',
				"x": bigBuildings[bb].x,
				"y": vh - bigBuildings[bb].height,
				"width": bigBuildings[bb].width,
				"height": bigBuildings[bb].height,
				"fill": config.buildingColor,
				"opacity": bigBuildings[bb].opacity
			});
			bigBuildingsGroup.appendChild(el);
		}
		svgCanvas.appendChild(bigBuildingsGroup);

		let cloudsGroup = createSvgElement('g', {
			'class': 'clouds'
		});
		for (let cc = 0; cc < clouds.length; cc++) {
			for (let cloud = 0; cloud < clouds[cc].length; cloud++) {
				let el = createSvgElement('rect', {
					'class': 'cloud',
					"x": clouds[cc][cloud].x,
					"y": clouds[cc][cloud].y,
					"width": clouds[cc][cloud].width,
					"height": clouds[cc][cloud].height,
					"fill": '#ffffff', // white
					"opacity": clouds[cc][cloud].opacity
				});
				clouds[cc][cloud].el = el;
				cloudsGroup.appendChild(el);
			}
		}
		svgCanvas.appendChild(cloudsGroup);

		let smallBuildingsGroup = createSvgElement('g', {
			'class': 'small-buildings'
		});
		for (let sb = 0; sb < smallBuildings.length; sb++) {
			let el = createSvgElement('rect', {
				"x": smallBuildings[sb].x,
				"y": vh - smallBuildings[sb].height,
				'class': 'building small-building',
				"width": smallBuildings[sb].width,
				"height": smallBuildings[sb].height,
				"fill": config.buildingColor,
				"opacity": smallBuildings[sb].opacity
			});
			smallBuildingsGroup.appendChild(el);
		}
		svgCanvas.appendChild(smallBuildingsGroup);
	}

	function initial_setup() {
		// get viewport size
		const vw = windowWidth;
		const vh = windowHeight;

		if (vw < 360) { return; }

		// clearing arrays
		smallBuildings.length = 0;
		bigBuildings.length = 0;
		clouds.length = 0;

		// prepare canvas
		const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		svg.setAttribute('width', vw);
		svg.setAttribute('height', vh);
		svg.setAttribute('opacity', '0.4');

		// generate contents
		generateBuildings(vw, vh);
		generateClouds(vw, vh);
		populateCanvas(svg);

		// add the smog drop
		const smogGradientDef = `
<linearGradient id="Gradient1" x1="0" x2="0" y1="0" y2="1">
<stop class="stop3" offset="0%" stop-color="${config.backgroundColor}"/>
<stop class="stop1" offset="100%" stop-color="${config.backgroundColor}00"/>
</linearGradient>
`
		const defs = createSvgElement('defs', {})
		defs.innerHTML = smogGradientDef;
		svg.appendChild(defs);

		const smog = createSvgElement('rect', {
			x: 0, y: 0, width: vw, height: vh, fill: 'url(#Gradient1)'
		});
		svg.appendChild(smog);

		clearNode($("#cityBackground"));
		$("#cityBackground").appendChild(svg);

		// trigger cloud animation loop
		animateClouds();
	}

	const debouncedSetup = debounce(initial_setup, 100);

	let animationRequest;
	function animateClouds() {
		clouds.forEach(function(cluster) {
			cluster.forEach(function(cloud) {
				cloud.x += cloud.speed;
				if (cloud.x > window.innerWidth)
					cloud.x = -cloud.width;
				cloud.el.setAttribute('x', cloud.x + mouseX / windowWidth * 32);
				cloud.el.setAttribute('y', cloud.y + mouseY / windowHeight * 16);
			});
		})
		animationRequest = window.requestAnimationFrame(animateClouds);
	}

	window.addEventListener('resize', function() {
		windowWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
		windowHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

		window.cancelAnimationFrame(animationRequest);
		debouncedSetup();
	});

	window.addEventListener('mousemove', function(event) {
		mouseX = event.clientX;
		mouseY = event.clientY;
	});


	initial_setup();
})();
