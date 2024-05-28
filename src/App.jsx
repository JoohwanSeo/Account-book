import React, { createContext, useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";

export const AccountBookContext = createContext();

export const AccountBookProvider = ({ children }) => {
  const [accountBook, setAccountBook] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // 초기값을 현재 월로 설정

  useEffect(() => {
    const storedAccountBook = JSON.parse(localStorage.getItem("accountBook"));
    if (storedAccountBook && JSON.stringify(storedAccountBook) !== JSON.stringify(accountBook)) {
      setAccountBook(storedAccountBook); 
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("accountBook", JSON.stringify(accountBook)); 
  }, [accountBook]);

  const getMonthData = (data, month = new Date().getMonth() + 1) => { // 숫자로 된 월 사용
    return data.filter((item) => {
      const enteredMonth = new Date(item.date).getMonth() + 1; // 숫자로 된 월 사용
      return enteredMonth === month;
    });
  };

  return (
    <AccountBookContext.Provider
      value={{ accountBook, setAccountBook, selectedMonth, setSelectedMonth, getMonthData }}
    >
      {children}
    </AccountBookContext.Provider>
  );
};

const App = () => {
  return (
    
      <AccountBookProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<Detail />} />
        </Routes>
      </AccountBookProvider>
    
  );
};

export default App;
