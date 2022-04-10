import json
import time
import math
import random
import requests


"""
wallet: 0x1d3E3B02810f0ba68D3cc44db815940E104f963E
"""

from math import asin, sin, cos, acos, tan, atan, pi, atan2


class Car:
    def __init__(self, license_plate, model, speed, location):
        self.license_plate = license_plate
        self.model = model
        self.speed = speed
        self.location = location
        self.time = 0
        self.dist = 0

    def GetLicense(self):
        return self.license_plate

    def GetModel(self):
        return self.model

    def GetSpeed(self):
        return self.speed

    def GetLocation(self):
        return self.location

    def UpdateTime(self) -> None:
        self.time += 1

    def UpdateSpeed(self):
        speed_rand_val = random.randrange(30, 35)
        self.speed = speed_rand_val

    def UpdateLatitudeLongitude(self):
        d = self.speed*self.time
        lat1 = self.location[0]
        lon1 = self.location[1]
        tc = 10  # don't know what this is

        lat2 = asin(sin(lat1) * cos(d) + cos(lat1) * sin(d) * cos(tc))
        dlon = atan2(sin(tc) * sin(d) * cos(lat1),
                     cos(d) - sin(lat1) * sin(lat2))
        lon2 = ((lon1 - dlon + pi) % (2 * pi)) - pi

        self.location[0] = lat1
        self.location[1] = lat2


car = Car("XYZ621", "Honda", 30, [10, 100])
counter = 0
while True:
    print(f"############ Data Packet {counter} sending ############")
    print("")
    print(f"License plate: {car.GetLicense()}")
    print(f"Model:         {car.GetModel()}")
    print(f"Speed:         {car.GetSpeed()}")
    print(f"Latitude:      {car.GetLocation()[0]}")
    print(f"Longitude:     {car.GetLocation()[1]}")

    car_data = {
        "license plate": f"{car.GetLicense()}",
        "Model": f"{car.GetModel()}",
        "Speed": f"{car.GetSpeed()}",
        "Latitude": f"{car.GetLocation()[0]}",
        "Longitude": f"{car.GetLocation()[1]}",
    }

    data = {
        "status": "data",
        "type": "car",
        "wallet": "0x1d3E3B02810f0ba68D3cc44db815940E104f963E",
        "data": car_data
    }

    data_json = json.dumps(data)

    # print(data_json, data)
    s = requests.session()

    url = "http://192.168.0.63:8081/carData"

    headers = {"Content-Type": "application/json"}
    x = s.post(url, data=data_json, headers=headers)

    print(f"############ Data Packet sent ############")
    print("")

    time.sleep(1)

    counter += 1
    car.UpdateTime()
    car.UpdateSpeed()
    car.UpdateLatitudeLongitude()
