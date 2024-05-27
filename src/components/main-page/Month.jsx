import styled from "styled-components";

const Month = ({ setMonths, selectedMonth, setSelectedMonth }) => {
  // 1월부터 12월까지의 월을 나타내는 문자열 배열입니다.
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
  const monthOnClick = (e) => {
    // 선택된 월을 가져옵니다.
    const choosedMonth = e.target.value;
    // 선택된 월을 상태로 설정합니다.
    setSelectedMonth(choosedMonth);
    // 선택된 월을 상태로 설정합니다.
    setMonths(choosedMonth);
  };

  return (
    <>
      <MonthContainer>
        {monthly.map((month, index) => (
          <MonthBtn
            key={index}
            value={month}
            onClick={monthOnClick}
            seleted={selectedMonth === month}
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
  background-image: linear-gradient(to left, #4287f5, #FFFFFF);  color: white;
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
