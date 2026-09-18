import { createContext, useState } from "react";

export const AppContext = createContext();

export default function AppContextProvider({ children }) {
  const [isLoggedIn, setIsloggedIn] = useState(true);
  const [user, setUser] = useState(null);

  const [tasks, setTasks] = useState(null);

  const [appLoading, setAppLoading] = useState(false);

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        setIsloggedIn,
        appLoading,
        setAppLoading,
        tasks,
        setTasks,
        user
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
