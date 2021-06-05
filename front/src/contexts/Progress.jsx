import React, { useState, createContext } from "react";

const ProgressContext = createContext({
  inProgress: false,
  spinner: () => {}
});

// 화면에 로딩 상황을 보여주기 위한 전역 객체 
const ProgressProvider = ({ children }) => {
  const [inProgress, setInProgress] = useState(false);
  const spinner = {
    start: () => setInProgress(true),
    stop: () => setInProgress(false)
  };
  const value = { inProgress, spinner };
  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};

export { ProgressContext, ProgressProvider };
