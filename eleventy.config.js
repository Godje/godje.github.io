const markdownItAnchor = require("markdown-it-anchor");
const sass = require("sass");

module.exports = function(eleventyConfig) {
	/* Sass compile filter */
	eleventyConfig.addFilter("sassCompile", function(input) {
		let result = sass.compileString(input, {
			loadPaths: [
				".",
				this.eleventy.directories.includes + "/css",
			]
		});
		return result.css;
	});

	/* Text Overflow Ellipsis */
	eleventyConfig.addFilter("ellipsisTrim", function(input, maxlen) {
		const limit = maxlen || 40;
		const str = input || "";
		return (str.length > limit ? str.substring(0, limit) + "..." : str);
	});

	/**
	 * DRAFTS FEATURE START
	 * copied directly from: https://www.11ty.dev/docs/quicktips/draft-posts/
	 * */
	// When `permalink` is false, the file is not written to disk
	eleventyConfig.addGlobalData("eleventyComputed.permalink", function() {
		return (data) => {
			// Always skip during non-watch/serve builds
			if (data.draft && !process.env.BUILD_DRAFTS) {
				return false;
			}

			return data.permalink;
		}
	});

	// When `eleventyExcludeFromCollections` is true, the file is not included in any collections
	eleventyConfig.addGlobalData("eleventyComputed.eleventyExcludeFromCollections", function() {
		return (data) => {
			// Always exclude from non-watch/serve builds
			if (data.draft && !process.env.BUILD_DRAFTS) {
				return true;
			}

			return data.eleventyExcludeFromCollections;
		}
	});

	eleventyConfig.on("eleventy.before", ({ runMode }) => {
		// Set the environment variable
		if (runMode === "serve" || runMode === "watch") {
			process.env.BUILD_DRAFTS = true;
		}
	});
	/* DRAFTS FEATURE END */

	/* ANCHORS NEXT TO MD HEADINGS START */
	eleventyConfig.amendLibrary("md", mdLib => {
		mdLib.use(markdownItAnchor, {
			permalink: markdownItAnchor.permalink.ariaHidden({
				placement: "after",
				class: "header-anchor",
				symbol: "#",
				ariaHidden: false,
			}),
			level: [1, 2, 3],
			slugify: eleventyConfig.getFilter("slugify")
		});
	});

	return {
		dir: {
			input: "src",
			includes: "includes",
			data: "data",
			output: "public" // for gitlab/github pages
		}
	}
	/* ANCHORS NEXT TO MD HEADINGS END */
};
