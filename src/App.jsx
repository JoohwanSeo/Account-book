import React, { createContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../src/pages/Home'; // Home 컴포넌트 경로
import Detail from '../src/pages/Detail'; // Detail 컴포넌트 경로

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

  const getMonthData = (data, month = new Date().getMonth() + 1) => {
    return data.filter((item) => {
      const enteredMonth = new Date(item.date).getMonth() + 1;
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
    <Router>
      <AccountBookProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<Detail />} />
        </Routes>
      </AccountBookProvider>
    </Router>
  );
};

export default App;
