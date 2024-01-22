import React from "react";
import Map from "./Map";
import { type StyleSpecification } from "maplibre-gl";

const osm: StyleSpecification = {
  version: 8,
  sources: {
    OSM: {
      type: "raster",
      tiles: ["http://tile.openstreetmap.org/{z}/{x}/{y}.png"],
      tileSize: 256,
      attribution:
        '<a href="http://osm.org/copyright">© OpenStreetMap contributors</a>',
    },
  },
  layers: [
    {
      id: "OSM",
      type: "raster",
      source: "OSM",
      minzoom: 0,
      maxzoom: 18,
    },
  ],
};

// export const OsmStory = () => (
//   <Map style={osm} center={[139.8, 35.5]} zoom={10} />
// );

const tileUrl = import.meta.env.DEV
  ? window.location.origin + "/tiles/{z}/{x}/{y}.pbf.gz"
  : "https://ousttrue.github.io/map_sample/tiles/{z}/{x}/{y}.pbf";
const glyphs = import.meta.env.DEV
  ? window.location.origin + "/fonts/{fontstack}/{range}.pbf"
  : "https://ousttrue.github.io/map_sample/fonts/{fontstack}/{range}.pbf";

const ne: StyleSpecification = {
  version: 8,
  sources: {
    NaturalEarth: {
      type: "vector",
      tiles: [tileUrl],
      minzoom: 0,
      maxzoom: 7,
    },
  },
  glyphs,
  layers: [
    {
      id: "background",
      type: "background",
      paint: { "background-color": "hsl(47, 26%, 88%)" },
    },
    {
      id: "water",
      type: "fill",
      source: "NaturalEarth",
      "source-layer": "water",
      layout: { visibility: "visible" },
      paint: { "fill-color": "hsl(205, 56%, 73%)" },
    },
    {
      id: "admin",
      type: "line",
      source: "NaturalEarth",
      "source-layer": "admin",
      layout: { visibility: "visible" },
      paint: { "line-color": "#d0c7c3" },
    },
    {
      id: "country_label",
      type: "symbol",
      source: "NaturalEarth",
      "source-layer": "country_label",
      layout: {
        "text-field": "{name}",
        "text-font": ["Noto Sans Bold"],
        "text-max-width": 10,
        visibility: "visible",
      },
      paint: {
        "text-color": "hsl(0, 0%, 13%)",
        "text-halo-blur": 0,
        "text-halo-color": "rgba(255,255,255,0.75)",
        "text-halo-width": 2,
      },
    },
    {
      id: "state_label",
      type: "symbol",
      source: "NaturalEarth",
      "source-layer": "state_label",
      layout: {
        "text-field": "{name}",
        "text-font": ["Noto Sans Bold"],
        "text-max-width": 10,
        visibility: "visible",
      },
      paint: {
        "text-color": "hsl(0, 0%, 13%)",
        "text-halo-blur": 0,
        "text-halo-color": "rgba(255,255,255,0.75)",
        "text-halo-width": 2,
      },
    },
  ],
};
export const SelfHostNaturalEarth = () => (
  <Map style={ne} center={[139.8, 35.5]} zoom={3} />
);
