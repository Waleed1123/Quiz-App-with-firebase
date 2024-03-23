// Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  set,
} from "https://www.gstatic.com/firebasejs/9.6.6/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0MTdpR3Z0Rs6wFtrFGI02iX61fh2EOT4",
  authDomain: "quiz-application-2bd1c.firebaseapp.com",
  projectId: "quiz-application-2bd1c",
  storageBucket: "quiz-application-2bd1c.appspot.com",
  messagingSenderId: "225703172959",
  appId: "1:225703172959:web:9a1f38fd4fd04b3afc34ea",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

// Getting All The Elements With ID
var question = document.getElementById("question");
var optionsInput = document.getElementById("optionsInput");
var optionsParent = document.getElementById("options-parent");
var correctAnsEle = document.getElementById("correctAns");

// This array will be used to push options
var options = [];
// This variable will be used for correct Answer
var correctAns;

// options yaha se add hon ghe Button ke click per
window.renderOptions = function () {
  optionsParent.innerHTML = "";
  for (let i = 0; i < options.length; i++) {
    optionsParent.innerHTML += `<li onclick="correctOption('${options[i]}')">${options[i]}</li>`;
  }
};

// Agar user option likhe baghir button click kare gha tu ye alert chale gha
window.addOptions = function () {
  if (!optionsInput.value) {
    Swal.fire({
      title: "Add Value",
      text: "You have to add options to run this  ",
      icon: "question",
    });
    return;
  }
  options.push(optionsInput.value);
  renderOptions();
  optionsInput.value = "";
};
// Correct Options ko click karne per UI per show karae gha
window.correctOption = function (a) {
  correctAns = a;
  correctAnsEle.innerHTML = correctAns;
};

// ye Button ke click per chale gha jahah database ma object save hoo gha
window.submitQuestion = function () {
  var obj = {
    question: question.value,
    options: options,
    correctAns: correctAns,
  };
  // Question a reference add kareen ghe database ma aur Object save kara deen ghe
  // Sweet Alert Chale gha user ko response dene ke liye
  const newQuestionRef = push(ref(db, "questions/"));
  set(newQuestionRef, obj)
    .then(() => {
      Swal.fire({
        title: "Question Added",
        text: "Your Question have been added to database.",
        icon: "success",
      });
    })
    .catch((error) => {
      // agar error aya tu ye alert chale gha
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
      });
    });

  // Sari values khali hoon jae ghi Database ma add hone ke bad taa ke hum naya question add kar sakeen
  question.value = "";
  optionsInput.value = "";
  options = [];
  optionsParent.innerHTML = "";
  correctAnsEle.innerHTML = "Correct Answer";
};

// Alhumdulillah Done
// Grateful for the guidance from Sir Basit Ahmed. Jezak Allah Sir If you are reading this by any chance.
