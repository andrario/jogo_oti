from chatapp import create_app, socketio

app = create_app()

socketio.run(app, host="0.0.0.0", port="4000")