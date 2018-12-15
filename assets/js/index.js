const m = require("mithril");
m.stream= require("mithril-stream");
const background = require("./background.js");
const container = document.querySelector(".app");

const Home = {
	oninit: function(vnode){
		this.data = {
			email: "daniel.mayovskiy@gmail.com",
			links: [
				{
					text: "Codepen.io",
					href: "https://codepen.io/Godje"
				},
				{
					text: "Twitter",
					href: "https://twitter.com/daniel.mayovskiy"
				},
				{
					text: "Github",
					href: "https://github.com/Godje"
				},
				{
					text: "Dev.to",
					href: "https://dev.to/weirdmayo"
				},
				{
					text: "YouTube",
					href: "https://youtube.com/"
				},
			]
		}	
	},
	view: function(vnode){
		return m("div.home", [
			m("div.row.first-row", [
				m("div.col", [
					m("img", {
						src: "./assets/images/avatar.jpg",
						width: 200,
						height: 200,

					}),
				]),
				m("div.col", [
					m("h1.name", [ m("span", "d"), "aniel ", m("span", "m"), "ayovskiy" ]),
					m("p.job", "Frontend Web Developer"),
					m("a[href='/portfolio'].mywork-link", { oncreate: m.route.link }, "see my work")
				])
			]),
			m("div.row.row--no-gutter.second-row", [
				m("div.col.col--4-of-8", [
					m("h2", "Me and my code at:"),
					m("div.list", [
						this.data.links.map(function(link){
							return m("a[href="+link.href+"]", {
								target: "_blank"
							}, link.text);
						})
					])
				]),
				m("div.col.col--4-of-8", [
					m("h2", "Contact me:"),
					m("div.list", [
						m("a[href='mailto:"+this.data.email+"']", this.data.email)
					])
				])
			])
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
