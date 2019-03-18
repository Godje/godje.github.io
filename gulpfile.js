const gulp = require("gulp");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const browserify = require("browserify");
const babelify = require("babelify");
const streamify = require("gulp-streamify");
const source = require("vinyl-source-stream");
const browserSync = require("browser-sync").create();
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const uglify = require("gulp-uglify");

let jsWatch = "./assets/js/index.js";
let sassWatch = "assets/scss/styles.scss";

// Fix stop watch on error
function skipError(err){
	console.log(err.toString());
	this.emit("end");
}

// Compile SCSS into CSS
function sassTask(){
	return gulp.src(sassWatch)
		.pipe(sass()) // Converts SCSS to CSS
		.on("error", skipError)
		.pipe(autoprefixer({
			browsers: ["last 2 versions"],
			cascade: false
		}))
		.pipe(cleanCSS({compatibility: "ie8"}))
		.pipe(gulp.dest("assets/css"))
		.pipe(browserSync.reload({
			stream: true
		}));
};


function jsTask(){
	return browserify(jsWatch)
		.transform(babelify, { presets: ["env"], "plugins": [ ['transform-react-jsx', { "pragma": "m" }] ] })
		.bundle()
		.on("error", skipError) // might be the wrong fix. If anything, delete this.
		.pipe(source(jsWatch))
		.pipe(streamify(uglify()))
		.pipe(rename("client.min.js"))
		.pipe(gulp.dest("./assets"));
}

function browserSyncTask(done){
	browserSync.init({
		server: {
			baseDir: "."
		}
	});
	done();
}
function browserSyncReload(done){
	browserSync.reload();
	done();
}

gulp.task("watch", gulp.series( gulp.parallel(browserSyncTask, sassTask, jsTask) , ()=>{
	gulp.watch("assets/scss/**/*.scss", sassTask);
	gulp.watch("assets/js/**/*.js", jsTask);
	gulp.watch("assets/client.min.js", browserSyncReload);
	gulp.watch("./index.html", browserSyncReload);
	gulp.watch("assets/js/**/*.js", browserSyncReload);
}));

gulp.task("build", gulp.series( sassTask, jsTask ))
