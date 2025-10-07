#!/bin/bash

# Get Dubai imagery using the download_map.py script
# Bounding box covers Dubai area: 24.757850 54.884729 25.376059 55.619621

echo "Starting Dubai imagery download..."
echo "Bounding box: 24.757850 54.884729 25.376059 55.619621"
echo "Zoom levels: 1-20"
echo "Output directory: ../public/esri-imagery/"

python3.11 download_map.py \
    --bbox 24.757850 54.884729 25.376059 55.619621 \
    --zoom-min 1 \
    --zoom-max 20 \
    --out-dir "../public/esri-imagery/" \

echo "Dubai imagery download completed!"