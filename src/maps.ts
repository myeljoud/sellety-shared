import { LatLng } from "./types";

export type StaticMapsUrlCreatorOptions = {
  apiKey: string;
  mapType?: "roadmap" | "satellite" | "terrain" | "hybrid";
  markerSize?: "tiny" | "mid" | "small";
  markerColor?:
    | "black"
    | "brown"
    | "green"
    | "purple"
    | "yellow"
    | "blue"
    | "gray"
    | "orange"
    | "red"
    | "white";
};

export function staticMapsUrlCreator({
  apiKey,
  mapType,
  markerSize,
  markerColor,
}: StaticMapsUrlCreatorOptions) {
  if (!apiKey) {
    throw new Error("Missing Google Map Static API Key");
  }

  return {
    composeUrl({
      zoom = 16,
      center,
      size,
      marker,
    }: {
      zoom?: number;
      center: LatLng;
      size: {
        width: number;
        height: number;
      };
      marker?: LatLng;
    }) {
      const url = new URL("https://maps.googleapis.com/maps/api/staticmap");

      url.searchParams.set("center", `${center.latitude},${center.longitude}`);
      url.searchParams.set("zoom", zoom.toString());
      url.searchParams.set("size", `${size.width}x${size.height}`);
      url.searchParams.set("scale", "2");
      url.searchParams.set("key", apiKey);

      if (mapType) {
        mapType && url.searchParams.set("maptype", mapType);
      }

      if (marker) {
        const markerCoordinates = `${marker.latitude},${marker.longitude}`;
        const paramValue = `color:${markerColor}|size:${markerSize}|${markerCoordinates}`;

        url.searchParams.set("markers", paramValue);
      }

      return url.href;
    },
  };
}
