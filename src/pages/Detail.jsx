import DetailForm from "../components/detail-page/DetailForm";

const Detail = ({ accountBook, setAccountBook }) => {
  return (
    <>
      <DetailForm accountBook={accountBook} setAccountBook={setAccountBook} />
    </>
  );
};

export default Detail;
