async function fetchWithRefresh(input: RequestInfo, init?: RequestInit): Promise<Response> {

    let res = await fetch(input, {
        ...init,
        credentials: "include",
    });

    if (res.status === 401) {
        const refreshRes = await fetch("http://localhost:3000/auth/refresh", {
            method: "POST",
            credentials: "include",
        });

        if (!refreshRes.ok) {
            window.location.href = "/";
            return res;
        }

        // Retry original request with new cookie
        res = await fetch(input, {
            ...init,
            credentials: "include",
        });
    }

    return res;
}

export default fetchWithRefresh;