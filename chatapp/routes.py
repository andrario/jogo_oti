from flask import Blueprint, render_template, request
import socket
import segno

main = Blueprint("main", __name__)

@main.route("/test")
def test():
    return render_template("test.html")

@main.route("/")
def index():
    with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
        s.connect(("8.8.8.8", 80))
        url_sala = f"http://{s.getsockname()[0]}:4000"
    qrcode = segno.make_qr(url_sala)
    qrcode.save(
        "./chatapp/static/qr.png",
        scale=8,
        border=0,
    )
    return render_template("index.html")