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

export const OsmStory = () => (
  <Map style={osm} center={[139.8, 35.5]} zoom={10} />
);

const ne: StyleSpecification = {
  version: 8,
  sources: {
    NaturalEarth: {
      type: "vector",
      tiles: [`${window.location.origin}/tiles/{z}/{x}/{y}.pbf.gz`],
      minzoom: 0,
      maxzoom: 7,
    },
  },
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
      filter: [
        "all",
        ["==", "$type", "Polygon"],
        ["!=", "intermittent", 1],
        ["!=", "brunnel", "tunnel"],
      ],
      layout: { visibility: "visible" },
      paint: { "fill-color": "hsl(205, 56%, 73%)" },
    },
  ],
};
export const SelfHostNaturalEarth = () => (
  <Map style={ne} center={[139.8, 35.5]} zoom={3} />
);