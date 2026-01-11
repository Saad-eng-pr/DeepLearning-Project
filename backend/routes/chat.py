from flask import Blueprint, request, jsonify
from services.tutor_ai import get_ai_response

chat_bp = Blueprint("chat", __name__)

@chat_bp.route("/message", methods=["POST"])
def chat_message():
    data = request.json

    user_message = data.get("message")
    chat_id = data.get("chatId")

    if not user_message:
        return jsonify({"error": "Message is required"}), 400

    ai_response = get_ai_response(user_message)

    return jsonify({
        "reply": ai_response
    })
