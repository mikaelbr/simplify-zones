import tap from "tap";

import { spawn } from "child_process";
import { join, dirname } from "path";
import { readFile } from "fs/promises";
import { createReadStream } from "fs";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const cliPath = join(__dirname, "./cli.mjs");
const fixtureFile = join(__dirname, "./fixture.json");

const fixture = JSON.parse(await readFile(fixtureFile));

tap.test("test cli", async (t) => {
  const data = await run();
  hasLessIn(t, data, fixture);
});

tap.test("test cli tolerance", async (t) => {
  const b = await run(0.001);
  const a = await run(0.1);

  hasLessIn(t, a, b);
});

async function run(tolerance) {
  const fixtureStream = createReadStream(fixtureFile);
  const cli = spawn("node", [cliPath, tolerance]);

  fixtureStream.pipe(cli.stdin);

  return await toData(cli.stdout);
}

function hasLessIn(t, a, b) {
  t.equal(a.length, b.length);
  for (let i in a) {
    t.ok(
      a[i].geometry.coordinates[0].length < b[i].geometry.coordinates[0].length
    );
  }
}

function toData(stream) {
  return new Promise(function (res, rej) {
    let buff = "";
    stream.on("data", (data) => {
      buff += data.toString();
    });
    stream.on("end", () => {
      try {
        res(JSON.parse(buff));
      } catch (err) {
        rej(err.message);
      }
    });
  });
}
