import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function MonthItem({ accountBook }) {
  const navigate = useNavigate();
  
  return (
    <Section>
      <ItemWrapper>
        {accountBook.map((account) => (
          <AccountItem
            key={account.id}
            onClick={() => navigate(`/detail/${account.id}`)}
          >
            <ItemContainer>
              <span>{account.date}</span>
              <span>{account.item + " : " + account.content}</span>
              <span>{account.price}</span>
            </ItemContainer>
          </AccountItem>
        ))}
      </ItemWrapper>
    </Section>
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

const AccountItem = styled.section`
  text-decoration: none;
  color: inherit;
  transition: transform 0.3s ease;
`;

const Section = styled.section``

export default MonthItem;
