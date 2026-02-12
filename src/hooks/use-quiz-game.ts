import { useState, useEffect, useCallback } from "react";

import { decodeHtml, shuffleArray } from "@/lib/quiz-helpers";
import type { APIResponse, QuestionState } from "@/modules/quiz/type";

const GAME_DURATION = 60; // seconds

export function useQuizGame() {
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isGameOver, setIsGameOver] = useState(false);
  const [userAnswer, setUserAnswer] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);

  const fetchQuestions = useCallback(async () => {
    setIsLoading(true);
    setIsGameOver(false);
    setScore(0);
    setWrong(0);
    setCurrentIndex(0);
    setUserAnswer(null);
    setTimeLeft(GAME_DURATION);

    try {
      const res = await fetch(
        "https://opentdb.com/api.php?amount=10&category=27&difficulty=easy&type=multiple",
      );
      const data: APIResponse = await res.json();

      const formattedData = data.results.map((q) => ({
        ...q,
        question: decodeHtml(q.question),
        correct_answer: decodeHtml(q.correct_answer),
        answers: shuffleArray([...q.incorrect_answers, q.correct_answer]).map(
          decodeHtml,
        ),
      }));

      setQuestions(formattedData);
    } catch (err) {
      console.error("Failed to fetch questions", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  useEffect(() => {
    if (isLoading || isGameOver) return;

    if (timeLeft <= 0) {
      setIsGameOver(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isLoading, isGameOver, timeLeft]);

  const handleAnswer = (answer: string) => {
    if (userAnswer) return;

    setUserAnswer(answer);
    const isCorrect = answer === questions[currentIndex].correct_answer;

    if (isCorrect) setScore((s) => s + 1);
    else setWrong((w) => w + 1);

    setTimeout(() => {
      if (timeLeft <= 0) return;

      const nextIndex = currentIndex + 1;
      if (nextIndex < questions.length) {
        setCurrentIndex(nextIndex);
        setUserAnswer(null);
      } else {
        setIsGameOver(true);
      }
    }, 1000);
  };

  return {
    gameState: {
      questions,
      currentQuestion: questions[currentIndex],
      currentIndex,
      score,
      wrong,
      isLoading,
      isGameOver,
      userAnswer,
      timeLeft,
    },
    actions: {
      handleAnswer,
      restartGame: fetchQuestions,
    },
  };
}
