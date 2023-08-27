import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import HomePage from "./components/HomePage/HomePage";
import LoginPage from "./components/LoginPage/LoginPage";
import SearchPage from "./components/SearchPage/SearchPage";
import ResultPage from "./components/ResultPage/ResultPage";
import Footer from "./components/Footer/Footer";
import NotFound from "./components/NotFound/NotFound";

import { checkExpire } from "./storage/actions/userActions";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  const accessToken = useSelector(
    (state) => state.userReducer.account.accessToken
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkExpire());
  }, [checkExpire]);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        {accessToken && <Route path="/search" element={<SearchPage />} />}
        {accessToken && <Route path="/result" element={<ResultPage />} />}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
