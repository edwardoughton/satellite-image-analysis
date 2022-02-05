"""
Example script for extracting Sentinel-2 imagery.

Written by Ed Oughton.

February 2022.

Mainly based on the quickstart code provided by sentinelsat

"""
from sentinelsat import SentinelAPI, read_geojson, geojson_to_wkt
from datetime import date

api = SentinelAPI('your_username_here', 'your_password_here')

my_geojson = {
  "type": "Feature",
  "geometry": {
	"type": "Polygon",
	"coordinates": [
	  [
			[
				77.3153999999999968,
				38.8239999999999981
			],
			[
				-77.2956694620074671,
				38.8239999999999981
			],
			[
				-77.2956694620074671,
				38.8392882996798647
			],
			[
				77.3153999999999968,
				38.8392882996798647
			],
			[
				77.3153999999999968,
				38.8239999999999981
			]
	  ],
	]
  },
    "properties": {},
}

footprint = geojson_to_wkt(my_geojson)

products = api.query(
		footprint,
    platformname = 'Sentinel-2',
    date = ('20210701', '20220704'),
    cloudcoverpercentage = (0,10),
    limit=1
)
api.download_all(products)

print('Complete')
