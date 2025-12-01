import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
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

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
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
  const fetchCartCount = async () => {
    try {
      const res = await httpRequest.get("cart");
      const total = res.data.items?.reduce(
        (sum, item) => (item.product ? sum + item.qty : sum),
        0
      ) || 0;
      setCartCount(total);
    } catch (e) {
      console.error(e);
      setCartCount(0);
    }
  };
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

  return () => window.removeEventListener("cartUpdated", handleCartUpdate);
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
    <>
      <Navbar
        expand="lg"
        style={{
          background:
            "linear-gradient(90deg, #ffe5e5 0%, #fbdada 40%, #fff0f0 100%)",
          boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
          padding: "10px 0",
        }}
      >
        <Container>
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
            <img
              src={logo}
              alt="logo"
              width="50"
              height="50"
              className="me-2 rounded-circle shadow-sm"
              style={{ objectFit: "cover", transition: "transform 0.3s ease" }}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "scale(1.1)")
              }
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            />
            <span
              className="fw-bold"
              style={{
                fontSize: "1.3rem",
                background: "linear-gradient(90deg, #ff4d6d, #d63384)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 1px 2px rgba(0,0,0,0.1)",
              }}
            >
              TECHNOLOGY SHOP
            </span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbar-nav" />

          <Navbar.Collapse id="navbar-nav" className="justify-content-between">
            <Nav className="mx-auto fw-semibold">
              <Nav.Item>
                <Link to="/" className="nav-link px-3 text-dark hover-link">
                  Home
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link
                  to="/product"
                  className="nav-link px-3 text-dark hover-link"
                >
                  Sản phẩm
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link to="/news" className="nav-link px-3 text-dark hover-link">
                  Tin tức
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link
                  to="/contact"
                  className="nav-link px-3 text-dark hover-link"
                >
                  Liên hệ
                </Link>
              </Nav.Item>
            </Nav>

            {/* SEARCH */}
            <Form
              onSubmit={handleSearchSubmit}
              className="me-3 position-relative"
              style={{ width: "280px" }}
            >
              <FaSearch
                size={16}
                color="#aaa"
                style={{
                  position: "absolute",
                  left: "15px",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              />
              <FormControl
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchQuery}
                onChange={handleSearchChange}
                style={{
                  borderRadius: "30px",
                  padding: "10px 40px 10px 40px",
                  border: "1px solid #ffd1d1",
                  boxShadow: "0 2px 5px rgba(255, 192, 203, 0.3)",
                  transition: "all 0.3s ease",
                }}
                onFocus={(e) => {
                  e.target.style.boxShadow = "0 0 8px rgba(255,100,100,0.5)";
                  e.target.style.borderColor = "#ff8c9e";
                }}
                onBlur={(e) => {
                  e.target.style.boxShadow =
                    "0 2px 5px rgba(255, 192, 203, 0.3)";
                  e.target.style.borderColor = "#ffd1d1";
                }}
              />
            </Form>

            {/* ICONS */}
            <div className="d-flex align-items-center gap-3">
              <Link to="/favorites" className="icon-link">
                <FaHeart size={20} color="#ff4d6d" />
              </Link>

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
                <>
                  <span className="fw-bold text-secondary">
                    {user.username}
                  </span>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-dark">
                    <FaUser size={20} />
                  </Link>
                  <Link to="/signup">
                    <Button variant="outline-secondary" size="sm">
                      Sign up
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button variant="danger" size="sm" className="text-white">
                      Sign in
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
