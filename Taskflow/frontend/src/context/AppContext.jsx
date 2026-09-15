import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext("");

export default function AppContextProvider({ children }) {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [appLoading, setAppLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/auth/isAuth`, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setIsLoggedIn(true);
    } catch (error) {
      setIsLoggedIn(false);
    }
  };

  const getTasks = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/task/getTasks`, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setTasks(data.tasks);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getUserData = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/auth/getUserDetails`, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setUserData(data.user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const loadInitialData = async () => {
    await Promise.all([checkAuth(), getTasks(), getUserData()]);
    setAppLoading(false);
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        userData,
        setUserData,
        tasks,
        setTasks,
        appLoading,
        setAppLoading,
        getTasks,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
