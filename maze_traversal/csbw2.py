import time
import json
import requests
from collections import defaultdict
import hashlib
from dotenv import load_dotenv
import os
load_dotenv()
token = os.getenv("TOKEN")


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


resp = requests.get(url='https://lambda-treasure-hunt.herokuapp.com/api/bc/last_proof/',
                    headers={f'Authorization': 'Token {token}'}).json()
print(resp)

# last_proof = resp['proof']
# proof = 0
# difficulty = resp['difficulty']

# def valid_proof(last_proof, proof):
#     guess = f'{last_proof}{proof}'.encode()
#     guess_hash = hashlib.sha256(guess).hexdigest()
#     return guess_hash[:difficulty] == "0" * difficulty

# while valid_proof(last_proof, proof) is False:
#     proof += 1
# print(f'Proof that we are sending: {proof}')
# resp = requests.post(url='https://lambda-treasure-hunt.herokuapp.com/api/bc/mine/',
# headers={'Content-Type': 'application/json', 'Authorization': 'Token 827a384b1cb42ae6269da537819ba31a413f8d2d'},
# json={"proof": proof}).json()
# print(resp)

############ UNCOMMENT IF YOU WANT TO TRY AND TRAVERSE ############

# s = Stack()
# visited = set()
# reverse = {'n': 's', 's': 'n', 'e': 'w', 'w': 'e'}
# graph = defaultdict(dict)
# unvisited = []
# next_move = ''
# last_room = ''

# status = requests.get(url='https://lambda-treasure-hunt.herokuapp.com/api/adv/status/', headers={f'Authorization': 'Token {token}'}).json()
# time.sleep(status['cooldown'])

# room_information = requests.get(url='https://lambda-treasure-hunt.herokuapp.com/api/adv/init/', headers={f'Authorization': 'Token {token}).json()

# visited.add(room_information['room_id'])
# s.push(room_information['room_id'])
# graph[room_information['room_id']] = defaultdict(dict)
# for exit in room_information['exits']:
#     graph[room_information['room_id']][exit] = '?'
# #######################   EVERYTHING ABOVE THIS LINE IS THE INITIAL SETUP #######################
# while len(visited) < 500:
#     print(room_information['room_id'])
#     if room_information['terrain'] == 'MOUNTAIN' or room_information['terrain'] == 'NORMAL' or room_information['terrain'] == 'TRAP':
#         movement_type = 'fly'
#     else:
#         movement_type = 'move'
#     time.sleep(room_information['cooldown'])
#     if graph[room_information['room_id']]:
#         for direction, room in graph[room_information['room_id']].items():
#             if room == '?':
#                 unvisited.append(direction)
#         if len(unvisited) > 0:
#             next_move = unvisited[0]
#             last_room = room_information['room_id']
#             print('Before the movement post request is made')
#             room_information = requests.post(f'https://lambda-treasure-hunt.herokuapp.com/api/adv/{movement_type}/',
#             headers={f'Authorization': 'Token {token}},
#             json={'direction': next_move}).json()
#             print('After the movement post request is made')
#             s.push(room_information['room_id'])
#             visited.add(room_information['room_id'])
#             graph[last_room][next_move] = room_information['room_id']
#             graph[room_information['room_id']] = defaultdict(dict)
#             for exit in room_information['exits']:
#                 graph[room_information['room_id']][exit] = '?'
#             graph[room_information['room_id']][reverse[next_move]] = last_room
#         else:
#             s.pop()
#             for direction, room in graph[room_information['room_id']].items():
#                 if room == s.tail():
#                     next_move = direction
#                     next_room = s.tail()
#                     room_information = requests.post(f'https://lambda-treasure-hunt.herokuapp.com/api/adv/{movement_type}/',
#                     headers={f'Authorization': 'Token {token}},
#                     json={'direction': next_move, "next_room_id": next_room}).json()
#                     if room_information['terrain'] == 'SHRINE': # I hope this is right?
#                         time.sleep(room_information['cooldown'])
#                         requests.post(f'https://lambda-treasure-hunt.herokuapp.com/api/adv/pray/',
#                         headers={f'Authorization': 'Token {token}})
#                     if len(room_information['items']) > 0:
#                         for item in room_information['items']:
#                             time.sleep(room_information['cooldown'])
#                             requests.post(f'https://lambda-treasure-hunt.herokuapp.com/api/adv/take/',
#                             headers={f'Authorization': 'Token {token}},
#                             json={'name': item})
