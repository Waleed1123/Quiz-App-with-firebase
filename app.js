// Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js";
import {
  getDatabase,
  ref,
  onChildAdded,
} from "https://www.gstatic.com/firebasejs/9.6.0/firebase-database.js";

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

// Array to store data from Database
var questions = [];

let timerInterval;
Swal.fire({
  title: "Loading Quiz For You!",
  html: "I will close in <b></b> milliseconds.",
  timer: 2000, // Change the timer to 3000 milliseconds (3 seconds)
  timerProgressBar: true,
  didOpen: () => {
    Swal.showLoading();
    const timer = Swal.getPopup().querySelector("b");
    timerInterval = setInterval(() => {
      timer.textContent = `${Swal.getTimerLeft()}`;
    }, 100);
  },
  willClose: () => {
    clearInterval(timerInterval);
  },
});

// Getting Data From Database
async function getDataFromDatabase() {
  return new Promise((resolve, reject) => {
    var reference = ref(db, "questions/");
    onChildAdded(reference, function (data) {
      questions.push(data.val());
      console.log(questions);
      resolve();
    });
  });
}
// }
// Code updateing

// final

// Wait for data to fetch from the database, then render
async function startQuiz() {
  await getDataFromDatabase();
  renderQuestion();
}

// All HTML Elements Importing
let currQuestion = document.getElementById("currQuestion");
let totalQuestion = document.getElementById("totalQuestion");
let question = document.getElementById("question");
var renderAns = document.getElementById("answer-parent");

let indexNum = 0;
let score = 0;

// This function works when the Next button is clicked
window.nextQuestion = function () {
  indexNum++;
  renderQuestion();
};

// This function counts the user's score
window.currAnswer = function (a, b) {
  if (a == b) {
    score++;
    console.log(score);
  }
  nextQuestion();
};

// This function renders the user's questions after fetching
function renderQuestion() {
  currQuestion.innerHTML = indexNum + 1;
  totalQuestion.innerHTML = questions.length;

  if (indexNum < questions.length) {
    question.innerHTML = questions[indexNum].question;

    renderAns.innerHTML = "";
    for (var i = 0; i < questions[indexNum].options.length; i++) {
      renderAns.innerHTML += `<div class="answer">
        <button onclick="currAnswer('${questions[indexNum].options[i]}','${questions[indexNum].correctAns}')">${questions[indexNum].options[i]}</button>
      </div>`;
    }
  } else {
    swal.fire({
      title: "Your Score is " + score,
      text: "Quiz Completed",
      icon: "success",
    });
    currQuestion.innerHTML = "Completed";
  }
}

startQuiz();

// Alhumdulillah Done
// Grateful for the guidance from Sir Basit Ahmed. Jezak Allah Sir If you are reading
// this by any chance
