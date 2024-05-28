import React from "react";
import styled from "styled-components"; 
import { useAccountBook } from "../../hooks/AccountContext";
import  {UseFormInfo}  from "../../hooks/UseFormInfo"; 
import { v4 as uuidv4 } from "uuid";

const Form = () => {
  const { setAccountBook } = useAccountBook();
  const { inputs, dateRef, handleInputChange, handleInputReset } =
  UseFormInfo();

  const { date, item, price, content } = inputs;

  const onSubmit = (e) => {
    e.preventDefault();

    if (!date.trim() || !item.trim() || !price.trim() || !content.trim()) {
      alert("모두 입력 해주세요!");
      return;
    }

    if (date.trim().length !== 10 || !isValidDate(date)) {
      alert("YYYY-MM-DD 형식으로 입력해주세요!");
      return;
    }

    if (isNaN(parseFloat(price))) {
      alert("숫자를 입력해 주세요");
      return;
    }

    const newAccount = {
      id: uuidv4(),
      date,
      item,
      price,
      content,
    };

    setAccountBook((preAccount) => [...preAccount, newAccount]);
    handleInputReset();
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
          날짜{" "}
          <input
            type="date"
            name="date"
            value={date}
            ref={dateRef}
            onChange={handleInputChange}
          />
        </InputContainer>

        <InputContainer>
          항목{" "}
          <input
            type="text"
            name="item"
            value={item}
            onChange={handleInputChange}
          />
        </InputContainer>

        <InputContainer>
          금액{" "}
          <input
            type="number"
            name="price"
            value={price}
            onChange={handleInputChange}
          />
        </InputContainer>

        <InputContainer>
          내용{" "}
          <input
            type="text"
            name="content"
            value={content}
            onChange={handleInputChange}
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
