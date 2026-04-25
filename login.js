import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  OAuthProvider,
  signInWithPopup,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.12.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyD8G7EUIeXp0nG8fCtfiH0rMt84VR3L6cg",
  authDomain: "pipogpt-a1879.firebaseapp.com",
  projectId: "pipogpt-a1879"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

window.google = () => signInWithPopup(auth, new GoogleAuthProvider());
window.github = () => signInWithPopup(auth, new GithubAuthProvider());
window.microsoft = () => signInWithPopup(auth, new OAuthProvider('microsoft.com'));

onAuthStateChanged(auth, user=>{
  if(user) location.href="/";
});
