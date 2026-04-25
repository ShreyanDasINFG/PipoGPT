import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.12.1/firebase-auth.js";

// 🔥 Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyD8G7EUIeXp0nG8fCtfiH0rMt84VR3L6cg",
  authDomain: "pipogpt-a1879.firebaseapp.com",
  projectId: "pipogpt-a1879"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 🔐 Redirect if not logged in
onAuthStateChanged(auth, (user) => {
  if (!user) {
    location.href = "/login.html";
  }
});

// 🚪 Logout
window.logout = () => signOut(auth);

// 💬 Add message
function addMessage(text, type) {
  const chat = document.getElementById("chat");

  const div = document.createElement("div");
  div.className = "message " + type;

  // Bot = markdown support
  if (type === "bot") {
    div.innerHTML = marked.parse(text);
  } else {
    div.innerText = text;
  }

  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

// 🚀 Send message
window.send = async () => {
  const input = document.getElementById("msg");
  const msg = input.value.trim();

  if (!msg) return;

  input.value = "";

  // Show user message
  addMessage(msg, "user");

  // Typing placeholder
  const typing = document.createElement("div");
  typing.className = "message bot";
  typing.innerText = "Thinking...";
  document.getElementById("chat").appendChild(typing);

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: msg })
    });

    const data = await res.json();

    const full = data.choices[0].message.content;
    typing.innerText = "";

    // ✨ Typing animation
    let i = 0;
    const interval = setInterval(() => {
      typing.innerText += full[i];
      i++;
      if (i >= full.length) clearInterval(interval);
    }, 10);

  } catch (err) {
    typing.innerText = "Error: Failed to get response.";
  }
};

// ⌨️ Enter to send
document.getElementById("msg").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    send();
  }
});
