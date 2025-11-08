import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineInstagram, AiOutlineTwitter } from "react-icons/ai";
import { RiFacebookFill } from "react-icons/ri";
import { BsYoutube } from "react-icons/bs";
import logo from "../../assets/box-Banner/logo.gif";

const Footer = () => {
  return (
    <footer className="py-5" style={{ backgroundColor: "#fbdada", color: "#333333" }}>
      <div className="container">
        <div className="row">

          {/* Cột logo và social */}
          <div className="col-md-3 mb-4">
            <div className="d-flex align-items-center mb-3">
              <img src={logo} alt="logo" className="img-fluid" style={{ width: "50px", height: "50px" }} />
              <span className="text-primary ms-3 fs-5 fw-bold">Shop Technology</span>
            </div>
            <div className="d-flex gap-3 fs-4">
              <RiFacebookFill />
              <AiOutlineInstagram />
              <AiOutlineTwitter />
              <BsYoutube />
            </div>
          </div>

          {/* Cột Shop Manager */}
          <div className="col-md-3 mb-4">
            <h5 className="fw-bold fs-5 text-success mb-3">Shop Manager</h5>
            <ul className="list-unstyled">
              <li>Thái Văn Phúc</li>
              <li>Cao Nguyên Bình An</li>
              <li>Lê Thị Thu Thảo</li>
              <li>Nguyễn Lê Văn Hồng Phúc</li>
            </ul>
          </div>

          {/* Cột điều hướng */}
          <div className="col-md-3 mb-4">
            <h5 className="fw-bold fs-5 text-success mb-3">Pages</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-decoration-none" style={{ color: "#333333" }}>Home</Link></li>
              <li><Link to="/product" className="text-decoration-none" style={{ color: "#333333" }}>Sản phẩm</Link></li>
              <li><Link to="/news" className="text-decoration-none" style={{ color: "#333333" }}>Tin Tức</Link></li>
              <li><Link to="/contact" className="text-decoration-none" style={{ color: "#333333" }}>Liên hệ</Link></li>
            </ul>
          </div>

          {/* Cột Thông tin hỗ trợ */}
          <div className="col-md-3 mb-4">
            <h5 className="fw-bold fs-5 text-success mb-3">About contact</h5>
            <ul className="list-unstyled">
              <li>Email: vitinhtu@shoptech.vn</li>
              <li>Hotline: 0123 456 789</li>
              <li>Address: 33 Xô Viết Nghệ Tĩnh - Đà Nẵng</li>
              <li>Payment Accepted</li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
