import { useState } from "react";
import { useNavigate } from "react-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

export function Login() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem("user", name);
    navigate("/quiz");
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-80 space-y-4">
        <h1 className="text-2xl font-bold text-center">Quiz App</h1>

        <Input
          placeholder="Masukkan nama"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Button
          className="w-full flex gap-2"
          onClick={handleLogin}
          disabled={!name}
        >
          <LogIn size={18} />
          Mulai Kuis
        </Button>
      </div>
    </div>
  );
}
