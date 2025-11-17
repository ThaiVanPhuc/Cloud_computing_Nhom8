import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineInstagram, AiOutlineTwitter } from "react-icons/ai";
import { RiFacebookFill } from "react-icons/ri";
import { BsYoutube } from "react-icons/bs";


const Footer = () => {
  return (
    <footer
      className="pt-5 pb-3 text-dark"
      style={{
        background: "linear-gradient(180deg, #fff8f8 0%, #fbe5e5 100%)",
        borderTop: "1px solid #f0caca",
      }}
    >
      <div className="container">
        <div className="row">

          {/* Logo + social */}
          <div className="col-md-3 mb-4">
            <div className="d-flex align-items-center mb-3">
              <span className="text-success ms-3 fs-5 fw-bold">Shop Technology</span>
            </div>

            <div className="d-flex gap-3 fs-4">
              <a href="#" className="text-decoration-none text-primary hover-opacity">
                <RiFacebookFill />
              </a>
              <a href="#" className="text-decoration-none text-danger hover-opacity">
                <AiOutlineInstagram />
              </a>
              <a href="#" className="text-decoration-none text-info hover-opacity">
                <AiOutlineTwitter />
              </a>
              <a href="#" className="text-decoration-none text-danger hover-opacity">
                <BsYoutube />
              </a>
            </div>
          </div>

          {/* Shop Manager */}
          <div className="col-md-3 mb-4 border-start border-2 border-light ps-4">
            <h5 className="fw-bold text-success mb-3">Shop Manager</h5>
            <ul className="list-unstyled">
              <li>Thái Văn Phúc</li>
              <li>Nguyễn Lê Văn Hồng Phúc</li>
            </ul>
          </div>

          {/* Pages */}
          <div className="col-md-3 mb-4 border-start border-2 border-light ps-4">
            <h5 className="fw-bold text-success mb-3">Pages</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-decoration-none text-dark hover-text-success">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/product" className="text-decoration-none text-dark hover-text-success">
                  Sản phẩm
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-decoration-none text-dark hover-text-success">
                  Tin tức
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-decoration-none text-dark hover-text-success">
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          {/* About Contact */}
          <div className="col-md-3 mb-4 border-start border-2 border-light ps-4">
            <h5 className="fw-bold text-success mb-3">About Contact</h5>
            <ul className="list-unstyled">
              <li><strong>Email:</strong> vitinhtu@shoptech.vn</li>
              <li><strong>Hotline:</strong> 0123 456 789</li>
              <li><strong>Address:</strong> 33 Xô Viết Nghệ Tĩnh, Đà Nẵng</li>
              <li><strong>Payment:</strong> Visa, MasterCard, Momo</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-4 border-top pt-3 text-secondary small">
          © 2025 Shop Technology. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
