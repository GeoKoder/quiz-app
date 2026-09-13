// ==========================================================================
// Quiz App - Interactive Logic & State Machine
// Built according to the Step-by-Step Implementation Guide
// ==========================================================================

// Step 2: Load and Prepare Your Data
console.log("Quiz questions loaded:", typeof quizQuestions !== "undefined" ? quizQuestions.length : 0);

// State Variables
let currentQuestionIndex = 0;
let score = 0;
let usersAnswers = [];
let timerInterval = null;
const QUESTION_TIME_LIMIT = 15;
let timeLeft = QUESTION_TIME_LIMIT;
let isAnswerLocked = false;

// DOM Elements - Screens
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');
const reviewScreen = document.getElementById('review-screen');

// DOM Elements - Start Screen
const startBtn = document.getElementById('start-btn');
const previousScoreDisp = document.getElementById('previous-score');

// DOM Elements - Quiz Screen
const progressBar = document.getElementById('progress-bar');
const timerDisplay = document.getElementById('timer-display');
const questionText = document.getElementById('question-text');
const answerButtonsContainer = document.getElementById('answer-buttons');
const currentScoreDisp = document.getElementById('current-score-disp');

// DOM Elements - Results Screen
const letterGradeDisp = document.getElementById('letter-grade');
const finalScoreDisp = document.getElementById('final-score');
const scorePercentageDisp = document.getElementById('score-percentage');
const messageDisp = document.getElementById('message');
const reviewBtn = document.getElementById('review-btn');
const restartBtn = document.getElementById('restart-btn');

// DOM Elements - Review Screen
const cardContainer = document.getElementById('card-container');
const resultsBtn = document.getElementById('results-btn');

// ==========================================================================
// Screen Management Helper
// ==========================================================================
function showScreen(screenToShow) {
    [startScreen, quizScreen, resultsScreen, reviewScreen].forEach(screen => {
        if (screen) screen.style.display = 'none';
    });
    if (screenToShow) {
        screenToShow.style.display = 'flex';
    }
}

// ==========================================================================
// Step 3 & Step 9: Start / Restart Flow
// ==========================================================================
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    usersAnswers = [];
    isAnswerLocked = false;
    clearInterval(timerInterval);

    showScreen(quizScreen);
    loadQuestion();
}

if (startBtn) {
    startBtn.addEventListener('click', startQuiz);
}

if (restartBtn) {
    restartBtn.addEventListener('click', startQuiz);
}

// ==========================================================================
// Step 4: Display a Question
// ==========================================================================
function loadQuestion() {
    // Check if questions are loaded and index is valid
    if (!quizQuestions || currentQuestionIndex >= quizQuestions.length) {
        showResults();
        return;
    }

    const currentQ = quizQuestions[currentQuestionIndex];
    isAnswerLocked = false;

    // 1. Update Question Text
    questionText.textContent = currentQ.question;

    // 2. Clear previous answer buttons and generate new ones
    answerButtonsContainer.innerHTML = '';
    currentQ.options.forEach((optionText, index) => {
        const button = document.createElement('button');
        button.className = 'answer-btn';
        button.textContent = optionText;
        button.setAttribute('data-index', index);
        button.addEventListener('click', () => handleAnswerSelection(index));
        answerButtonsContainer.appendChild(button);
    });

    // 3. Update Progress Bar
    const progressPercent = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
    progressBar.style.width = `${progressPercent}%`;

    // 4. Update Current Question & Score Display
    currentScoreDisp.textContent = `Question ${currentQuestionIndex + 1} of ${quizQuestions.length} • Score: ${score}`;

    // 5. Reset and start Timer
    startTimer();
}

