const m = require("mithril");
m.stream= require("mithril-stream");
const background = require("./background.js");
const container = document.querySelector(".app");

const Home = {
	view: function(vnode){
		return m("div.home", [
			"Test"
		]);
	}
}
const Portfolio = {
	view: function(vnode){
		return m("div.portfolio", [
			"Portfolio"
		])
	}
}

m.route(container, "/", {
	"/": Home,
	"/portfolio": Portfolio
})

background( document.getElementById("c") );
