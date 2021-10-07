import simplify from "simplify-geometry";

export default function simplity(data, tolerance) {
  for (let item of data) {
    const geom = item.geometry;
    geom.coordinates = geom.coordinates.map((coord) =>
      simplify(coord, tolerance)
    );
  }
  return data;
}