// ==========================================================================
// Step 5: Handle Answer Selection
// ==========================================================================
function handleAnswerSelection(selectedIndex) {
    // Guard against multiple clicks
    if (isAnswerLocked) return;
    isAnswerLocked = true;

    // Stop timer immediately
    clearInterval(timerInterval);

    const currentQ = quizQuestions[currentQuestionIndex];
    const buttons = answerButtonsContainer.querySelectorAll('button');
    const isCorrect = selectedIndex === currentQ.correct;

    // Disable all answer buttons
    buttons.forEach(btn => {
        btn.disabled = true;
    });

    // Highlight selected and correct buttons
    buttons.forEach(btn => {
        const btnIndex = parseInt(btn.getAttribute('data-index'), 10);
        if (btnIndex === currentQ.correct) {
            btn.classList.add('correct');
        }
        if (btnIndex === selectedIndex) {
            btn.classList.add('wrong');
        }
    });

    // Increment score if correct
    if (isCorrect) {
        score++;
    }

    // Record answer for Review Mode
    usersAnswers.push({
        question: currentQ.question,
        options: [...currentQ.options],
        selectedIndex: selectedIndex,
        correctIndex: currentQ.correct,
        isCorrect: isCorrect,
        timedOut: false
    });

    // After brief 1.5s delay, advance to next question
    setTimeout(advanceQuestion, 1500);
}

// ==========================================================================
// Step 6: Implement the Timer
// ==========================================================================
function startTimer() {
    clearInterval(timerInterval);
    timeLeft = QUESTION_TIME_LIMIT;
    updateTimerDisplay();

    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            handleTimeout();
        }
    }, 1000);
}

function updateTimerDisplay() {
    if (!timerDisplay) return;
    timerDisplay.textContent = `⏱️ ${timeLeft}s`;

    if (timeLeft <= 5) {
        timerDisplay.classList.add('time-warning');
    } else {
        timerDisplay.classList.remove('time-warning');
    }
}

function handleTimeout() {
    if (isAnswerLocked) return;
    isAnswerLocked = true;

    const currentQ = quizQuestions[currentQuestionIndex];
    const buttons = answerButtonsContainer.querySelectorAll('button');

    // Disable all buttons and highlight the correct answer in green
    buttons.forEach(btn => {
        btn.disabled = true;
        const btnIndex = parseInt(btn.getAttribute('data-index'), 10);
        if (btnIndex === currentQ.correct) {
            btn.classList.add('correct');
        }
    });

    // Record timeout in user answers
    usersAnswers.push({
        question: currentQ.question,
        options: [...currentQ.options],
        selectedIndex: null,
        correctIndex: currentQ.correct,
        isCorrect: false,
        timedOut: true
    });

    // Advance after brief 1.5s delay
    setTimeout(advanceQuestion, 1500);
}

function advanceQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

// ==========================================================================
// Step 7: Build the Results Screen
// ==========================================================================
function showResults() {
    clearInterval(timerInterval);
    showScreen(resultsScreen);

    const totalQuestions = quizQuestions.length;
    const percentage = Math.round((score / totalQuestions) * 100);

    // Calculate Letter Grade
    let grade = 'F';
    let message = "Don't give up! Review your answers and try again.";

    if (percentage >= 90) {
        grade = 'A+';
        message = "Outstanding! You're a certified quiz master!";
    } else if (percentage >= 80) {
        grade = 'A';
        message = "Excellent work! You really know your stuff!";
    } else if (percentage >= 70) {
        grade = 'B';
        message = "Great job! A very solid performance.";
    } else if (percentage >= 60) {
        grade = 'C';
        message = "Good effort! A little more practice and you'll ace it.";
    } else if (percentage >= 50) {
        grade = 'D';
        message = "Fair attempt! Practice a bit more to sharpen your skills.";
    }

    // Update DOM
    if (letterGradeDisp) letterGradeDisp.textContent = grade;
    if (finalScoreDisp) finalScoreDisp.textContent = `${score} / ${totalQuestions}`;
    if (scorePercentageDisp) scorePercentageDisp.textContent = `${percentage}% Accuracy`;
    if (messageDisp) messageDisp.textContent = message;

    // Step 10: Save score to localStorage
    saveScoreToLocalStorage(score, totalQuestions, percentage);
}

