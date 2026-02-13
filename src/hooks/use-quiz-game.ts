import { useState, useEffect } from "react";
import { decodeHtml, shuffleArray } from "@/lib/quiz-helpers";
import type { APIResponse, QuestionState } from "@/modules/quiz/type";

const GAME_DURATION = 60;
const STORAGE_KEY = "quiz_game_state";

export function useQuizGame() {
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isGameOver, setIsGameOver] = useState(false);
  const [userAnswer, setUserAnswer] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);

  const fetchQuestions = async () => {
    setLoading(true);
    setIsGameOver(false);
    setScore(0);
    setWrong(0);
    setCurrentIndex(0);
    setUserAnswer(null);

    localStorage.removeItem(STORAGE_KEY);

    try {
      const res = await fetch(
        "https://opentdb.com/api.php?amount=10&category=27&difficulty=easy&type=multiple",
      );
      const data: APIResponse = await res.json();

      const newQuestions = data.results.map((q) => ({
        ...q,
        question: decodeHtml(q.question),
        correct_answer: decodeHtml(q.correct_answer),
        answers: shuffleArray([...q.incorrect_answers, q.correct_answer]).map(
          decodeHtml,
        ),
      }));

      setQuestions(newQuestions);

      setTimeLeft(GAME_DURATION);
    } catch (error) {
      console.log("Error ambil data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      const parsed = JSON.parse(saved);
      if (!parsed.isGameOver && parsed.timeLeft > 0) {
        setQuestions(parsed.questions);
        setCurrentIndex(parsed.currentIndex);
        setScore(parsed.score);
        setWrong(parsed.wrong);
        setTimeLeft(parsed.timeLeft);
        setLoading(false);
        return;
      }
    }

    fetchQuestions();
  }, []);

  useEffect(() => {
    if (loading || isGameOver || questions.length === 0) return;

    if (timeLeft <= 0) {
      setIsGameOver(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [loading, isGameOver, timeLeft, questions.length]);

  useEffect(() => {
    if (questions.length > 0) {
      const stateToSave = {
        questions,
        currentIndex,
        score,
        wrong,
        timeLeft,
        isGameOver,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    }

    if (isGameOver) {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [questions, currentIndex, score, wrong, timeLeft, isGameOver]);

  const handleAnswer = (answer: string) => {
    if (userAnswer) return;

    setUserAnswer(answer);

    const currentQ = questions[currentIndex];
    if (answer === currentQ.correct_answer) {
      setScore(score + 1);
    } else {
      setWrong(wrong + 1);
    }

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
    questions,
    currentQuestion: questions[currentIndex],
    currentIndex,
    score,
    wrong,
    loading,
    isGameOver,
    userAnswer,
    timeLeft,
    handleAnswer,
    restartGame: fetchQuestions,
  };
}
