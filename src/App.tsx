import { Routes, Route, Navigate } from "react-router";
import { Login } from "./app/pages/login";
import { Quiz } from "./app/pages/quiz";
import { Result } from "./app/pages/Result";

export function App() {
  const user = localStorage.getItem("user");

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/quiz" element={user ? <Quiz /> : <Navigate to="/" />} />
      <Route path="/result" element={<Result />} />
    </Routes>
  );
}
