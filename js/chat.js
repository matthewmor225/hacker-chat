const input = document.getElementById("msgInput");
const messagesDiv = document.getElementById("messages");
const channels = document.querySelectorAll(".channel");

// ===== USERNAME =====
let username = localStorage.getItem("username");

if (!username) {
  username = prompt("Enter your hacker name:");
  if (!username) username = "anon";
  localStorage.setItem("username", username);
}

// ===== CHANNEL SYSTEM =====
let currentChannel = "general";

// Load messages for channel
function loadMessages() {
  messagesDiv.innerHTML = "";

  const messages =
    JSON.parse(localStorage.getItem("chat_" + currentChannel)) || [];

  messages.forEach(msg => {
    const div = document.createElement("div");
    div.textContent = `[${msg.user}]: ${msg.text}`;
    messagesDiv.appendChild(div);
  });

  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Save message
function saveMessage(text) {
  const messages =
    JSON.parse(localStorage.getItem("chat_" + currentChannel)) || [];

  messages.push({
    user: username,
    text: text
  });

  localStorage.setItem(
    "chat_" + currentChannel,
    JSON.stringify(messages)
  );
}

// Channel click
channels.forEach(channel => {
  channel.addEventListener("click", () => {
    channels.forEach(c => c.classList.remove("active"));
    channel.classList.add("active");

    currentChannel = channel.dataset.channel;
    loadMessages();
  });
});

// Send message
input.addEventListener("keydown", e => {
  if (e.key === "Enter" && input.value.trim() !== "") {
    saveMessage(input.value);

    const div = document.createElement("div");
    div.textContent = `[${username}]: ${input.value}`;
    messagesDiv.appendChild(div);

    input.value = "";
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }
});

// Start app
loadMessages();