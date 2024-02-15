export async function ApiService(url, params = {}) {
    let accessToken = window.localStorage.getItem("ACCESS");
    const refreshToken = window.localStorage.getItem("REFRESH");
    if (accessToken) {
        params.headers = { ...params.headers, Authorization: `Bearer ${accessToken}` };
    }

    let response = await fetch(`http://127.0.0.1:8000/api/${url}`, params);

    if (response.status === 401 && refreshToken) {
        const refreshData = await fetch(`http://127.0.0.1:8000/api/token/refresh/`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                refresh: refreshToken,
            }),
        });
        
        if (refreshData.ok) {
          const { access } = await refreshData.json();
          accessToken = access;
          window.localStorage.setItem("ACCESS", access);
          params.headers.Authorization = `Bearer ${accessToken}`;
          response = await fetch(`http://127.0.0.1:8000/api/${url}`, params);
        } else {
          alert("Error refreshing access token, please login again");
          return;
        }
    }

    const data = await response.json();
    if (!response.ok) {
        throw new Error('HTTP error ' + response.status);
    }
    return data;
}