import { useEffect, useState } from "react";
import "./App.css";
import Header from "./component/layout/Header/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import webfont from "webfontloader";
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
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import Payment from "./component/Cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import OrderSuccess from "./component/Cart/OrderSuccess";
import MyOrders from "./component/Order/MyOrders";
import OrderDetails from "./component/Order/OrderDetails";
import Dashboard from "./component/Admin/Dashboard";
import ProductList from "./component/Admin/ProductList";
import NewProduct from "./component/Admin/NewProduct";
import UpdateProduct from "./component/Admin/UpdateProduct";
import OrderList from "./component/Admin/OrderList";
import ProcessOrder from "./component/Admin/ProcessOrder";
import UserList from "./component/Admin/UserList";
import UpdateUser from "./component/Admin/UpdateUser";
import ProductReviews from "./component/Admin/ProductReviews";
import About from "./component/layout/About/About";
import Contact from "./component/layout/Contact/Contact";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    webfont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());

    getStripeApiKey();
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
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
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
        <Route
          exact
          path="/password/reset/:token"
          element={<ResetPassword />}
        />
        <Route exact path="/login" element={<LoginSignUp />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route
          exact
          path="/login/shipping"
          element={<ProtectedRoute component={Shipping} />}
        />
        {stripeApiKey && (
          <Route
            exact
            path="/process/payment"
            element={
              <Elements stripe={loadStripe(stripeApiKey)}>
                <ProtectedRoute component={Payment} />
              </Elements>
            }
          />
        )}
        <Route
          exact
          path="/success"
          element={<ProtectedRoute component={OrderSuccess} />}
        />
        <Route
          exact
          path="/orders"
          element={<ProtectedRoute component={MyOrders} />}
        />
        <Route
          exact
          path="/order/confirm"
          element={<ProtectedRoute component={ConfirmOrder} />}
        />
        <Route
          exact
          path="/order/:id"
          element={<ProtectedRoute component={OrderDetails} />}
        />
        <Route
          exact
          path="admin/dashboard"
          element={<ProtectedRoute isAdmin={true} component={Dashboard} />}
        />
        <Route
          exact
          path="admin/products"
          element={<ProtectedRoute isAdmin={true} component={ProductList} />}
        />
        <Route
          exact
          path="admin/product"
          element={<ProtectedRoute isAdmin={true} component={NewProduct} />}
        />
        <Route
          exact
          path="admin/product/:id"
          element={<ProtectedRoute isAdmin={true} component={UpdateProduct} />}
        />
        <Route
          exact
          path="admin/orders"
          element={<ProtectedRoute isAdmin={true} component={OrderList} />}
        />
        <Route
          exact
          path="admin/order/:id"
          element={<ProtectedRoute isAdmin={true} component={ProcessOrder} />}
        />
        <Route
          exact
          path="admin/users"
          element={<ProtectedRoute isAdmin={true} component={UserList} />}
        />
        <Route
          exact
          path="admin/user/:id"
          element={<ProtectedRoute isAdmin={true} component={UpdateUser} />}
        />
        <Route
          exact
          path="admin/reviews"
          element={<ProtectedRoute isAdmin={true} component={ProductReviews} />}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
