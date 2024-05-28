import React, { createContext, useState, useEffect } from 'react';

export const AccountBookContext = createContext();

export const AccountBookProvider = ({ children }) => {
  const [accountBook, setAccountBook] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); 

  useEffect(() => {
    localStorage.setItem('accountBook', JSON.stringify(accountBook));
  }, [accountBook]);
  return (
    <AccountBookContext.Provider value={{ accountBook, setAccountBook, selectedMonth, setSelectedMonth }}>
      {children}
    </AccountBookContext.Provider>
  );
  // 이 컴포넌트는 전체 애플리케이션의 진입점 역할을 합니다.
  
};

export const useAccountBook = () => useContext(AccountBookContext);
