import time
import json
import requests
from collections import defaultdict
import hashlib


class Stack():
    def __init__(self):
        self.stack = []

    def push(self, value):
        self.stack.append(value)

    def pop(self):
        if self.size() > 0:
            return self.stack.pop()
        else:
            return None

    def size(self):
        return len(self.stack)

    def tail(self):
        return self.stack[-1]


def valid_proof(last_proof, proof):
    guess = f'{last_proof}{proof}'.encode()
    guess_hash = hashlib.sha256(guess).hexdigest()
    return guess_hash[:difficulty] == "0" * difficulty


s = Stack()
visited = set()
reverse = {'n': 's', 's': 'n', 'e': 'w', 'w': 'e'}
graph = defaultdict(dict)
next_move = ''
last_room = ''
mining_room = 259
keep_moving = True
at_well = False

room_information = requests.get(url='https://lambda-treasure-hunt.herokuapp.com/api/adv/init/', headers={
                                'Authorization': 'Token 827a384b1cb42ae6269da537819ba31a413f8d2d'}).json()

visited.add(room_information['room_id'])
s.push(room_information['room_id'])
graph[room_information['room_id']] = defaultdict(dict)
for exit in room_information['exits']:
    graph[room_information['room_id']][exit] = '?'
#######################   EVERYTHING ABOVE THIS LINE IS THE INITIAL SETUP #######################
while keep_moving:
    if room_information['terrain'] == 'MOUNTAIN' or room_information['terrain'] == 'NORMAL' or room_information['terrain'] == 'TRAP':
        movement_type = 'fly'
    else:
        movement_type = 'move'
    time.sleep(room_information['cooldown'])
    unvisited = []
    if room_information['room_id'] == mining_room:
        keep_moving = False
        resp = requests.get(url='https://lambda-treasure-hunt.herokuapp.com/api/bc/last_proof/',
                            headers={'Authorization': 'Token 827a384b1cb42ae6269da537819ba31a413f8d2d'}).json()
        print(resp)
        last_proof = resp['proof']
        proof = 0
        difficulty = resp['difficulty']
        while valid_proof(last_proof, proof) is False:
            proof += 1
        print(f'Proof that we are sending: {proof}')
        resp = requests.post(url='https://lambda-treasure-hunt.herokuapp.com/api/bc/mine/', headers={
                             'Content-Type': 'application/json', 'Authorization': 'Token 827a384b1cb42ae6269da537819ba31a413f8d2d'}, json={"proof": proof}).json()
        print(resp)
    elif room_information['title'] == "Wishing Well" and at_well == False:
        time.sleep(room_information['cooldown'])
        resp = requests.post(url='https://lambda-treasure-hunt.herokuapp.com/api/adv/examine',
                             headers={
                                 'Authorization': 'Token 827a384b1cb42ae6269da537819ba31a413f8d2d'},
                             json={"name": "well"}).json()
        print(resp)
        mining_room = int(resp['description'].split()[-1])
        print(f'Room to mine is {mining_room}')
        at_well = True
    else:
        for direction, room in graph[room_information['room_id']].items():
            if room == '?':
                unvisited.append(direction)
        if len(unvisited) > 0:
            next_move = unvisited[0]
            last_room = room_information['room_id']
            print(f'Before the movement post request is made: {last_room}')
            room_information = requests.post(f'https://lambda-treasure-hunt.herokuapp.com/api/adv/{movement_type}/',
                                             headers={
                                                 'Authorization': 'Token 827a384b1cb42ae6269da537819ba31a413f8d2d'},
                                             json={'direction': next_move}).json()
            print('Going to: ', room_information['room_id'])
            s.push(room_information['room_id'])
            visited.add(room_information['room_id'])
            graph[last_room][next_move] = room_information['room_id']
            graph[room_information['room_id']] = defaultdict(dict)
            for exit in room_information['exits']:
                graph[room_information['room_id']][exit] = '?'
            graph[room_information['room_id']][reverse[next_move]] = last_room
        else:
            s.pop()
            for direction, room in graph[room_information['room_id']].items():
                if room == s.tail():
                    next_move = direction
                    next_room = s.tail()
                    print('Before the movement post request is made: ',
                          room_information['room_id'])
                    room_information = requests.post(f'https://lambda-treasure-hunt.herokuapp.com/api/adv/{movement_type}/',
                                                     headers={
                                                         'Authorization': 'Token 827a384b1cb42ae6269da537819ba31a413f8d2d'},
                                                     json={'direction': next_move}).json()
                    print('After the movement post request is made: ',
                          room_information['room_id'])
