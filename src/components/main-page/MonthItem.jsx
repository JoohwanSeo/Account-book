import { Fragment } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function MonthItem({ accountBook, months, getMonthData }) {
  // 이 함수는 월별 회계 데이터를 표시하는 컴포넌트입니다.
  // 이 컴포넌트는 accountBook, months, getMonthData props를 받습니다.

  const getSortedMonthData = (data) => {
    // 이 함수는 주어진 데이터를 날짜 순으로 정렬합니다.
    return data.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  };

  const filteredData = getMonthData(accountBook, ~~months[0]);
  // 이 부분은 months 배열의 첫 번째 요소를 사용하여 accountBook에서 해당 월의 데이터를 필터링합니다.
  // ~~months[0]은 소수점 이하를 제거하고 정수로 변환하는 역할을 합니다.
  const sortedData = getSortedMonthData(filteredData);
  // 필터링된 데이터를 날짜 순으로 정렬합니다.

  return (
    <Fragment>
      {sortedData.length !== 0 && (
        <ItemWrapper>
          {sortedData.map((el) => (
            // 정렬된 데이터를 반복하면서 각 항목을 렌더링합니다.
            <Link
              to={`/${el.id}`}
              key={el.id}
              style={{ textDecoration: "none" }}
            >
              {/* Link 컴포넌트를 사용하여 각 항목에 대한 링크를 생성합니다.
                key prop은 각 항목을 고유하게 식별하는 데 사용됩니다. */}
              <ItemContainer key={el.id}>
                <span>{el.date}</span>
                <span>{el.item + " : " + el.content}</span>
                <span>{el.price}</span>
              </ItemContainer>
            </Link>
          ))}
        </ItemWrapper>
      )}
    </Fragment>
  );
}

const ItemWrapper = styled.section`
  text-decoration: none;
  color: inherit;
  transition: transform 0.3s ease;
  margin: 20px;
`;

const ItemContainer = styled.section`
  background-image: linear-gradient(to right, #000080, #40e0d0);
  border-radius: 25px;
  padding: 10px;
  margin: 20px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    cursor: pointer;
    background-image: linear-gradient(to right, #ff4b4b, #ff9100);
    transform: translateY(-5px);
    animation: pulse 1s infinite;
  }

  & span:last-child {
    font-weight: normal;
    color: rgb(136, 44, 44);
    flex-shrink: 0;
    font-size: 16px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  }

  .ItemContainer:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 25px;
    background: linear-gradient(45deg, #40e0d0, #9370db, #ff6b6b);
    background-size: 200% 200%;
    animation: glow 5s ease infinite;
    opacity: 0.6;
    z-index: -1;

    @keyframes glow {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }
  }
`;

export default MonthItem;