// ==========================================================================
// Step 8: Build Review Mode
// ==========================================================================
function showReview() {
    showScreen(reviewScreen);
    cardContainer.innerHTML = '';

    usersAnswers.forEach((ans, index) => {
        const card = document.createElement('div');
        card.className = 'review-card';

        // Header with question number and status badge
        const header = document.createElement('div');
        header.className = 'review-card-header';

        const title = document.createElement('h3');
        title.textContent = `${index + 1}. ${ans.question}`;

        const badge = document.createElement('span');
        badge.className = 'review-badge';

        if (ans.isCorrect) {
            badge.classList.add('correct');
            badge.textContent = 'Correct';
        } else if (ans.timedOut) {
            badge.classList.add('timeout');
            badge.textContent = 'Timed Out';
        } else {
            badge.classList.add('wrong');
            badge.textContent = 'Incorrect';
        }

        header.appendChild(title);
        header.appendChild(badge);
        card.appendChild(header);

        // Answers breakdown
        const answersRow = document.createElement('div');
        answersRow.className = 'review-answer-row';

        const userAnsEl = document.createElement('p');
        userAnsEl.className = 'user-answer';

        if (ans.timedOut) {
            userAnsEl.classList.add('wrong');
            userAnsEl.textContent = `⏱️ No answer selected (Time Expired)`;
        } else if (ans.isCorrect) {
            userAnsEl.classList.add('correct');
            userAnsEl.textContent = `✓ Your Answer: ${ans.options[ans.selectedIndex]}`;
        } else {
            userAnsEl.classList.add('wrong');
            userAnsEl.textContent = `✕ Your Answer: ${ans.options[ans.selectedIndex]}`;
        }
        answersRow.appendChild(userAnsEl);

        // If incorrect or timed out, display the correct answer
        if (!ans.isCorrect) {
            const correctAnsEl = document.createElement('p');
            correctAnsEl.className = 'correct-answer';
            correctAnsEl.textContent = `✓ Correct Answer: ${ans.options[ans.correctIndex]}`;
            answersRow.appendChild(correctAnsEl);
        }

        card.appendChild(answersRow);
        cardContainer.appendChild(card);
    });
}

if (reviewBtn) {
    reviewBtn.addEventListener('click', showReview);
}

if (resultsBtn) {
    resultsBtn.addEventListener('click', () => {
        showScreen(resultsScreen);
    });
}

// ==========================================================================
// Step 10: localStorage Integration
// ==========================================================================
function saveScoreToLocalStorage(userScore, total, percentage) {
    try {
        const today = new Date();
        const dateString = today.toLocaleDateString('en-KE', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });

        const scoreRecord = {
            score: userScore,
            total: total,
            percentage: percentage,
            date: dateString
        };

        localStorage.setItem('quizAppLastScore', JSON.stringify(scoreRecord));
        displayPreviousScore();
    } catch (e) {
        console.warn("Could not save to localStorage:", e);
    }
}

function displayPreviousScore() {
    if (!previousScoreDisp) return;

    try {
        const raw = localStorage.getItem('quizAppLastScore');
        if (!raw) {
            previousScoreDisp.textContent = '';
            previousScoreDisp.style.display = 'none';
            return;
        }

        const data = JSON.parse(raw);
        if (data && typeof data.score !== 'undefined') {
            previousScoreDisp.textContent = `🎯 Last Score: ${data.score}/${data.total} (${data.percentage}%) on ${data.date}`;
            previousScoreDisp.style.display = 'inline-flex';
        }
    } catch (e) {
        console.warn("Could not parse previous score:", e);
        previousScoreDisp.style.display = 'none';
    }
}

// Initialize on page load
displayPreviousScore();