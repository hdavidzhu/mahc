import json
import requests
import sys, traceback

with open('../secrets.json') as secrets_file:
    secrets = json.load(secrets_file)

def get_lat_lng(address):
    payload = {
        'key': secrets['google_geocoding_api_key'],
        'address': address
    }
    return requests.get('https://maps.googleapis.com/maps/api/geocode/json',
        params = payload).json()['results'][0]['geometry']['location']

def get_legislators(location):
    payload = {
        'apikey': secrets['openstates_api_key'],
        'lat': location['lat'],
        'long': location['lng']
    }
    return requests.get('https://openstates.org/api/v1/legislators/geo/',
        params = payload).json()

def get_legislators_from_address(address):
    location = None
    legislators = None

    try:
        location = get_lat_lng(address)
        legislators = get_legislators(location)
    except Exception as e:
        print('-' * 60)
        print("Address: %s" % address)
        print("Error: %s" % e)
        traceback.print_exc(file=sys.stdout)
        print('-' * 60)

    return legislators

if __name__ == "__main__":
    address = "226 Chestnut St #2, Cambridge, MA 02139, USA"
    print(get_legislators_from_address(address))
