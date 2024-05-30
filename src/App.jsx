import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "./GlobalStyle"
import Home from "./pages/Home"
import Detail from "./pages/Detail"
import AccountBookProvider from "./context/AccountContext"; 

const App = () => {
  return (
    <>
       <GlobalStyle />
      <AccountBookProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detail/:id" element={<Detail />} />
          </Routes>
        </BrowserRouter>
      </AccountBookProvider>
    </>
  );
};

export default App;
