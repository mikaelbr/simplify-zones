import simplify from "simplify-geometry";

export default function simplity(
  data,
  tolerance,
  omitSorting
) {
  for (let item of data) {
    const geom = item.geometry;
    geom.coordinates = geom.coordinates.map((coord) =>
      simplify(coord, tolerance)
    );
  }

  if (omitSorting) return data;
  return data.sort(function (a, b) {
    if (a.id < b.id) return -1;
    if (a.id > b.id) return 1;
    return 0;
  });
}
