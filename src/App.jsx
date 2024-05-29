import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "./GlobalStyle"
import  AccountBookProvider  from "./hooks/AccountContext";
import Home from "../src/pages/Home";
import Detail from "../src/pages/Detail";


 

const App = () => {
  return (
    <>
       <GlobalStyle />
      <AccountBookProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:id" element={<Detail />} />
          </Routes>
        </BrowserRouter>
      </AccountBookProvider>
    </>
  );
};

export default App;
