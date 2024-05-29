import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AccountContext } from "../../context/AccountContext";
import styled from "styled-components";

const DetailForm = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { accountBook, setAccountBook } = useContext(AccountContext);

  const findAccount = accountBook.find((item) => item.id === id);

  const [date, setDate] = useState(findAccount.date);
  const [item, setItem] = useState(findAccount.item);
  const [price, setPrice] = useState(findAccount.price);
  const [content, setContent] = useState(findAccount.content);

  const findAccountData = (id) => {
    const editFormData = /^\d{4}-\d{2}-\d{2}$/;
    if (!editFormData.test(date)) {
      return alert(" YYYY-MM-DD 형식으로 입력해 주세요");
    }
    if (!item || !price <= 0) {
      return alert("항목과 금액을 입력해 주세요");
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
    setAccount(newAccountBook);
    navigate("/");
  };

  const handleDelAccount = () => {
    const newAccount = account.filer((account) => account.id !== id);
    setAccountBook(newAccount);
  };

  // const updateAccountInput = accountBook.map((e) =>
  //   e.id === params.id ? { ...e, date, item, price, content } : e
  // );

  // setAccountBook(updateAccountInput);
  // localStorage.setItem("accountBook", JSON.stringify(updateAccountInput));
  // navigate("/");

  return (
    <DetailFormWrapper>
      <DetailInputContainer>
        <DetailInput>
          날짜{" "}
          <input
            type="date"
            name="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </DetailInput>

        <DetailInput>
          항목{" "}
          <input
            type="text"
            name="item"
            id="item"
            value={item}
            onChange={(e) => setItem(e.target.value)}
          />
        </DetailInput>

        <DetailInput>
          가격{" "}
          <input
            type="number"
            name="price"
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
          <DetailFixBtn onClick={findAccountData}>수정</DetailFixBtn>
          <DetailDelBtn type="button" onClick={handleDelAccount}>
            삭제
          </DetailDelBtn>
          <DetailBackBtn onClick={() => navigate(-1)}>
            홈으로
          </DetailBackBtn>
        </DetailBtnContainer>
      </DetailInputContainer>
    </DetailFormWrapper>
  );
};

const DetailFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;
const DetailInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 500px;
`;

const DetailInput = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 1rem;

  input {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1rem;
    width: 70%;
  }
`;
const DetailBtnContainer = styled.section`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 2rem;
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
  font-size: 1rem;
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

export default DetailForm;
