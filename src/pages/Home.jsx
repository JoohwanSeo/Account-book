import { useAccountBook } from '../hooks/AccountContext'; // 수정된 부분
import Form from '../components/main-page/Form';
import Month from '../components/main-page/Month';
import MonthItem from '../components/main-page/MonthItem';

// AccountBookProvider는 가장 상위 컴포넌트에서 감싸주어야 합니다.
// 따라서 Home 컴포넌트에서 AccountBookProvider를 사용하면 안 되고,
// Home 컴포넌트를 사용하는 상위 컴포넌트에서 감싸주어야 합니다.

const Home = () => {
  const { setSelectedMonth, selectedMonth, getMonthData } = useAccountBook();

  return (
    <div>
      <section>
        <Form />
        <Month setSelectedMonth={setSelectedMonth} />
        <MonthItem months={selectedMonth} getMonthData={getMonthData} />
      </section>
    </div>
  );
};

export default Home;

