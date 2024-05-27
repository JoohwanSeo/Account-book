import { useEffect, useState } from "react";
import HomeForm from "../components/main-page/Form";
import HomeMonth from "../components/main-page/Month";
import HomeMonthItem from "../components/main-page/MonthItem";
import styled from "styled-components";

const Home = ({
  accountBook,
  setAccountBook,
  selectedMonth,
  setSelectedMonth,
}) => {
  // 이 함수 컴포넌트는 홈 페이지를 렌더링합니다.
  // 이 컴포넌트는 accountBook, setAccountBook, selectedMonth, setSelectedMonth props를 받습니다.
  const [months, setMonths] = useState("1월");
  // 이 부분은 현재 선택된 월을 나타내는 state를 초기화합니다. 초기값은 "1월"입니다.

  useEffect(() => {
    localStorage.setItem("accountBook", JSON.stringify(accountBook));
  }, [accountBook]);
  // 이 useEffect 훅은 accountBook 데이터가 변경될 때마다 localStorage에 저장합니다.
  // 의존성 배열에 accountBook이 포함되어 있어, accountBook이 변경될 때마다 effect 함수가 실행됩니다.

  const getMonthData = (data, month = 1) => {
    // 이 함수는 주어진 데이터에서 특정 월의 데이터를 필터링하여 반환합니다.
    // month 매개변수의 기본값은 1(1월)입니다.

    return data.filter((item) => {
      const enteredMonth = new Date(item.date).getMonth() + 1;
      return enteredMonth === month;
    });
  };
console.log(accountBook);

  return (
    <div>
      <section>
        <HomeForm setAccountBook={setAccountBook} />
        {/* HomeForm 컴포넌트를 렌더링하고, setAccountBook 함수를 props로 전달합니다. */}

        <HomeMonth
          setMonths={setMonths}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
        />
        {/* HomeMonth 컴포넌트를 렌더링하고, setMonths, selectedMonth, setSelectedMonth 함수를 props로 전달합니다. */}

        <HomeMonthItem
          accountBook={accountBook}
          months={months}
          getMonthData={getMonthData}
        />
        {/* HomeMonthItem 컴포넌트를 렌더링하고, accountBook, months, getMonthData 함수를 props로 전달합니다. */}
      </section>
    </div>
  );
};

export default Home;
