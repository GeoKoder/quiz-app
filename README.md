# 🧠 Interactive Quiz Application

A modern, responsive, and feature-rich web quiz application featuring interactive timers, live score tracking, question reviews, and score persistence.

---

## 🌐 Live Demo

Experience the live application here:

👉 **[Launch Live Demo](https://geokoder.github.io/quiz-app/)** 👈

> **Note:** If you are hosting on GitHub Pages, Netlify, or Vercel, replace the URL above with your custom deployment URL.

---

## 📸 Overview & Features

- **💎 Modern Glassmorphism UI**: Built with dynamic ambient background glows, refined typography, and smooth micro-animations.
- **⏱️ Per-Question Timer**: 15-second countdown timer for each question with visual urgency warnings when under 5 seconds remaining.
- **📊 Real-Time Progress & Score Tracking**: Dynamic progress bar and live question/score tracker as you advance.
- **🎯 Instant Visual Feedback**:
  - **Correct Choice**: Highlighted with an emerald green glow and a subtle success pop animation (`.correct`).
  - **Incorrect Choice**: Highlighted in rose red with an energetic shake animation (`.wrong`), while simultaneously showing the correct answer in green.
- **🏆 Results Screen & Grading**: Calculates accuracy percentages and assigns letter grades (`A+` through `F`) with custom motivational feedback.
- **📝 Comprehensive Review Mode**: Inspect your complete quiz submission question-by-question, with clear badges (`Correct`, `Incorrect`, or `Timed Out`) and explicit correct answer solutions.
- **💾 LocalStorage Score History**: Automatically saves your most recent quiz score and timestamp, displaying your previous record when you return.
- **📱 Fully Responsive**: Fluid layouts that adapt seamlessly from mobile devices to high-resolution desktop screens.

---

## 📁 Project Structure

```plaintext
quiz-app/
├── index.html       # Semantic HTML5 markup and screen state containers
├── styles.css       # Design system, glassmorphism tokens, and micro-animations
├── questions.js     # Curated question dataset with categories and difficulty levels
├── script.js        # Core quiz state machine, timer, validation, and storage logic
└── README.md        # Project documentation and deployment guide
```

---

## 🛠️ Tech Stack

- **HTML5**: Semantic document structure with accessible elements and screen states.
- **CSS3 / Vanilla CSS**: Modern CSS variables, glassmorphic filters (`backdrop-filter`), CSS Grid, Flexbox, and custom `@keyframes` animations.
- **Vanilla JavaScript (ES6+)**: Event-driven state machine, interval timers, DOM manipulation, and Web Storage API (`localStorage`).

---

## 🚀 Getting Started Locally

### Prerequisites
A modern web browser (Google Chrome, Firefox, Safari, or Microsoft Edge).

### Running the App
1. Clone this repository:
   ```bash
   git clone https://github.com/GeoKoder/quiz-app.git
   cd quiz-app
   ```
2. Open `index.html` in your browser:
   - **Directly**: Double-click `index.html` in your file explorer.
   - **Using VS Code Live Server**: Right-click `index.html` and choose **"Open with Live Server"**.
   - **Using Python**:
     ```bash
     python -m http.server 8000
     ```
     Navigate to `http://localhost:8000` in your browser.

---

## 🚢 Deployment

### Deploying to GitHub Pages
1. Push your latest commits to the `main` branch:
   ```bash
   git add .
   git commit -m "Fix answer selection styling and add docs"
   git push origin main
   ```
2. Go to your GitHub repository on github.com.
3. Click on **Settings** > **Pages** (under the "Code and automation" section).
4. Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
5. Select branch `main` and folder `/ (root)`, then click **Save**.
6. After 1–2 minutes, your site will be live at `https://<your-username>.github.io/<repo-name>/`.
7. Update the **Live Demo** link at the top of this `README.md` with your deployment URL.

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
