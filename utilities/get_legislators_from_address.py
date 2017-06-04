import json
import requests

with open('../secrets.json') as secrets_file:
    secrets = json.load(secrets_file)

def process_address(address):
    return "+".join(address.split(' '))

def get_lat_lng(address):
    return requests.get('https://maps.googleapis.com/maps/api/geocode/json' \
        + '?key=' + secrets['google_geocoding_api_key'] \
        + '&address=' + address
        ).json()['results'][0]['geometry']['location']

def get_legislators(location):
    return requests.get('https://openstates.org/api/v1/legislators/geo/' \
        + '?apikey=' + secrets['openstates_api_key'] \
        + '&lat=' + str(location['lat']) + '&long=' + str(location['lng'])).json()

def get_legislators_from_address(address):
    address = process_address(address)
    location = get_lat_lng(address)
    legislators = get_legislators(location)
    return legislators

if __name__ == "__main__":
    address = "111 Perkins Street, Apt. 253 Jamaica Plain, MA  02130-4338"
    print(get_legislators_from_address(address))
