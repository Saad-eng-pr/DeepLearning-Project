from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/api/chat/message", methods=["POST"])
def chat_message():
    data = request.get_json()

    user_message = data.get("message")
    chat_id = data.get("chatId")

    if not user_message or not chat_id:
        return jsonify({"error": "Missing data"}), 400
    
    # Mock AI response
    ai_reply = f"The backend received your message : '{user_message}'"

    return jsonify({
        "reply": ai_reply
    })

if __name__ == "__main__":
    app.run(debug=True)
 
# def create_app():
#     app = Flask(__name__)
#     CORS(app)  # allows React to talk to Flask

#     from routes.chat import chat_bp
#     app.register_blueprint(chat_bp, url_prefix="/api/chat")

#     return app

# app = create_app()

# if __name__ == "__main__":
#     app.run(debug=True)
