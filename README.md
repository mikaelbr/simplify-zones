# simplify-zones

[![test](https://github.com/mikaelbr/simplify-zones/actions/workflows/test.yml/badge.svg)](https://github.com/mikaelbr/simplify-zones/actions/workflows/test.yml)

Simplify geometry on tariff zones from Entur.

```sh
cat detailed-zones.json | npx simplify-zone [tolerance] > less-detailed-zones.json
```

where `tolerance` is defaulted to `0.001`. The higher the number the less details in polygon.
