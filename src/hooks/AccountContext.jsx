import React, { createContext, useState} from 'react';

export const AccountBookContext = createContext();

export const AccountBookProvider = ({ children }) => {
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const savedMonth = localStorage.getItem('month');
    return savedMonth? Number(savedMonth) : new Date().getMonth() + 1;
  })
  const [accountBook, setAccountBook] = useState([]);


  return (
    <AccountBookContext.Provider value={
      { accountBook, setAccountBook, selectedMonth, setSelectedMonth }
      }>
      {children}
    </AccountBookContext.Provider>
  );
  // 이 컴포넌트는 전체 애플리케이션의 진입점 역할을 합니다.
  
};

export default  AccountBookProvider
