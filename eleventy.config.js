const markdownItAnchor = require("markdown-it-anchor");
const markdownIt = require("markdown-it");
const sass = require("sass");
const CleanCSS = require("clean-css");

function benchTextSize(title, text) {
	const encoder = new TextEncoder();
	console.log(title + " " + encoder.encode(text).length);
}

module.exports = function(eleventyConfig) {
	const md = markdownIt();

	eleventyConfig.addPassthroughCopy("src/includes/js/cityBackground.js");

	eleventyConfig.addFilter("cssmin", function(code) {
		const result = new CleanCSS({}).minify(code).styles;
		benchTextSize("cssmin", result);
		return result;
	});

	/* Sass compile filter */
	eleventyConfig.addFilter("sassCompile", function(input) {
		let result = sass.compileString(input, {
			loadPaths: [
				".",
				this.eleventy.directories.includes + "/css",
			]
		});

		// minify on build
		if (process.env.ELEVENTY_RUN_MODE == 'build') {
			const minified = new CleanCSS({}).minify(result.css).styles;
			benchTextSize("sass compilation minified", minified);
			return minified;
		}

		benchTextSize("sass compilation", result.css);
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

	// Plugin that adds class to p before a heading, to close off the section
	md.use(function(md) {
		md.core.ruler.after("block", "mark-before-heading", (state) => {
			const tokens = state.tokens;
			const len = tokens.length;

			for (let i = 0; i < len - 1; i++) {
				const t = tokens[i];
				const next = tokens[i + 1];

				// Skip early if not a paragraph_open
				if (t.type !== "paragraph_open") continue;

				// We only care if the *next block-level element* after the paragraph
				// is an h2 heading_open.
				// Because Markdown-It inserts paragraph_close right after inline.
				// So the next visible block is usually 2 steps ahead (paragraph_close, then heading_open)
				let j = i + 1;

				// Skip inline/close tokens inside the paragraph
				while (j < len && tokens[j].type !== "paragraph_close") j++;
				if (j + 1 >= len) continue;

				const nextBlock = tokens[j + 1];
				if (nextBlock.type === "heading_open" /* && nextBlock.tag === "h2" */) {
					t.attrJoin("class", "section-close");
				}
			}
		});
	});

	eleventyConfig.setLibrary("md", md);

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
