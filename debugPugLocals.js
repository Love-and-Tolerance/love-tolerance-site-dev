#!/usr/bin/env node

process.env.NODE_ENV = process.env.NODE_ENV || "production";
console.log(require("./pug.config").locals);

if (process.env.NODE_ENV !== "debug") {
    console.log("To debug watching, type NODE_ENV=debug ./debugPugLocals.js");
}
