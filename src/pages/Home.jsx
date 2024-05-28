import React, { createContext, useContext, useEffect, useState } from "react";
import { AccountBookContext } from "../App";
import Form from "../components/main-page/Form";
import Month from "../components/main-page/Month";
import MonthItem from "../components/main-page/MonthItem";

export const AccountBookProvider = ({ children }) => {
  const [accountBook, setAccountBook] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // 현재 월로 초기화

  const getMonthData = (data, month = new Date().getMonth() + 1) => {
    // 숫자로 된 월 사용
    return data.filter((item) => {
      const enteredMonth = new Date(item.date).getMonth() + 1; // 숫자로 된 월 사용
      return enteredMonth === month;
    });
  };

  useEffect(() => {
    const loadAccountBook = async () => {
      try {
        const storedAccountBook = await JSON.parse(localStorage.getItem("accountBook"));
        if (storedAccountBook) {
          setAccountBook(storedAccountBook);
        }
      } catch (error) {
        console.error("Error loading account book from localStorage:", error);
      }
    };
    loadAccountBook();
  }, []);

  useEffect(() => {
    const changedData =
      JSON.stringify(accountBook) !== localStorage.getItem("accountBook");
    if (changedData) {
      localStorage.setItem("accountBook", JSON.stringify(accountBook));
    }
  }, [accountBook]);

  return (
    <AccountBookContext.Provider
      value={{
        accountBook,
        setAccountBook,
        selectedMonth,
        setSelectedMonth,
        getMonthData,
      }}
    >
      {children}
    </AccountBookContext.Provider>
  );
};

const Home = () => {
  const { setSelectedMonth, selectedMonth, getMonthData } =
    useContext(AccountBookContext);
  return (
    <div>
      <section>
        <Form />
        <Month setSelectedMonth={setSelectedMonth} />
        <MonthItem months={selectedMonth} getMonthData={getMonthData} />
      </section>
    </div>
  );
};

export default Home;
