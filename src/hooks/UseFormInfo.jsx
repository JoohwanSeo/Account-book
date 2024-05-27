import { useState, useRef, useEffect } from "react";

const UseFormInfo = () => {
  // useState 훅을 사용하여 폼 입력 데이터를 저장하는 상태 변수 'inputs'와 이를 업데이트하는 함수 'setInputs'를 초기화합니다.
  const [inputs, setInputs] = useState({
    date: "",
    item: "",
    price: "",
    content: "",
  });

  // useRef 훅을 사용하여 DOM 요소에 대한 참조 'dateRef'를 생성합니다.
  const dateRef = useRef("");

  // useEffect 훅을 사용하여 컴포넌트가 마운트될 때 실행되는 함수를 정의합니다.
  // 이 함수는 'dateRef'가 참조하는 DOM 요소에 포커스를 줍니다.
  
  useEffect(() => {  
  if(dateRef.current) {
    dateRef.current.focus()
  };
  }, []);

  // input 요소의 값이 변경될 때 실행되는 함수입니다.
  // 변경된 값을 'inputs' 상태에 업데이트합니다.
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  // 폼 입력 데이터를 초기화하는 함수입니다.
  // 'inputs' 상태를 초기값으로 설정합니다.
  const handleInputReset = () => {
    setInputs({
      date: "",
      item: "",
      price: "",
      content: "",
    });
  };

  // 'inputs', 'dateRef', 'handleInputChange', 'handleInputReset', 'setInputs' 객체를 반환합니다.
  // 이를 통해 다른 컴포넌트에서 해당 상태와 함수들을 사용할 수 있습니다.
  return { inputs, dateRef, handleInputChange, handleInputReset, setInputs };
};

export default UseFormInfo;
