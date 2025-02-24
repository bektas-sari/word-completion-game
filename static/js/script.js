let originalWord = "";
let attempts = 3;

document.addEventListener("DOMContentLoaded", fetchWord);
document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        checkGuess();
    }
});

function fetchWord() {
    fetch("/get_word")
        .then(response => response.json())
        .then(data => {
            document.getElementById("masked-word").textContent = data.masked;
            originalWord = data.original;
            attempts = 3;
            document.getElementById("message").textContent = "";
            document.getElementById("guess").value = "";
            document.getElementById("attempts").textContent = `Attempts left: ${attempts}`;
        });
}

function checkGuess() {
    let guess = document.getElementById("guess").value;
    fetch("/check_word", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ guess: guess, original: originalWord })
    })
    .then(response => response.json())
    .then(data => {
        let message = document.getElementById("message");
        if (data.correct) {
            message.textContent = `🎉 Congratulations! The word was: ${originalWord}`;
            setTimeout(fetchWord, 2000);
        } else {
            attempts--;
            document.getElementById("attempts").textContent = `Attempts left: ${attempts}`;
            if (attempts > 0) {
                message.textContent = `❌ Incorrect! Try again.`;
            } else {
                message.textContent = `😞 Game Over! The correct word was: ${originalWord}`;
                setTimeout(fetchWord, 3000);
            }
        }
    });
}
