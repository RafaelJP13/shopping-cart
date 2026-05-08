import { ShoppingBag, Mail, Lock } from 'lucide-react';

type LoginPageProps = {
    onLogin: () => void;
};

export default function LoginPage({ onLogin }: LoginPageProps) {
    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl">

                <div className="flex flex-col items-center mb-8">
                    <div className="bg-white text-black p-3 rounded-2xl mb-4">
                        <ShoppingBag size={32} />
                    </div>

                    <h1 className="text-3xl font-bold text-white">
                        Welcome Back
                    </h1>

                    <p className="text-zinc-400 mt-2 text-center">
                        Login to continue shopping
                    </p>
                </div>

                <form
                    className="space-y-5"
                    onSubmit={(e) => {
                        e.preventDefault();
                        onLogin();
                    }}
                >
                    <div>
                        <label className="text-sm text-zinc-300 mb-2 block">
                            Email
                        </label>

                        <div className="relative">
                            <Mail
                                size={18}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                            />

                            <input
                                type="email"
                                placeholder="you@example.com"
                                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl py-3 pl-10 pr-4 text-white outline-none focus:ring-2 focus:ring-white"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-sm text-zinc-300 mb-2 block">
                            Password
                        </label>

                        <div className="relative">
                            <Lock
                                size={18}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                            />

                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl py-3 pl-10 pr-4 text-white outline-none focus:ring-2 focus:ring-white"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2 text-zinc-400">
                            <input type="checkbox" />
                            Remember me
                        </label>

                        <button
                            type="button"
                            className="text-zinc-300 hover:text-white transition"
                        >
                            Forgot password?
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-white text-black font-semibold py-3 rounded-xl hover:bg-zinc-200 transition"
                    >
                        Sign In
                    </button>
                </form>

                <div className="relative my-6">
                    <div className="border-t border-zinc-800"></div>

                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-zinc-900 px-3 text-zinc-500 text-sm">
                        OR
                    </span>
                </div>

                <button
                    className="w-full border border-zinc-700 text-white py-3 rounded-xl hover:bg-zinc-800 transition"
                >
                    Continue with Google
                </button>

                <p className="text-center text-zinc-400 text-sm mt-6">
                    Don&apos;t have an account?
                    <span className="text-white hover:underline cursor-pointer ml-1">
                        Create account
                    </span>
                </p>
            </div>
        </div>
    );
}