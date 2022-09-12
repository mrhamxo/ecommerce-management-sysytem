import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <Fragment>
      <div className="row justify-content-center text-white mt-5" id="footer">
        <div className="col-md-4 col-10 mb-5">
          <h4 className="fw-bold footer-title">ECOMMERCE</h4>
          <p>High Quality is our first priority</p>
          <h4>Follow Us</h4>
          <div className="footer-hover">
            <i className="bi bi-instagram social-icon"></i>
            <i className="bi bi-facebook social-icon"></i>
            <i className="bi bi-twitter social-icon"></i>
            <i className="bi bi-whatsapp social-icon"></i>
          </div>
        </div>
        <div className="col-md-3 col-10 mb-5">
          <h4 className="fw-bold">About</h4>
          <Link to="/">History</Link>
          <br />
          <Link to="/">Our Team</Link>
          <br />
          <Link to="/">Brand Guidelines</Link>
          <br />
          <Link to="/">Terms&Condition</Link>
          <br />
          <Link to="/">Privacy Policy</Link>
          <br />
        </div>
        <div className="col-md-2 col-10">
          <h4 className="fw-bold">Services</h4>
          <Link to="/">How to Order</Link>
          <br />
          <Link to="/">Our Product</Link>
          <br />
          <Link to="/">Order Status</Link>
          <br />
          <Link to="/">Promo</Link>
          <br />
          <Link to="/">Payment Method</Link>
          <br />
        </div>
      </div>
      <div className="row copyright-footer">
        <p>Copyrights 2022 &copy; mr.hamxa942</p>
      </div>
    </Fragment>
  );
};

export default Footer;
