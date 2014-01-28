from socket import socket
import json
import geoip2.database

# get peer list
sock = socket()
sock.connect(('electrum.206industries.com', 50001))
sock.sendall('{"id":0, "method":"server.peers.subscribe", "params":null}\n');
raw = sock.recv(32000)
sock.close()

# parse
data = json.loads(raw)

# set up geoip
reader = geoip2.database.Reader('GeoLite2-City.mmdb')


list = []

# iterate
for server in data['result']:
	response = reader.city(server[0])

	location = [response.city.name, response.subdivisions.most_specific.name, response.country.name]
	locationStr = ', '.join([x for x in location if x <> None])

	entry = [{ 
			'hostname':server[1], 
			'ip':server[0], 
			'lat':response.location.latitude, 
			'lon':response.location.longitude,
			'country': response.country.name,
			'location': locationStr
		   }]
	list += entry

print json.dumps({'d':list})

