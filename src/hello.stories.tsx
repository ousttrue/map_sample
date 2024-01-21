import React from "react";
import Map from "./Map";
import { type StyleSpecification } from "maplibre-gl";

export const WorldStory = () => <p>Hey!</p>;

const style: StyleSpecification = {
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
  <Map style={style} center={[139.8, 35.5]} zoom={10} />
);
