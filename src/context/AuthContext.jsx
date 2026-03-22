import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

const getUsers = () => JSON.parse(localStorage.getItem("gk_users") || "[]");
const saveUsers = (u) => localStorage.setItem("gk_users", JSON.stringify(u));
const getSession = () => JSON.parse(localStorage.getItem("gk_session") || "null");
const saveSession = (u) => localStorage.setItem("gk_session", JSON.stringify(u));

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = getSession();
    if (session) setUser(session);
    setLoading(false);
  }, []);

  const signup = (name, email, password, examTarget) => {
    const users = getUsers();
    if (users.find((u) => u.email === email)) return { error: "Email already registered" };
    const newUser = {
      id: Date.now().toString(),
      name, email, password, examTarget,
      points: 0, streak: 1,
      joinedAt: new Date().toISOString(),
    };
    saveUsers([...users, newUser]);
    const sessionUser = { ...newUser };
    delete sessionUser.password;
    saveSession(sessionUser);
    setUser(sessionUser);
    return { success: true };
  };

  const login = (email, password) => {
    const users = getUsers();
    const found = users.find((u) => u.email === email && u.password === password);
    if (!found) return { error: "Invalid email or password" };
    const sessionUser = { ...found };
    delete sessionUser.password;
    saveSession(sessionUser);
    setUser(sessionUser);
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem("gk_session");
    setUser(null);
  };

  const updatePoints = (pts) => {
    if (!user) return;
    const updated = { ...user, points: (user.points || 0) + pts };
    saveSession(updated);
    setUser(updated);
    const users = getUsers();
    const idx = users.findIndex((u) => u.id === user.id);
    if (idx !== -1) { users[idx].points = updated.points; saveUsers(users); }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, logout, updatePoints }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
