from flask import Flask, render_template, request, jsonify
import random
from words import words

app = Flask(__name__)

def get_masked_word(word):
    masked = list(word)
    indexes = random.sample(range(len(word)), max(1, len(word) // 2))
    for i in indexes:
        masked[i] = "_"
    return "".join(masked)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/get_word", methods=["GET"])
def get_word():
    word = random.choice(words)
    masked_word = get_masked_word(word)
    return jsonify({"masked": masked_word, "original": word})

@app.route("/check_word", methods=["POST"])
def check_word():
    data = request.json
    return jsonify({"correct": data["guess"].lower() == data["original"].lower()})

if __name__ == "__main__":
    app.run(debug=True)
