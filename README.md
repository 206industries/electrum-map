electrum-map
============

Visual map of Electrum servers. See it in action at [electrum.206industries.com](http://electrum.206industries.com)

Prereqs
-------
1. Get the free GeoLite2 IP database from [Maxmind](http://dev.maxmind.com/geoip/geoip2/geolite2/)
1. Install the [GeoIP2 Python API](http://geoip2.readthedocs.org/en/latest/)

Usage
-----
`generate.py` creates a JSON dump of current peers. This can be installed to run regularly via crontab and is used to generate the `data.json` file picked up by the web page.

The contents of the `www` directory need to be hosted by any web server. The file `data.json` is expected to contain the output of `generate.py`.