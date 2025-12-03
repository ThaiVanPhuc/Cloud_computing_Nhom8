// Header.jsx
import React, { useState, useEffect } from "react";
import {
  Container,
  Nav,
  Navbar,
  Button,
  Form,
  FormControl,
} from "react-bootstrap";
import { FaHeart, FaShoppingBag, FaUser, FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/box-Banner/logo.gif";
import httpRequest from "../../utils/httpRequest";
import "./Header.css";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  // Lấy user và giỏ hàng, tự động cập nhật khi cart thay đổi
  const fetchCartCount = async () => {
    try {
      const res = await httpRequest.get("cart");
      const data = res.data;

      const total =
        data.items?.reduce((sum, item) => {
          if (!item.product) return sum;
          return sum + item.qty;
        }, 0) || 0;

      setCartCount(total);
    } catch (e) {
      console.error("Lỗi lấy giỏ hàng:", e);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));

    // Lấy cart lần đầu
    fetchCartCount();

    // Lắng nghe event cập nhật cart
    const handleCartUpdate = (e) => {
      if (e.detail !== undefined) {
        setCartCount(e.detail); // nếu có gửi tổng số lượng
      } else {
        // Nếu không gửi tổng số lượng, fetch lại cart
        fetchCartCount();
      }
    };

    window.addEventListener("cartUpdated", handleCartUpdate);

    // Scroll effect
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) navigate(`/search?keyword=${searchQuery}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <Navbar
      expand="lg"
      className={`modern-header ${isScrolled ? "scrolled" : ""}`}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="logo-section">
          <img
            src={logo}
            alt="logo"
            className="logo-img"
          />
          <span className="logo-text">TECHNOLOGY SHOP</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />

        <Navbar.Collapse id="navbar-nav" className="justify-content-between">
          <Nav className="mx-auto nav-links">
            <Nav.Item>
              <Link to="/" className="nav-link">
                Home
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/product" className="nav-link">
                Sản phẩm
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/news" className="nav-link">
                Tin tức
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/contact" className="nav-link">
                Liên hệ
              </Link>
            </Nav.Item>
          </Nav>

          {/* SEARCH */}
          <Form onSubmit={handleSearchSubmit} className="search-wrapper">
            <FaSearch size={16} className="search-icon" />
            <FormControl
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-input"
            />
          </Form>

          {/* ICONS */}
          <div className="icon-group">
            <div style={{ position: "relative", display: "inline-block" }}>
                <Link to="/cart" className="icon-link">
                  <FaShoppingBag size={22} color="#28a745" />
                </Link>

                {cartCount > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-6px",
                      right: "-10px",
                      background: "#ff4d6d",
                      color: "#fff",
                      fontSize: "10px",
                      fontWeight: "bold",
                      padding: "3px 6px",
                      borderRadius: "50%",
                      minWidth: "20px",
                      textAlign: "center",
                      boxShadow: "0 0 2px rgba(0,0,0,0.3)",
                      zIndex: 99,
                    }}
                  >
                    {cartCount}
                  </span>
                )}
              </div>

            {user ? (
              <div className="user-section">
                <div className="user-info">
                  <div className="user-avatar">
                    <FaUser size={14} />
                  </div>
                  <span className="user-name">{user.username}</span>
                </div>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={handleLogout}
                  className="btn-logout"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="auth-section">
                <Link to="/login" className="icon-btn user-btn">
                  <FaUser size={20} />
                </Link>
                <Link to="/signup">
                  <Button variant="outline-secondary" size="sm" className="btn-signup">
                    Sign up
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="danger" size="sm" className="btn-signin">
                    Sign in
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;