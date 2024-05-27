import UseFormInfo from "../../hooks/UseFormInfo";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

const DetailForm = ({ accountBook, setAccountBook }) => {
  // UseFormInfo 훅으로부터 inputs, dateRef, handleInputChange, setInputs를 가져옵니다.
  const { inputs, dateRef, handleInputChange, setInputs } = UseFormInfo();
  // useParams 훅을 사용하여 현재 URL의 파라미터 정보를 가져옵니다.
  const params = useParams();
  // useNavigate 훅을 사용하여 페이지 이동 기능을 사용합니다.
  const navigate = useNavigate();

  // 컴포넌트가 마운트될 때 handleDisplayInput 함수를 실행합니다.
  useEffect(() => {
    handleDisplayInput();
  }, [params]);

  // inputs 객체에서 date, item, price, content를 구조분해할당하여 사용합니다.
  const { date, item, price, content } = inputs;

  // 현재 URL의 파라미터 정보를 사용하여 accountBook 배열에서 해당 항목을 찾는 함수입니다.
  const findAccountData = (id) => {
    // 보안 취약점 개선: 사용자 입력값에 대한 보안적인 처리 추가
    if (typeof id !== "number" && typeof id !== "string") {
      throw new Error("올바른 ID 형식이 아닙니다.");
    }

    const findAccount = accountBook.find((item) => item.id === id);
    if (!findAccount) {
      throw new Error("해당 ID에 대한 가계부를 찾을 수 없습니다.");
    }

    return findAccount;
  };

  // 찾은 가계부 항목의 정보를 inputs 상태에 설정하는 함수입니다.
  const handleDisplayInput = () => {
    try {
      const findAccount = findAccountData(params.id);
      setInputs({
        date: findAccount.date,
        item: findAccount.item,
        price: findAccount.price,
        content: findAccount.content,
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  // 가계부 항목을 수정하는 함수입니다.
  const handleUpdateItem = (e) => {
    e.preventDefault();
    if (!date || !item || !price || !content) {
      alert("모두 입력해주세요!");
      return;
    }
    // accountBook 배열을 map 함수로 순회하며, 현재 URL의 파라미터와 일치하는 항목을 수정합니다.
    const updateAccountInput = accountBook.map((e) =>
      e.id === params.id ? { ...e, date, item, price, content } : e
    );

    // 수정된 accountBook 배열을 상태에 반영하고, localStorage에 저장합니다.
    setAccountBook(updateAccountInput);
    localStorage.setItem("accountBook", JSON.stringify(updateAccountInput));
    // 메인 페이지로 이동합니다.
    navigate("/");
  };
  // 가계부 항목을 삭제하는 함수입니다.
  const handleDelAccount = () => {
    const deletedItem = confirm("정말 삭제하겠습니까?");
    if (!deletedItem) return;
    // accountBook 배열에서 현재 URL의 파라미터와 일치하는 항목을 제외한 나머지 항목들로 구성된 새로운 배열을 생성합니다.
    const updateItem = accountBook.filter(
      (item) => item.id !== params.id
    );
    setAccountBook(updateItem);
    localStorage.setItem("accountBook", JSON.stringify(updateItem));
    // 메인 페이지로 이동합니다.
    navigate("/");
  };

  // 메인 페이지로 이동하는 함수입니다.
  const goBackHome = () => {
    navigate("/");
  };

  return (
    <DetailFormWrapper onSubmit={handleUpdateItem}>
      <DetailInputContainer>
        <DetailInput>
          날짜{" "}
          <input
            type="date"
            name="date"
            id="date"
            value={date}
            ref={dateRef}
            onChange={handleInputChange}
          />
        </DetailInput>

        <DetailInput>
          항목{" "}
          <input
            type="text"
            name="item"
            id="item"
            value={item}
            onChange={handleInputChange}
          />
        </DetailInput>

        <DetailInput>
          가격{" "}
          <input
            type="number"
            name="price"
            id="price"
            value={price}
            onChange={handleInputChange}
          />
        </DetailInput>

        <DetailInput>
          내용{" "}
          <input
            type="text"
            name="content"
            id="content"
            value={content}
            onChange={handleInputChange}
          />
        </DetailInput>

        <DetailBtnContainer>
          <DetailFixBtn type="submit">수정</DetailFixBtn>
          <DetailDelBtn type="button" onClick={handleDelAccount}>
            삭제
          </DetailDelBtn>
          <DetailBackBtn type="button" onClick={goBackHome}>
            홈으로
          </DetailBackBtn>
        </DetailBtnContainer>
      </DetailInputContainer>
    </DetailFormWrapper>
  );
};

const DetailFormWrapper = styled.form`
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
    background-color: #FFD700;
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
    background-color: #8B0000;
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
    background-color: #B87333;
  }
`;

export default DetailForm;
