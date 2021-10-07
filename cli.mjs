#!/usr/bin/env node

import simplify from "./index.mjs";

const tolerance = Number(process.argv[2] || 0.001);

if (Number.isNaN(tolerance)) {
  console.error("Tolerance needs to be first argument to cli.");
}

let buf = "";
process.stdin.on("data", (input) => {
  buf += input.toString();
});

process.stdin.on("end", () => {
  try {
    var data = JSON.parse(buf);
  } catch (e) {
    console.error("Could not parse stdin: ");
    return console.error(e);
  }

  console.log(JSON.stringify(simplify(data, tolerance)));
});
