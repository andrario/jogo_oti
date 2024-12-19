from flask import request
from flask_socketio import emit

from .extensions import socketio

from random import randint

users = {}

@socketio.on("connect")
def handle_connect():
    print("Client connected!")

@socketio.on("user_join")
def handle_user_join(username):
    print(f"User {username} joined!")
    users[request.sid] = {"nome":username, "numero":0}

@socketio.on("sortear")
def handle_new_message():
    # print(f"New message: {message}")
    # username = None
    
    sorteados = []
    for user in users:
        valor = None
        while True:
            valor = randint(1,100)
            if valor not in sorteados:
                sorteados.append(valor)
                break
        users[user]["numero"] = valor
        emit("numeroSorteado", {"message": str(valor)}, to=user)