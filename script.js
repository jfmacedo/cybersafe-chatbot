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

const phishingInput = document.getElementById("phishing-input");
const analyzeBtn = document.getElementById("analyze-btn");
const riskScore = document.getElementById("risk-score");
const riskLevel = document.getElementById("risk-level");
const redFlagsList = document.getElementById("red-flags-list");
const recommendationText = document.getElementById("recommendation-text");

const phishingIndicators = [
  {
    keyword: "urgent",
    message: "Uses urgent language to pressure the user."
  },
  {
    keyword: "click here",
    message: "Encourages the user to click a link."
  },
  {
    keyword: "verify your account",
    message: "Requests account verification."
  },
  {
    keyword: "password",
    message: "Mentions or requests password information."
  },
  {
    keyword: "bank",
    message: "Mentions banking information."
  },
  {
    keyword: "login now",
    message: "Asks the user to log in immediately."
  },
  {
    keyword: "suspended",
    message: "Claims an account has been suspended."
  },
  {
    keyword: "prize",
    message: "Mentions a prize or reward."
  },
  {
    keyword: "act now",
    message: "Creates pressure to act immediately."
  },
  {
    keyword: "security alert",
    message: "Uses security warning language."
  }
];

function analyzeMessage() {
  const message = phishingInput.value.toLowerCase().trim();

  redFlagsList.innerHTML = "";

  if (message === "") {
    riskScore.textContent = "0%";
    riskLevel.textContent = "Low";
    riskLevel.className = "low";

    const listItem = document.createElement("li");
    listItem.textContent = "No message was provided.";
    redFlagsList.appendChild(listItem);

    recommendationText.textContent =
      "Please paste a suspicious message before running the analysis.";

    return;
  }

  const foundFlags = [];

  phishingIndicators.forEach(function (indicator) {
    if (message.includes(indicator.keyword)) {
      foundFlags.push(indicator.message);
    }
  });

  let score = foundFlags.length * 15;

  if (score > 100) {
    score = 100;
  }

  riskScore.textContent = score + "%";

  if (score >= 60) {
    riskLevel.textContent = "High";
    riskLevel.className = "high";
    recommendationText.textContent =
      "High risk detected. Do not click any links, do not provide personal information, and verify the sender through an official channel.";
  } else if (score >= 30) {
    riskLevel.textContent = "Medium";
    riskLevel.className = "medium";
    recommendationText.textContent =
      "Some suspicious indicators were found. Be careful and verify the message before taking any action.";
  } else {
    riskLevel.textContent = "Low";
    riskLevel.className = "low";
    recommendationText.textContent =
      "No major phishing indicators were detected. However, always verify links and sender details before trusting a message.";
  }

  if (foundFlags.length === 0) {
    const listItem = document.createElement("li");
    listItem.textContent = "No suspicious indicators found.";
    redFlagsList.appendChild(listItem);
  } else {
    foundFlags.forEach(function (flag) {
      const listItem = document.createElement("li");
      listItem.textContent = flag;
      redFlagsList.appendChild(listItem);
    });
  }
}

analyzeBtn.addEventListener("click", analyzeMessage);