import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useQuizGame } from "@/hooks/use-quiz-game";
import { LoginCard } from "@/components/auth/login-card";
import { QuizQuestion } from "@/components/quiz/quiz-question";
import { QuizResult } from "@/components/quiz/quiz-result";

export function App() {
  const [username, setUsername] = useState<string | null>(null);
  const { gameState, actions } = useQuizGame();

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
    setUsername(null);
    actions.restartGame();
  };

  if (!username) {
    return <LoginCard onLogin={handleLogin} />;
  }

  if (gameState.isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (gameState.isGameOver) {
    return (
      <QuizResult
        username={username}
        score={gameState.score}
        wrong={gameState.wrong}
        timeLeft={gameState.timeLeft}
        totalQuestions={gameState.questions.length}
        onRestart={actions.restartGame}
        onLogout={handleLogout}
      />
    );
  }

  return (
    <QuizQuestion
      question={gameState.currentQuestion}
      currentIndex={gameState.currentIndex}
      totalQuestions={gameState.questions.length}
      timeLeft={gameState.timeLeft}
      userAnswer={gameState.userAnswer}
      onAnswer={actions.handleAnswer}
    />
  );
}
