import { useState } from "react";
import { ShoppingBag, Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    async function handleLogin() {
        try {
            setLoading(true);
            setError("");

            const res = await fetch(
                "http://localhost:3000/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                }
            );

            if (!res.ok) {
                throw new Error(
                    "E-mail ou senha inválidos. Tente novamente."
                );
            }

            const data = await res.json();
            const token = data.accessToken

            localStorage.setItem(
                "token",
                token
            );

            navigate("/dashboard");

        } catch (err: any) {
            setError(
                err.message || "Login failed"
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl">

                {/* HEADER */}
                <div className="flex flex-col items-center mb-8">
                    <div className="bg-white text-black p-3 rounded-2xl mb-4">
                        <ShoppingBag size={32} />
                    </div>

                    <h1 className="text-3xl font-bold text-white">
                        Bem vindo!
                    </h1>

                    <p className="text-zinc-400 mt-2 text-center">
                        Faça login para continuar
                    </p>
                </div>

                {/* FORM */}
                <form
                    className="space-y-5"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleLogin();
                    }}
                >
                    {/* EMAIL */}
                    <div>
                        <label className="text-sm text-zinc-300 mb-2 block">
                            E-mail
                        </label>

                        <div className="relative">
                            <Mail
                                size={18}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                            />

                            <input
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl py-3 pl-10 pr-4 text-white outline-none focus:ring-2 focus:ring-white"
                            />
                        </div>
                    </div>

                    {/* PASSWORD */}
                    <div>
                        <label className="text-sm text-zinc-300 mb-2 block">
                            Senha
                        </label>

                        <div className="relative">
                            <Lock
                                size={18}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                            />

                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl py-3 pl-10 pr-4 text-white outline-none focus:ring-2 focus:ring-white"
                            />
                        </div>
                    </div>

                    {/* ERROR */}
                    {error && (
                        <p className="text-red-400 text-sm">
                            {error}
                        </p>
                    )}

                    {/* SUBMIT */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-white text-black font-semibold py-3 rounded-xl hover:bg-zinc-200 transition disabled:opacity-50"
                    >
                        {loading
                            ? "Carregando..."
                            : "Entrar"}
                    </button>
                </form>
            </div>
        </div>
    );
}