import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } 
from "https://www.gstatic.com/firebasejs/12.12.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyD8G7EUIeXp0nG8fCtfiH0rMt84VR3L6cg",
  authDomain: "pipogpt-a1879.firebaseapp.com",
  projectId: "pipogpt-a1879"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  if (!user) location.href = "/login.html";
});

window.logout = () => signOut(auth);

function addMessage(text, type) {
  const div = document.createElement("div");
  div.className = "message " + type;

  if(type === "bot"){
    div.innerHTML = marked.parse(text);
  } else {
    div.innerText = text;
  }

  document.getElementById("chat").appendChild(div);
}

window.newChat = () => {
  document.getElementById("chat").innerHTML = "";
};

window.send = async () => {
  const input = document.getElementById("msg");
  const msg = input.value.trim();
  if (!msg) return;

  input.value = "";

  addMessage(msg, "user");

  const typing = document.createElement("div");
  typing.className = "message bot";
  typing.innerText = "Thinking...";
  document.getElementById("chat").appendChild(typing);

  const res = await fetch("/api/chat", {
    method:"POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({message:msg})
  });

  const data = await res.json();
  typing.innerHTML = marked.parse(data.choices[0].message.content);
};

document.getElementById("msg").addEventListener("keydown", e=>{
  if(e.key==="Enter") send();
});
