import './styles.css';
import { 
  hideLoginError, 
  showLoginState, 
  showLoginForm, 
  showApp, 
  showLoginError,
  btnLogin,
  btnSignup,
  btnLogout
} from './ui'

import { initializeApp } from 'firebase/app';
import { 
  getAuth,
  onAuthStateChanged, 
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  connectAuthEmulator
} from 'firebase/auth';

const firebaseApp = initializeApp({
    apiKey: "AIzaSyBNONBEDPAboY_jHIBTecolN2_Gg0ajyj4",
    authDomain: "yunduanziliaokushiwu03.firebaseapp.com",
    projectId: "yunduanziliaokushiwu03",
    storageBucket: "yunduanziliaokushiwu03.firebasestorage.app",
    messagingSenderId: "342439554296",
    appId: "1:342439554296:web:1816471ae497dc08861f0d"
});

// Login using email/password
const loginEmailPassword = async () => {
  const loginEmail = txtEmail.value
  const loginPassword = txtPassword.value

  try {
    await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
  }
  catch (error) {
      console.log(error)
      showLoginError(error)
    }
  }

// Create new account using email/password
const createAccount = async () => {
  const email = txtEmail.value
  const password = txtPassword.value

  try {
    await createUserWithEmailAndPassword(auth, email, password)
  }
  catch(error) {
    console.log(error)
    showLoginError(error)
  } 
} 

// Monitor auth state
const monitorAuthState = async () => {
  onAuthStateChanged(auth, user => {
    if (user) {
      console.log(user)
      showApp()
      showLoginState(user)

      hideLoginError()
      hideLinkError()
    }
    else {
      showLoginForm()
      lblAuthState.innerHTML = `You're not logged in.`
    }
  })
}

// Log out
const logout = async () => {
  await signOut(auth);
}

btnLogin.addEventListener("click", loginEmailPassword) 
btnSignup.addEventListener("click", createAccount)
btnLogout.addEventListener("click", logout)

const auth = getAuth(firebaseApp);
connectAuthEmulator(auth, "http://localhost:9099");

monitorAuthState();

