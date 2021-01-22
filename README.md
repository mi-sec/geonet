# geonet

Collection of generic geospatial modules for various processing tasks

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

### Release

```
lerna clean
lerna exec -- rm -rf ./esm
lerna exec -- rm -rf ./node_models
lerna exec -- rm -rf ./.nyc_output
lerna exec -- rm -rf ./coverage
lerna exec -- rm -rf ./package-lock.json
lerna bootstrap
lerna run lint
lerna run test
lerna run build
# push any file changes
lerna publish
lerna publish --registry https://npm.pkg.github.com
```
