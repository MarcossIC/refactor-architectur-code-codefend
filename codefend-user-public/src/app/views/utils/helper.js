/** Gets token in localStorage */
export const getToken = () => window.localStorage.getItem("token") ?? "";

/** Set token in localStorage */
export const setToken = (token) => window.localStorage.setItem("token", token);

/** persist user data in localStorage */
export const persistUser = (userData = null) =>
    window.localStorage.setItem("user", JSON.stringify(userData));

/** persist user data in localStorage */
export const getUser = () => {
    const userData = window.localStorage.getItem("user");
    if (userData) return JSON.parse(userData);
    return userData;
};

/** set token and user data for Auth */
export const setAuth = (token, user) => {
    if (!(token && user)) return;
    setToken(token);
    persistUser(user);
};

/** clear token and user data for Auth */
export const clearAuth = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user");
};