var questions = [
    {
      question: "HTML Stands for",
      option1: "Hyper Text Markup Language",
      option2: "Hyper Tech Markup Language",
      option3: "Hyper Touch Markup Language",
      corrAnswer: "Hyper Text Markup Language",
    },
    {
      question: "CSS Stands for",
      option1: "Cascoding Style Sheets",
      option2: "Cascading Style Sheets",
      option3: "Cascating Style Sheets",
      corrAnswer: "Cascading Style Sheets",
    },
    {
      question: "Which tag is used for most large heading",
      option1: "<h6>",
      option2: "<h2>",
      option3: "<h1>",
      corrAnswer: "<h1>",
    },
    {
      question: "Which tag is used to make element unique ",
      option1: "id",
      option2: "class  ",
      option3: "label",
      corrAnswer: "id",
    },
    {
      question: "Any element assigned with id, can be get in css ",
      option1: "by # tag",
      option2: "by @ tag",
      option3: "by & tag",
      corrAnswer: "by # tag",
    },
    {
      question: "CSS can be used with ______ methods ",
      option1: "8",
      option2: "3",
      option3: "4",
      corrAnswer: "3",
    },
    {
      question: "In JS variable types are ____________ ",
      option1: "6",
      option2: "3",
      option3: "8",
      corrAnswer: "8",
    },
    {
      question: "In array we can use key name and value ",
      option1: "True",
      option2: "False",
      option3: "None of above",
      corrAnswer: "False",
    },
    {
      question: "toFixed() is used to define length of decimal ",
      option1: "True",
      option2: "False",
      option3: "None of above",
      corrAnswer: "True",
    },
    {
      question: "push() method is used to add element in the start of array ",
      option1: "True",
      option2: "False",
      option3: "None of above",
      corrAnswer: "False",
    },
  ];
  
  const firebaseConfig = {
    apiKey: "AIzaSyBQvCrL4U_Di13nJzbjFwrf9CJ1zJoQhIY",
    authDomain: "todo-app-737f2.firebaseapp.com",
    databaseURL: "https://todo-app-737f2-default-rtdb.firebaseio.com",
    projectId: "todo-app-737f2",
    storageBucket: "todo-app-737f2.firebasestorage.app",
    messagingSenderId: "322486238181",
    appId: "1:322486238181:web:3d4946ac4778d78a8dcd0c"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var auth = firebase.auth();
  var database = firebase.database();
  
  var button = document.getElementById("btn");
  function clicked() {
    button.disabled = false;
  }
  var question = document.getElementById("ques");
  var option1 = document.getElementById("opt1");
  var option2 = document.getElementById("opt2");
  var option3 = document.getElementById("opt3");
  var timerElement = document.getElementById("timer");
  var questionDiv = document.getElementById("questionDiv");
  
  var option = 0;
  var score = 0;
  var min = 1;
  var sec = 59;
  let timerInterval;
  
  function timer() {
    timerElement.innerText = `${min}:${sec}`;
    sec--;
    if (sec < 0) {
      min--;
      sec = 59;
      if (min < 0) {
        min = 1;
        sec = 59;
        nextQuestion();
      }
    }
  }
  
  function startQuiz() {
    timerInterval = setInterval(timer, 100);
    document.getElementById("questionDiv").style.display = "block";
  
    nextQuestion();
    var removeBtn = document.getElementById("startBtn");
    removeBtn.remove();
  }
  
  function nextQuestion() {
    min = 1;
    sec = 59;
    var options = document.getElementsByClassName("options");
    // console.log(options);
    for (var i = 0; i < options.length; i++) {
      if (options[i].checked) {
        var selectedOption = options[i].value;
        var getOption = questions[option - 1][`option${selectedOption}`];
        var corrAnswer = questions[option - 1][`corrAnswer`];
  
        if (getOption === corrAnswer) {
          score++;
        }
        console.log(getOption);
        console.log(corrAnswer);
        console.log(score);
      }
      options[i].checked = false;
    }
    button.disabled = true;
  
    if (option > questions.length - 1) {
      endQuiz();
    } else {
      question.innerText = questions[option].question;
      option1.innerText = questions[option].option1;
      option2.innerText = questions[option].option2;
      option3.innerText = questions[option].option3;
      option++;
    }
  }
  
  // Register function
  function register(email, password) {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => Swal.fire("Success", "Registration successful", "success"))
      .catch((error) => Swal.fire("Error", error.message, "error"));
  }
  
  // Login function
  function login(email, password) {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        Swal.fire("Success", "Login successful", "success");
        document.getElementById("authSection").style.display = "none";
        document.getElementById("quizSection").style.display = "block";
      })
      .catch((error) => Swal.fire("Error", error.code));
  }
  
  // Show login form
  function showLoginForm() {
    Swal.fire({
      title: "Login",
      html:
        '<input id="loginEmail" class="swal2-input" placeholder="Email">' +
        '<input id="loginPassword" type="password" class="swal2-input" placeholder="Password">',
      focusConfirm: false,
      preConfirm: () => {
        var email = document.getElementById("loginEmail").value;
        var password = document.getElementById("loginPassword").value;
        login(email, password);
      },
    });
  }
  
  // Show register form
  function showRegisterForm() {
    Swal.fire({
      title: "Register",
      html:
        '<input id="registerEmail" class="swal2-input" placeholder="Email">' +
        '<input id="registerPassword" type="password" class="swal2-input" placeholder="Password">',
      focusConfirm: false,
      preConfirm: () => {
        var email = document.getElementById("registerEmail").value;
        var password = document.getElementById("registerPassword").value;
        register(email, password);
      },
    });
  }
  // Function to end the quiz
  function endQuiz() {
    clearInterval(timerInterval);
    // Swal.fire(`Quiz Finished! Your score is ${score}`)  ;
    Swal.fire({
      title: `Quiz Finished! Your score is ${score}`,
      showCancelButton: false,
      confirmButtonText: "Okay",
    }).then((result) => {
      if (result.isConfirmed) {
        saveScore();
        window.location.reload();
      }
    });
   
  }
  
  // Save score to Firebase
  function saveScore() {
    database
      .ref(`scores/${auth.currentUser.uid}`)
      .push({score})
      // .then(() => Swal.fire("Success", "Score saved", "success"))
      .catch((error) => Swal.fire("Error", error.message, "error"));
  }

  