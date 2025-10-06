import os
import math
import requests
import argparse

TILE_URL = "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"


def latlon_to_tile(lat, lon, zoom):
    lat_rad = math.radians(lat)
    n = 2.0 ** zoom
    x_tile = int((lon + 180.0) / 360.0 * n)
    y_tile = int((1.0 - math.log(math.tan(lat_rad) +
                 (1 / math.cos(lat_rad))) / math.pi) / 2.0 * n)
    return x_tile, y_tile


def download_tiles(lat_min, lon_min, lat_max, lon_max, zoom_levels, out_dir="tiles", verbose=False):
    for z in zoom_levels:
        x_min, y_max = latlon_to_tile(lat_min, lon_min, z)
        x_max, y_min = latlon_to_tile(lat_max, lon_max, z)

        for x in range(min(x_min, x_max), max(x_min, x_max) + 1):
            for y in range(min(y_min, y_max), max(y_min, y_max) + 1):
                url = TILE_URL.format(z=z, x=x, y=y)
                save_dir = os.path.join(out_dir, str(z), str(x))
                os.makedirs(save_dir, exist_ok=True)
                save_path = os.path.join(save_dir, f"{y}.jpg")

                if os.path.exists(save_path):
                    if verbose:
                        print(f"Skipped (exists): {save_path}")
                    continue

                try:
                    r = requests.get(url, timeout=10)
                    if r.status_code == 200:
                        with open(save_path, "wb") as f:
                            f.write(r.content)
                        if verbose:
                            print(f"Downloaded: {save_path}")
                    else:
                        if verbose:
                            print(f"Failed: {url} ({r.status_code})")
                except Exception as e:
                    if verbose:
                        print(f"Error downloading {url}: {e}")


def parse_args():
    parser = argparse.ArgumentParser(
        description="Download map tiles from ESRI imagery server")
    parser.add_argument("--bbox", required=True, nargs=4, type=float,
                        metavar=('lat_min', 'lon_min', 'lat_max', 'lon_max'),
                        help="Bounding box coordinates: lat_min lon_min lat_max lon_max")
    parser.add_argument("--zoom-min", type=int, default=1,
                        help="Minimum zoom level (default: 1)")
    parser.add_argument("--zoom-max", type=int, default=20,
                        help="Maximum zoom level (default: 20)")
    parser.add_argument("--out-dir", default="tiles",
                        help="Output directory for tiles (default: tiles)")
    parser.add_argument("-v", "--verbose", action="store_true",
                        help="Enable verbose output (default: False)")
    return parser.parse_args()


if __name__ == "__main__":
    args = parse_args()

    lat_min, lon_min, lat_max, lon_max = args.bbox
    zoom_levels = list(range(args.zoom_min, args.zoom_max + 1))

    print(f"Downloading tiles for bbox: {args.bbox}")
    print(f"Zoom levels: {zoom_levels}")
    print(f"Output directory: {args.out_dir}")

    download_tiles(lat_min,
                   lon_min,
                   lat_max,
                   lon_max,
                   zoom_levels,
                   args.out_dir,
                   args.verbose)