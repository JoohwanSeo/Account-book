import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";

const App = () => {
  // 이 함수 컴포넌트는 전체 애플리케이션의 진입점 역할을 합니다.

  const [accountBook, setAccountBook] = useState([]);
  // 이 부분은 회계 데이터를 관리하는 state를 초기화합니다. 초기값은 빈 배열입니다.

  useEffect(() => {
    const storedAccountBook = JSON.parse(localStorage.getItem("accountBook"));
    if (JSON.stringify(storedAccountBook) !== JSON.stringify(accountBook)) {
      localStorage.setItem("accountBook", JSON.stringify(accountBook));
    }
  }, [accountBook]);
  // 이 useEffect 훅은 accountBook 데이터가 변경될 때마다 localStorage에 저장합니다.
  // 의존성 배열에 accountBook이 포함되어 있어, accountBook이 변경될 때마다 effect 함수가 실행됩니다.
  // 먼저 localStorage에서 저장된 accountBook 데이터를 가져오고, 현재 accountBook 데이터와 비교하여 다르면 localStorage에 업데이트합니다.

  const [selectedMonth, setSelectedMonth] = useState(null);
  // 이 부분은 선택된 월을 관리하는 state를 초기화합니다. 초기값은 null입니다.

  return (
    <Routes>
      {/* React Router를 사용하여 두 개의 경로를 정의합니다. */}

      <Route
        path="/"
        element={
          <Home
            accountBook={accountBook}
            setAccountBook={setAccountBook}
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
          />
        }
      />
      {/* 루트 경로 '/'에 대해 Home 컴포넌트를 렌더링합니다.
          Home 컴포넌트에 accountBook, setAccountBook, selectedMonth, setSelectedMonth 를 props로 전달합니다. */}

      <Route
        path="/:id"
        element={
          <Detail accountBook={accountBook} setAccountBook={setAccountBook} />
        }
      />
      {/* 동적 경로 '/:id'에 대해 Detail 컴포넌트를 렌더링합니다.
          Detail 컴포넌트에 accountBook, setAccountBook를 props로 전달합니다. */}
    </Routes>
  );
};

export default App;
