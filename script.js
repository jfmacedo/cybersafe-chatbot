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
  const text = userMessage.toLowerCase();

  if (text.includes("phishing")) {
    return "Phishing is a cyber attack where scammers try to trick you into giving personal information through fake emails, messages, or websites.";
  }

  if (text.includes("password")) {
    return "A strong password should be long, unique, and include uppercase letters, lowercase letters, numbers, and symbols. Avoid using personal information.";
  }

  if (text.includes("2fa") || text.includes("two-factor") || text.includes("authentication")) {
    return "2FA (Two-Factor Authentication) adds an extra layer of security by requiring a second verification step, like a code sent to your phone.";
  }

  if (text.includes("malware")) {
    return "Malware is harmful software designed to damage or gain unauthorized access to systems. Examples include viruses, ransomware, and spyware.";
  }

  if (text.includes("scam") || text.includes("suspicious") || text.includes("email")) {
    return "Be careful with suspicious messages. Common signs include urgency, requests for personal data, and unknown links.";
  }

  if (text.includes("hello") || text.includes("hi")) {
    return "Hello! 👋 I can help you with phishing, passwords, 2FA, malware, and suspicious messages.";
  }

  return "I can help you with phishing, passwords, 2FA, malware, and suspicious messages. Try asking something like 'What is phishing?'";
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