import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import fetchWithRefresh from "../../services/api";
type Props = {
    children: React.ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
    const [status, setStatus] = useState<"loading" | "auth" | "unauth">("loading");

    useEffect(() => {
        fetchWithRefresh("http://localhost:3000/auth/me", {
            method: "POST",
        })
            .then((res) => {
                setStatus(res.ok ? "auth" : "unauth");
            })
            .catch(() => setStatus("unauth"));
    }, []);

    if (status === "loading") return null;

    if (status === "unauth") return <Navigate to="/" replace />;

    return children;
}