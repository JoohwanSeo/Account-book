import { v4 as uuidv4 } from "uuid";
import UseFormInfo from "../../hooks/UseFormInfo";
import styled from "styled-components";

const Form = ({ setAccountBook }) => {
  // UseFormInfo 훅으로부터 inputs, dateRef, handleInputChange, handleInputReset을 가져옵니다.
  const { inputs, dateRef, handleInputChange, handleInputReset } =
    UseFormInfo();

  // inputs 객체에서 date, item, price, content를 구조분해할당하여 사용합니다.
  const { date, item, price, content } = inputs;

  // 폼 제출 시 실행되는 함수입니다.
  const onSubmit = (e) => {
    e.preventDefault(); // 기본 폼 제출 동작을 막습니다.

    // 입력값이 비어있는지 확인하고, 비어있다면 알림을 띄웁니다.
    if (!date.trim() || !item.trim() || !price.trim() || !content.trim()) {
      alert("모두 입력 해주세요!");
      return;
    }

    // 날짜 형식 검증
    if (date.trim().length !== 10 || !isValidDate(date)) {
      alert("YYYY-MM-DD 형식으로 입력해주세요!");
      return;
    }

    // 가격 입력 검증
    if (isNaN(parseFloat(price))) {
      alert("숫자를 입력해 주세요");
      return;
    }

    // 새로운 가계부 정보를 담은 객체입니다. id는 uuidv4() 함수를 사용하여 생성됩니다.
    const newAccount = {
      id: uuidv4(),
      date,
      item,
      price,
      content,
    };
    // setAccountBook 함수를 사용하여 기존의 가계부 정보에 새로운 정보를 추가합니다.
    // 이때 콜백 함수를 사용하여 이전 상태(preAccountBook)를 기반으로 새로운 상태를 생성합니다.
    setAccountBook((preAccount) => [...preAccount, newAccount]);
    // 입력값을 초기화하는 함수를 호출합니다.
    handleInputReset();
  };

  // 날짜 형식 검증 함수
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
  width: 90%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-left: 40px;
  background-color: #dfe4ea;
  border-radius: 15px;
  top: 50%;
  
`;

const InputContainer = styled.section`
  flex-direction: column;
  align-items: center;
  color: black;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen;
  width: 200px;
  display: flex;

  input {
    /* margin: 5px; */
    /* padding: 0.2rem; */
    border: 2px solid #ccc;
    border-radius: 7px;
    font-size: 13px;
    width: 140px;
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
  margin: 25px 25px 25px 25px;
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
