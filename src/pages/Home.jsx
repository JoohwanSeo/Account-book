import styled from "styled-components";
import { useState, useContext } from "react";
import Month from "../components/main-page/Month"
import MonthItem from "../components/main-page/MonthItem";
import { useSelector } from "react-redux";
import { Form } from "react-router-dom";

const Container = styled.main`
  max-width: 800px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 0 auto;
`;



export default function Home() {
  const [month, setMonth] = useState(1);
  const expenses = useSelector((state) => state.expenses);

  const filteredExpenses = expenses.filter(
    (expense) => expense.month === month
  );

  return (
    <Container>
      <Month month={month} setMonth={setMonth} />
      <Form month={month} />
      <MonthItem expenses={filteredExpenses} />
    </Container>
  );
}