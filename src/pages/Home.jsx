import { useContext, useState } from "react";
import Form from "../components/main-page/Form";
import Month from "../components/main-page/Month";
import MonthItem from "../components/main-page/MonthItem";
import { AccountContext } from "../context/AccountContext"

const Home = () => {
  const [month, setMonth] = useState(1);
  const { accountBook } = useContext(AccountContext);

  const filteredAccountBook = accountBook.filter(
    (account) => account.month === month
  );
  return (
    <div>
      <section>
        <Form month={month} />
        <Month month={month} setMonth={setMonth} />
        <MonthItem accountBook={filteredAccountBook} />
      </section>
    </div>
  );
};

export default Home;
