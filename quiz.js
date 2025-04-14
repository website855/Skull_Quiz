const questions = [
    {
        question: "Which bone forms the forehead?",
        options: ["Temporal bone", "Parietal bone", "Frontal bone", "Occipital bone"],
        correct: 2,
      },
      {
        question: "Which of these is NOT part of the skull?",
        options: ["Mandible", "Femur", "Maxilla", "Zygomatic bone"],
        correct: 1,
      },
      {
        question: "What protects the brain?",
        options: ["Spine", "Skull", "Ribcage", "Pelvis"],
        correct: 1,
      },
      {
        question: "Which is the strongest bone in the face?",
        options: ["Nasal", "Maxilla", "Mandible", "Zygomatic"],
        correct: 2,
      },
      {
        question: "What is the soft spot on a baby’s skull called?",
        options: ["Foramen", "Suture", "Fontanelle", "Sinus"],
        correct: 2,
      },
      {
        question: "Which bone is commonly known as the cheekbone?",
        options: ["Zygomatic bone", "Maxilla", "Mandible", "Nasal bone"],
        correct: 0,
      },
      {
        question: "The occipital bone is located at which part of the skull?",
        options: ["Front", "Top", "Side", "Back"],
        correct: 3,
      },
      {
        question: "How many cranial bones are there in the human skull?",
        options: ["6", "8", "12", "14"],
        correct: 1,
      },
      {
        question: "What is the purpose of sutures in the skull?",
        options: ["Join muscles", "Transfer nerves", "Hold teeth", "Join skull bones"],
        correct: 3,
      },
      {
        question: "Which bone contains the ear canal?",
        options: ["Occipital", "Temporal", "Frontal", "Sphenoid"],
        correct: 1,
      },
      {
        question: "Which part of the skull forms the lower jaw?",
        options: ["Maxilla", "Zygomatic", "Mandible", "Temporal"],
        correct: 2,
      },
      {
        question: "How many facial bones are in the human skull?",
        options: ["14", "8", "12", "10"],
        correct: 0,
      },
      {
        question: "What is the hole at the base of the skull called where the spinal cord passes?",
        options: ["Sella turcica", "Foramen magnum", "Fontanelle", "Cranial fossa"],
        correct: 1,
      },
      {
        question: "Which bone supports the nose structurally?",
        options: ["Ethmoid bone", "Mandible", "Frontal bone", "Maxilla"],
        correct: 0,
      },
      {
        question: "Which bone contains the pituitary gland?",
        options: ["Occipital", "Sphenoid", "Parietal", "Temporal"],
        correct: 1,
      },
      {
        question: "The parietal bones are located where on the skull?",
        options: ["Front", "Sides and top", "Back", "Below ears"],
        correct: 1,
      },
      {
        question: "Which bone forms the upper jaw?",
        options: ["Mandible", "Maxilla", "Zygomatic", "Ethmoid"],
        correct: 1,
      },
      {
        question: "What are sinuses in the skull used for?",
        options: ["Holding blood", "Filtering air", "Reducing skull weight", "Muscle attachment"],
        correct: 2,
      },
      {
        question: "Which skull bone contains the mastoid process?",
        options: ["Parietal", "Frontal", "Temporal", "Occipital"],
        correct: 2,
      },
      {
        question: "What type of joint connects the bones of the skull?",
        options: ["Hinge joint", "Ball and socket", "Suture joint", "Gliding joint"],
        correct: 2,
      }
  ];
  
  let currentQuestionIndex = 0;
  let correctAnswers = 0;
  let incorrectAnswers = 0;
  let selectedAnswers = [];
  let startTime;
  let timerInterval;
  
  document.getElementById("startBtn").addEventListener("click", startQuiz);
  
  function startQuiz() {
    document.getElementById("welcomeScreen").style.display = "none";
    document.getElementById("quizScreen").style.display = "block";
    startTime = new Date();
    timerInterval = setInterval(updateTimer, 1000);
    loadQuestion();
  }
  
  function loadQuestion() {
    const current = questions[currentQuestionIndex];
    document.getElementById("questionText").textContent = current.question;
  
    const options = document.querySelectorAll(".quiz-option");
    options.forEach((btn, index) => {
      btn.textContent = current.options[index];
      btn.onclick = () => handleAnswer(index);
    });
  }
  
  function handleAnswer(selectedIndex) {
    const correctIndex = questions[currentQuestionIndex].correct;
    selectedAnswers.push(selectedIndex);
  
    if (selectedIndex === correctIndex) {
      correctAnswers++;
    } else {
      incorrectAnswers++;
    }
  
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      loadQuestion();
    } else {
      endQuiz();
    }
  }
  
  function updateTimer() {
    const elapsed = Math.floor((new Date() - startTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    document.getElementById("time").textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
  
  function endQuiz() {
    clearInterval(timerInterval);
    document.getElementById("quizScreen").style.display = "none";
    document.getElementById("resultScreen").style.display = "block";
  
    const totalTime = Math.floor((new Date() - startTime) / 1000);
    const minutes = Math.floor(totalTime / 60);
    const seconds = totalTime % 60;
  
    document.getElementById("finalScore").textContent = correctAnswers;
    document.getElementById("correctAnswers").textContent = correctAnswers;
    document.getElementById("incorrectAnswers").textContent = incorrectAnswers;
    document.getElementById("totalTime").textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
  
  document.getElementById("showAnswersBtn").addEventListener("click", () => {
    const container = document.getElementById("answerReviewContainer");
    container.innerHTML = "<h3>Answer Review 🧠</h3>";
    questions.forEach((q, index) => {
      const correct = q.options[q.correct];
      const selected = q.options[selectedAnswers[index]] || "No answer";
      const isCorrect = q.correct === selectedAnswers[index];
      container.innerHTML += `
        <div>
          <strong>Q${index + 1}:</strong> ${q.question}<br/>
          ✅ Correct: ${correct}<br/>
          ${isCorrect ? "🟢" : "🔴"} Your Answer: ${selected}
        </div>
      `;
    });
  });
  
  let chartInstance = null;

  document.getElementById("showPieChartBtn").addEventListener("click", () => {
    document.getElementById("pieChartContainer").style.display = "block";
  
    const ctx = document.getElementById("pieChart").getContext("2d");
  
    // Destroy previous chart instance if it exists
    if (chartInstance) {
      chartInstance.destroy();
    }
  
    chartInstance = new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Correct ✅", "Incorrect ❌"],
        datasets: [{
          data: [correctAnswers, incorrectAnswers],
          backgroundColor: ["green", "red"]
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              color: "white" // Optional: match your dark background
            }
          }
        }
      }
    });
  });
  
  