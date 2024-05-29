import { useContext, useState } from "react";
import Form from "../components/main-page/Form";
import Month from "../components/main-page/Month";
import MonthItem from "../components/main-page/MonthItem";
import { AccountContext } from "../context/AccountContext";

// AccountBookProvider는 가장 상위 컴포넌트에서 감싸주어야 합니다.
// 따라서 Home 컴포넌트에서 AccountBookProvider를 사용하면 안 되고,
// Home 컴포넌트를 사용하는 상위 컴포넌트에서 감싸주어야 합니다.

const Home = () => {
  const [months, setMonths] = useState("1");
  const { accountBook } = useContext(AccountContext);

  const filteredAccountBook = accountBook.filter(
    (account) => account.month === months
  );
  return (
    <div>
      <section>
        <Form month={months} />
        <Month month={months} setMonth={setMonths} />
        <MonthItem account={filteredAccountBook} />
      </section>
    </div>
  );
};

export default Home;
