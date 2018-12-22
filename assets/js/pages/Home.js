const m = require("mithril");
m.stream= require("mithril-stream");

const Home = {
	oninit: function(vnode){
		this.data = {
			email: "daniel.mayovskiy@gmail.com",
			links: [
				{
					text: "Codepen.io",
					href: "https://codepen.io/Godje"
				},
				// {
				// 	text: "Twitter",
				// 	href: "https://twitter.com/DanielMayovsky"
				// },
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
					href: "https://www.youtube.com/channel/UCzKW1gIGnerPbsZD-C2QNpA"
				},
				{
					text: "GitLab",
					href: "https://gitlab.com/Godje"
				}
			]
		}	
	},
	onbeforeremove: function(vnode){
		vnode.dom.classList.add("fade-out")
		return new Promise(function(resolve){
			setTimeout( resolve, 400 )
		})
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

module.exports = Home;
