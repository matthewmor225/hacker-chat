fetch("data/messages.json")
  .then(res => res.json())
  .then(data => {
    const messages = document.getElementById("messages");

    data.forEach(msg => {
      const div = document.createElement("div");
      div.textContent = `[${msg.time}] ${msg.user}: ${msg.text}`;
      messages.appendChild(div);
    });
  });