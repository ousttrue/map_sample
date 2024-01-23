import { VectorTile } from "@mapbox/vector-tile";
import Pbf from "pbf";
import zlib from "zlib";
import fs from "node:fs";
import { globSync } from "glob";

const layers = new Set();
for (const f of globSync("public/tiles/**/*.pbf.gz")) {
  // console.log(f);
  let body = fs.readFileSync(f);
  if (!body) {
    console.log("empty skip", f);
    continue;
  }
  try {
    body = zlib.gunzipSync(body);
  } catch (e) {}
  const tile = new VectorTile(new Pbf(body));
  // console.log(Object.keys(tile.layers));
  for (const l in tile.layers) {
    if (!layers.has(l)) {
      console.log(l, tile.layers[l]);
      layers.add(l);
    }
  }
}
