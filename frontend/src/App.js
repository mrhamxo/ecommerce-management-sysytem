import "./App.css";
import Header from "./component/layout/Header/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import webfont from "webfontloader";
import { useEffect } from "react";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home";
import ProductDetails from "./component/Product/productDetails";
import Products from "./component/Product/Products";
import Search from "./component/Product/Search";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    webfont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());
  }, []);
  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/search" element={<Search />} />
        <Route
          exact
          path="/account"
          element={<ProtectedRoute component={Profile} />}
        />
        <Route
          exact
          path="/me/update"
          element={<ProtectedRoute component={UpdateProfile} />}
        />
        <Route
          exact
          path="/password/update"
          element={<ProtectedRoute component={UpdatePassword} />}
        />
        <Route exact path="/password/forgot" element={<ForgotPassword />} />
        <Route exact path="/password/reset/:token" element={<ResetPassword />} />
        <Route exact path="/login" element={<LoginSignUp />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
