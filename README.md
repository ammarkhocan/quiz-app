# React Quiz App

A web-based interactive quiz application built using **React**, **Vite**, and **TypeScript**. This application dynamically fetches trivia questions and features automatic progress persistence.

## 🌐 Links

- Live Demo: **[Quiz App](https://quiz-app-animals.netlify.app/)**

## 🚀 Key Features

- **Simple Login System:** Users simply enter their name to start the quiz session.
- **API Integration:** Questions are fetched dynamically from the **[Open Trivia Database (OpenTDB)](https://opentdb.com/)**.
  - _Configuration:_ 10 Multiple Choice questions (Animals category).
- **Global Timer:** A countdown timer (default 60 seconds) for the entire quiz.
- **Instant Navigation:** Automatically moves to the next question immediately after an answer is selected.
- **Resume Progress (Auto-Save):** Uses `localStorage` to persist game state every second. If the browser is refreshed or closed accidentally, users can resume from the exact question and time remaining.
- **Result Page:** Displays a statistical summary (Correct, Wrong, and Time Remaining) after the quiz ends.

## 🛠 Tech Stack

- **Core:** React, Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn UI
- **Icons:** Lucide React

## 📦 How to Run Locally

Follow these steps to run the code on your local machine:

1.  **Clone Repository**

    ```bash
    git clone https://github.com/ammarkhocan/quiz-app.git
    cd YOUR-FILE-NAME
    ```

2.  **Install Dependencies**

    ```bash
    npm install
    ```

3.  **Run Development Server**

    ```bash
    npm run dev
    ```

4.  **Access the App**
    Open your browser and visit `http://localhost:5173`

## 📂 Folder Structure

```text
src/
├── components/    # UI Components (Login, Question, Result)
├── hooks/         # Custom Hooks (Game Logic & Timer)
├── lib/           # Helper Functions (Time Format, Shuffle)
├── types/         # TypeScript Type Definitions
└── App.tsx        # Main Entry Point
```
