import { useContext, useState } from "react";
import { AccountContext } from "../../context/AccountContext";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";

const Form = ({ month }) => {
  const { accountBook, setAccountBook } = useContext(AccountContext);
  const [newDate, setNewDate] = useState(
    `2024-${String().padStart(2)} ${String().padStart(0)}`
  );

  const [newItem, setNewItem] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newContent, setNewContent] = useState("");

  
  const onSubmit = (e) => {
    e.preventDefault();

    if (!newDate.trim() || !newItem.trim() || !newPrice.trim() || !newContent.trim()) {
      alert("모두 입력 해주세요!");
      return;
    }

    if (newDate.trim().length !== 10 || !isValidDate(newDate)) {
      alert("YYYY-MM-DD 형식으로 입력해주세요!");
      return;
    }

    if (isNaN(parseFloat(newPrice))) {
      alert("숫자를 입력해 주세요");
      return;
    }

    const newAccount = {
      id: uuidv4(),
      month: parseInt(newDate.split('-')[1], 10),
      date: newDate,
      item: newItem,
      price: newPrice,
      content: newContent,
    };

    setAccountBook([...accountBook, newAccount]);
    setNewDate(`2024-${String(month).padStart(2, "0")}`);
    setNewItem("");
    setNewPrice("");
    setNewContent("");
  };

  const isValidDate = (dateString) => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(dateString)) {
      return false;
    }
    const [year, month, day] = dateString.split("-");
    const date = new Date(year, month - 1, day);
    return (
      date.getFullYear() === parseInt(year) &&
      date.getMonth() === parseInt(month) - 1 &&
      date.getDate() === parseInt(day)
    );
  };

  return (
    <>
      <AccountForm onSubmit={onSubmit}>
        <InputContainer>
        <label htmlFor="date">날짜</label>
         <input 
         type="text"
          name="date"
           value={newDate}
           onChange={(el) => setNewDate(el.target.value) } 
            />
        </InputContainer>

        <InputContainer>
        <label htmlFor="item">항목</label>
          <input 
          type="text"
           name="item"
            value={newItem}
            onChange={(el) => setNewItem(el.target.value)}
              />
        </InputContainer>

        <InputContainer>
        <label htmlFor="price">금액</label>
          <input 
          type="number" 
          name="price"
           value={newPrice}
           onChange={(el) => setNewPrice(el.target.value)}
             />
        </InputContainer>

        <InputContainer>
        <label htmlFor="content">내용</label>
          <input
           type="text"
            name="content"
             value={newContent}
             onChange={(el) => setNewContent(el.target.value)}
             />
        </InputContainer>
        <AccountSaveBtn type="submit">저장</AccountSaveBtn>
      </AccountForm>
    </>
  );
};

const AccountForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

const InputContainer = styled.section`
  align-items: center;
  color: #4b7bec;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen;
  input {
    margin: 10px;
    padding: 0.3rem;
    border: 2px solid #ccc;
    border-radius: 4px;
    font-size: 15px;
    width: 150px;
    transition: border-color 0.3s ease;
    &:focus {
      outline: none;
      border-color: #000080;
      box-shadow: 0 0 8px rgba(108, 99, 255, 0.5);
    }
  }
`;

const AccountSaveBtn = styled.button`
  background-color: #000080;
  color: #fff;
  border: none;
  margin: 25px 0 25px 25px;
  padding: 4.5px;
  width: 50px;
  font-size: 15px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #5a52d9;
  }
`;

export default Form;
