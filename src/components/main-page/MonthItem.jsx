import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function MonthItem({ accountBook }) {
  const navigate = useNavigate();
console.log(accountBook)
  return (
    <>
      <ItemWrapper>
        {accountBook.map((el) => (
          <ItemMonthInfo
            key={el.id}
            onClick={() => {
              navigate(`/detail/${el.id}`);
            }}
          >
            <ItemContainer>
              <span>{el.date}</span>
              <span>{`${el.item} : ${el.content}`}</span>
              <span>{el.price}</span>
            </ItemContainer>
          </ItemMonthInfo>
        ))}
      </ItemWrapper>
    </>
  );
}

const ItemWrapper = styled.section`
  text-decoration: none;
  color: inherit;
  transition: transform 0.3s ease;

  &hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
  }
`;

const ItemContainer = styled.section`
  background-image: linear-gradient(to right, #000080, #40e0d0);
  border-radius: 25px;
  padding: 20px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  font-weight: bold;
  cursor: pointer;

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
