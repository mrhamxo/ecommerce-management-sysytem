import React from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../../images/logo.png";
import { FaUserAlt, FaSearch } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";

const options = {
  burgerColorHover: "Teal",
  logo,
  logoWidth: "20vmax",
  navColor1: "white",
  logoHoverSize: "10px",
  logoHoverColor: "#00bec9",
  link1Text: "Home",
  link2Text: "Products",
  link3Text: "Contact",
  link4Text: "About",
  link1Url: "/",
  link2Url: "/products",
  link3Url: "/contact",
  link4Url: "/about",
  link1Size: "2vmax",
  link1Color: "Teal",
  nav1justifyContent: "flex-end",
  nav2justifyContent: "flex-end",
  nav3justifyContent: "flex-start",
  nav4justifyContent: "flex-start",
  link1ColorHover: "#00bec9",
  link1Margin: "1vmax",
  profileIconUrl:"/login",
  profileIconColor: "Teal",
  searchIconColor: "Teal",
  cartIconColor: "Teal",
  profileIconColorHover: "#00bec9",
  searchIconColorHover: "#00bec9",
  cartIconColorHover: "#00bec9",
  cartIconMargin: "2vmax",
};

const Header = () => {
  return (
    <ReactNavbar
      {...options}
      profileIcon={true}
      ProfileIconElement={FaUserAlt}
      searchIcon={true}
      SearchIconElement={FaSearch}
      cartIcon={true}
      CartIconElement={FiShoppingBag}
    />
  );
};

export default Header;
