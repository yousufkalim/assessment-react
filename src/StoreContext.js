// Init
import React, { useContext, useState, useEffect, createContext } from "react";

// Initializing Create Context Hook
const storeContext = createContext();
const storeUpdateContext = createContext();
const onlineStatusContext = createContext(true);

// We are also initializing useContexts here then we only call these functions where we need that data
export function Store() {
  return useContext(storeContext);
}

export function OnlineStatus() {
  return useContext(onlineStatusContext);
}

export function UpdateStore() {
  return useContext(storeUpdateContext);
}

// Initializing Store Provider
export function StoreProvider({ children }) {
  // Initializing State
  let [isConnected, setConnected] = useState(navigator.onLine);
  let [store, setStore] = useState({
    authorization: null,
    token: null,
    login: null,
    Users: null,
    singleUserResults: null,
    singleUserResult: null,
    results: null,
    user: {},
    answerIds: [],
    questions: [],
    answers: [],
    allanswer: [],
    institutes: [],
    history: [],
    disc_ans_id: [],
    result: {},
  });

  useEffect(() => {
    window.addEventListener("offline", () => {
      setConnected(false);
    });
    window.addEventListener("online", () => {
      setConnected(true);
    });

    return () => {
      window.removeEventListener("offline", () => {
        setConnected(false);
      });
      window.removeEventListener("online", () => {
        setConnected(true);
      });
    };
  }, []);

  const updateStore = (data) => {
    setStore((prev) => {
      return {
        ...prev,
        ...data,
      };
    });
  };

  // Render
  return (
    <storeContext.Provider value={store}>
      <storeUpdateContext.Provider value={updateStore}>
        <onlineStatusContext.Provider value={isConnected}>
          {children}
        </onlineStatusContext.Provider>
      </storeUpdateContext.Provider>
    </storeContext.Provider>
  );
}
