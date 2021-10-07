# simplify-zones

Simplify geometry on tariff zones from Entur.

```sh
cat detailed-zones.json | npx simplify-zones [tolerance] > less-detailed-zones.json
```

where `tolerance` is defaulted to `0.001`. The higher the number the less details in polygon.
