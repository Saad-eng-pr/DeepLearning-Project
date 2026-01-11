from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app)  # allows React to talk to Flask

    from routes.chat import chat_bp
    app.register_blueprint(chat_bp, url_prefix="/api/chat")

    return app

app = create_app()

if __name__ == "__main__":
    app.run(debug=True)
