import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { LoginCard } from "./components/auth/login-card";
import { useQuizGame } from "./hooks/use-quiz-game";
import { QuizResult } from "./components/quiz/quiz-result";
import { QuizQuestion } from "./components/quiz/quiz-question";

export function App() {
  const [username, setUsername] = useState<string | null>(null);

  const {
    questions,
    currentQuestion,
    currentIndex,
    score,
    wrong,
    loading,
    isGameOver,
    userAnswer,
    timeLeft,
    handleAnswer,
    restartGame,
  } = useQuizGame(!!username);

  useEffect(() => {
    const saved = localStorage.getItem("quiz_user");
    if (saved) setUsername(saved);
  }, []);

  const handleLogin = (name: string) => {
    localStorage.setItem("quiz_user", name);
    setUsername(name);
  };

  const handleLogout = () => {
    localStorage.removeItem("quiz_user");
    localStorage.removeItem("quiz_game_state");
    setUsername(null);
    restartGame();
  };

  if (!username) {
    return <LoginCard onLogin={handleLogin} />;
  }

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-slate-500">Memuat Kuis...</span>
      </div>
    );
  }

  if (isGameOver) {
    return (
      <QuizResult
        username={username}
        score={score}
        wrong={wrong}
        timeLeft={timeLeft}
        totalQuestions={questions.length}
        onRestart={restartGame}
        onLogout={handleLogout}
      />
    );
  }

  if (!currentQuestion) {
    return null;
  }

  return (
    <QuizQuestion
      question={currentQuestion}
      currentIndex={currentIndex}
      totalQuestions={questions.length}
      timeLeft={timeLeft}
      userAnswer={userAnswer}
      onAnswer={handleAnswer}
    />
  );
}
