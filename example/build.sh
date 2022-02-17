#!/bin/bash
cd "$(dirname "$0")"

rm -r ./dist
rm -r node_modules/another-react-gallery
(cd .. && npm run build);
npm i
npm run dev
