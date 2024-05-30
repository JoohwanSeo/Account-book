import { useNavigate, useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { AccountContext } from "../context/AccountContext";
import styled from "styled-components";

const Detail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {accountBook, setAccountBook} = useContext(AccountContext);
  console.log(accountBook)
  console.log(id)
  const selectedAccount = accountBook.find((el) => el.id === id);
console.log(selectedAccount)
  const [date, setDate] = useState(selectedAccount.date);
  const [item, setItem] = useState(selectedAccount.item);
  const [price, setPrice] = useState(selectedAccount.price);
  const [content, setContent] = useState(selectedAccount.content);

  const editAccount = () => {
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!datePattern.test(date)) {
      alert("YYYY-MM-DD 형식으로 입력해 주세요.");
      return
    }

    const newAccountBook = accountBook.map((account) => {
      if (account.id !== id) {
        return account;
      } else {
        return {
          ...account,
          date,
          item,
          price,
          content,
        };
      }
    });
    setAccountBook(newAccountBook);
    navigate("/");
  };

  const accountDelete = () => {
    const newAccountBook = accountBook.filter((account) => account.id !== id);
    setAccountBook(newAccountBook);
    navigate("/");
    console.log(newAccountBook)
  };

  return (
    <>
      <DetailFormWrapper>
        <DetailInputContainer>
          <DetailInput>
            날짜{" "}
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </DetailInput>

          <DetailInput>
            항목{" "}
            <input
              type="text"
              id="item"
              value={item}
              onChange={(e) => setItem(e.target.value)}
            />
          </DetailInput>

          <DetailInput>
            가격{" "}
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </DetailInput>

          <DetailInput>
            내용{" "}
            <input
              type="text"
              name="content"
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </DetailInput>

          <DetailBtnContainer>
            <DetailFixBtn onClick={editAccount}>수정</DetailFixBtn>
            <DetailDelBtn type="button" onClick={accountDelete}>
              삭제
            </DetailDelBtn>
            <DetailBackBtn onClick={() => navigate(-1)}>홈으로</DetailBackBtn>
          </DetailBtnContainer>
        </DetailInputContainer>
      </DetailFormWrapper>
    </>
  );
};

const DetailFormWrapper = styled.section`
width: 50%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 10px 10px 10px 10px;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
  background-color: #3867d6;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  min-width: 100px;
`;
const DetailInputContainer = styled.div`
  background-color: #dfe4ea;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  border-radius: 15px;
  min-width: 100px;
`;

const DetailInput = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 1rem;
  padding-top: 10px;
  padding-left: 10px;
  input {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 10px;
    font-size: 15px;
    width: 80%;
    margin-right: 20px;
  }
`;
const DetailBtnContainer = styled.section`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 2rem;
  padding: 0 10px 10px 10px;
  min-width: 100px;
`;

const DetailFixBtn = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ffd700;
  }
`;

const DetailDelBtn = styled.button`
  background-color: #f44336;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  font-size: 15px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #8b0000;
  }
`;

const DetailBackBtn = styled.button`
  background-color: #008cba;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #b87333;
  }
`;

export default Detail;
