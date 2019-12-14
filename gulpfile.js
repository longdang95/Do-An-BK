const gulp = require("gulp");
const nodemon = require('gulp-nodemon');
const spawn = require('child_process').spawn;
const run = require('gulp-run');
// const fs = require('fs');
// const fse = require('fs-extra');
const crypto = require("crypto");


const stylusCompiler = {
    watch: (desk) => {
        require("./compile-stylus").createCompiler(desk).watch();
    },
    compile(desk) {
        return Promise.all([
            require("./compile-stylus").createCompiler(desk).compile(),
        ]);
    }
};

const startServer = () => {
    nodemon({
        script: './dist/server.js',
        ext: 'js',
        "ignore": [
            ".idea/",
            ".git/",
            "gulpfile.js",
            "src/",
            "dist/assets",
            "node_modules/"
        ],
        env: {'NODE_ENV': 'development'}
    });
};


gulp.task("dev", () => {
    startServer();
    stylusCompiler.watch("./dist/assets/css");
    if (!/^win/.test(process.platform)) { // linux
        spawn("webpack", ["--watch"], {stdio: "inherit"});
    } else {
        spawn('cmd', ['/s', "/c", "webpack", "--watch"], {stdio: "inherit"});
    }
});

let packageAssets = function() {
    gulp.src(["./dist/**","!./dist/assets/js/**", "!./dist/uploads/**"])
        .pipe(gulp.dest("./build"));
};

gulp.task("package-assets", packageAssets);
gulp.task("start-db" ,()=>{
    run("cd Users/apple/Downloads/mongodb-osx-x86_64-3.6.3/bin/").exec(()=>{
        console.log("go to mongo dir")
        run("mongod").exec(() =>{
            console.log("Started mongodb");
        })
    })
})

gulp.task("init-db" ,()=>{
    run("mongoimport --db do-an --collection user --file user.json").exec(()=>{
        console.log('initiation done!')
    });
})
gulp.task("start-db2" ,()=>{
    run("cd /usr/local/bin/mongo/").exec(()=>{
        console.log("go to mongo dir")
        run("mongod").exec(() =>{
            console.log("Started mongodb");
        })
    })
})
gulp.task("build", (done) => {
    packageAssets();
    stylusCompiler.compile("./build/assets/css").then(() => {
        console.log("Running Webpack");
        run("webpack --config webpack.config.prod").exec(() => {
            console.log("webpack done");
        });
    })
});

gulp.task("stop-db", ()=>{
    // run("mongo").exec(()=>{
    //     run("use admin;").exec(()=>{
    //         run("db.shutdownServer();").exec(()=>{
    //             console.log("Stopped mongodb");
    //         })
    //     })
    // })
})

