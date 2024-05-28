import styled from "styled-components";
import React, { createContext, useState, useContext } from "react";

// MonthContext 생성
export const MonthContext = createContext();

// MonthProvider 컴포넌트 생성
export const Month = ({ children }) => {
  const [selectedMonth, setSelectedMonth] = useState(null);

  // 월을 선택했을 때 실행되는 함수
  const monthOnClick = (month) => {
    setSelectedMonth(month);
  };

  return (
    <MonthContext.Provider value={{ selectedMonth, monthOnClick }}>
      {children}
    </MonthContext.Provider>
  );
};

const ContextMonth = ({ setMonths }) => {
  const { selectedMonth, monthOnClick } = useContext(ContextMonth);

  const monthly = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];

  // 월을 선택했을 때 실행되는 함수입니다.
  const handleMonthClick = (month) => {
    // 선택된 월을 상태로 설정합니다.
    monthOnClick(month);
    // 선택된 월을 상태로 설정합니다.
    setMonths(month);
  };

  return (
    <>
      <MonthContainer>
        {monthly.map((month, index) => (
          <MonthBtn
            key={index}
            onClick={() => handleMonthClick(month)}
            selected={selectedMonth === month}
          >
            {month}
          </MonthBtn>
        ))}
      </MonthContainer>
    </>
  );
};

const MonthContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
`;

const MonthBtn = styled.button`
  margin: 15px;
  font-size: 24px;
  width: 150px;
  padding: 15px;
  height: 70px;
  border: none;
  border-radius: 25px;
  background-image: linear-gradient(to left, #4287f5, #ffffff);
  color: white;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    cursor: pointer;
    background-image: linear-gradient(to right, #ff4b4b, #ff9100);
    transform: translateY(-5px);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
    animation: pulse 1s infinite;
  }

  @keyframes glow {
    0% {
      box-shadow: 0 0 7px rgba(255, 255, 255, 0.8);
    }
    50% {
      box-shadow: 0 0 25px rgba(255, 255, 255, 0.8);
    }
    100% {
      box-shadow: 0 0 7px rgba(255, 255, 255, 0.8);
    }
  }

  .MonthBtn:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 25px;
    background: linear-gradient(45deg, #ff6b6b, #ffa500, #ff6b6b);
    background-size: 200% 200%;
    animation: glow 5s ease infinite;
    opacity: 0.6;
    z-index: -1;
  }
`;

export default Month;
