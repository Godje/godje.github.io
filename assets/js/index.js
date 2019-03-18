const m = require("mithril");
m.stream= require("mithril-stream");
const background = require("./background.js");
const container = document.querySelector(".app");
const Home = require("./pages/Home.js");
const Portfolio = require("./pages/Portfolio.js")

m.route(container, "/", {
	"/": Home,
	"/portfolio": Portfolio
});

background( document.getElementById("c") );
