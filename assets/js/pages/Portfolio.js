const m = require("mithril");
m.stream= require("mithril-stream");

const Portfolio = {
	oninit: function(vnode){
		const that = this;
		//MODEL
		this.model = {
			jsonLoaded: m.stream(false),
			carouselSlid: m.stream(0),
			containerDOM: m.stream(null),
			lastentryDOM: m.stream(null),
			entryOverflow: m.stream(-1),
			slideTransition: m.stream(300)
		};
		//CTRL
		this.ctrl = {
			slideLeft: function(){
				that.model.carouselSlid( that.model.carouselSlid() + 280 );
				setTimeout( that.ctrl.getOverflow, that.model.slideTransition() );
			},
			slideRight: function(){
				that.model.entryOverflow() < 0 ? 
					that.model.carouselSlid( that.model.carouselSlid() - 280 ) : void 0;
				setTimeout( that.ctrl.getOverflow, that.model.slideTransition() );
			},
			getOverflow: function(){
				let rightPos = that.model.lastentryDOM().getBoundingClientRect().right;
				let containerRight = that.model.containerDOM().getBoundingClientRect().right;
				that.model.entryOverflow( containerRight - rightPos )
			}
		};
		//DATA REQUEST
		this.data = m.stream(null);
		m.request({
			method: "GET",
			url: "assets/portfolioData.json"
		}).then( function(response){
			that.model.jsonLoaded(true);
			return response;
		}).then( this.data );
	},
	onbeforeremove: function(vnode){
		vnode.dom.classList.add("fade-out");
		return new Promise(function(resolve){
			setTimeout(resolve, 400);
		})
	},
	onupdate: function(vnode){
		// this.model.lastentryDOM() != null && this.model.containerDOM() != null ?
		// 	this.ctrl.getOverflow() : void 0;
	},
	view: function(vnode){
		const that = this;
		return m("div.portfolio", [
			m("div.container", {
				oncreate: vnode => that.model.containerDOM( vnode.dom )
			}, [
				m("h1", "My Work"),
				m("div.section", [
					m("div.section-title", [ m("h2", "Tutorials") ]),
					m("div.section-content.tutorials", [
						this.model.carouselSlid() < 0 ? m("div.arrow.left", {
							onclick: that.ctrl.slideLeft
						}, [ "<" ]) : "",
						this.model.jsonLoaded() ? (
							m("div.carousel", {
								onupdate: function(vnode){
									vnode.dom.style.transform = "translate("+ that.model.carouselSlid() +"px, 0px)"
								},
								oncreate: function(vnode){
									let dom = vnode.dom;
									let children = dom.childNodes;
									let width = 0;
									children.forEach( child => {
										width += child.scrollWidth + 30;
									});
									vnode.dom.style.width = width+"px";
								}
							}, [
								this.data().tutorials.map(function(t, ind, arr){
									return m("a.entry.large[href="+t.href+"]", {
										"target": "_blank"
									}, [
										m("div.entry-image", {
											oncreate: function(vnode){
												arr.length - 1 == ind ?  (
													that.model.lastentryDOM( vnode.dom ),
													that.ctrl.getOverflow(),
													vnode.dom.addEventListener("onanimationend", that.ctrl.getOveflow)
												) : void 0;
											},
											style: "background-image: url("+t.image+");"
										}),
										m("div.entry-info", [
											m("p.title", t.title),
											m("p.stack", t.type)
										])
									])
								})
							])) : "Loading...",
						m("div", {
							className: "arrow right"+( that.model.entryOverflow() < 0 ? "":" disabled" ),
							onclick: this.ctrl.slideRight
						}, [ ">" ]) 
					])
				]),
				m("div.section", [
					m("div.section-title", [ m("h2", "Canvas Animations") ]),
					m("div.section-content.canvas-animations", [
						!this.model.jsonLoaded() ? "Loading..." : (
							this.data()["canvas-animations"].map(function(ca){
								return m("a.entry", {
									href: ca,
									target: "_blank"
								}, [
									m("div.entry-image", {
										style: "background-image: url("+ca+"/image/small.png)"
									}),
									m("div.overlay", "See Live")
								])
							})
						)
					])
				])
			])
		])
	}
}

module.exports = Portfolio;
