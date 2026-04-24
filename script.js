const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

function addMessage(text, sender) {
  const messageDiv = document.createElement("div");

  messageDiv.classList.add("message", sender);
  messageDiv.textContent = text;

  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function getBotResponse(userMessage) {
  return "Thanks for your message. I will soon be able to answer cybersecurity questions.";
}

function sendMessage() {
  const message = userInput.value.trim();

  if (message === "") {
    return;
  }

  addMessage(message, "user");

  const botResponse = getBotResponse(message);

  setTimeout(function () {
    addMessage(botResponse, "bot");
  }, 500);

  userInput.value = "";
}

sendBtn.addEventListener("click", sendMessage);

userInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    sendMessage();
  }
});