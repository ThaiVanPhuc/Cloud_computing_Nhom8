import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Navbar, Button, Form, FormControl } from "react-bootstrap";
import { FaHeart, FaShoppingBag, FaUser, FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/box-Banner/logo.gif";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) navigate(`/search?keyword=${searchQuery}`);
  };
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };




  return (
    <>
      {/* Header Navbar */}
      <Navbar
        expand="lg"
        style={{
          background: "linear-gradient(90deg, #ffe5e5 0%, #fbdada 40%, #fff0f0 100%)",
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
              onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
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
              <Nav.Item><Link to="/" className="nav-link px-3 text-dark hover-link">Home</Link></Nav.Item>
              <Nav.Item><Link to="/product" className="nav-link px-3 text-dark hover-link">Sản phẩm</Link></Nav.Item>
              <Nav.Item><Link to="/news" className="nav-link px-3 text-dark hover-link">Tin tức</Link></Nav.Item>
              <Nav.Item><Link to="/contact" className="nav-link px-3 text-dark hover-link">Liên hệ</Link></Nav.Item>
            </Nav>

            <Form onSubmit={handleSearchSubmit} className="me-3 position-relative" style={{ width: "280px" }}>
              <FaSearch size={16} color="#aaa" style={{ position: "absolute", left: "15px", top: "50%", transform: "translateY(-50%)" }} />
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
                onFocus={(e) => { e.target.style.boxShadow = "0 0 8px rgba(255,100,100,0.5)"; e.target.style.borderColor = "#ff8c9e"; }}
                onBlur={(e) => { e.target.style.boxShadow = "0 2px 5px rgba(255, 192, 203, 0.3)"; e.target.style.borderColor = "#ffd1d1"; }}
              />
            </Form>

            <div className="d-flex align-items-center gap-3">
              <Link to="/favorites" className="icon-link"><FaHeart size={20} color="#ff4d6d" /></Link>
              <Link to="/cart" className="icon-link"><FaShoppingBag size={20} color="#28a745" /></Link>

              {user ? (
                <>
                  <span className="fw-bold text-secondary">{user.username}</span>
                  <Button variant="outline-danger" size="sm" onClick={handleLogout}>Logout</Button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-dark"><FaUser size={20} /></Link>
                  <Link to="/signup"><Button variant="outline-secondary" size="sm">Sign up</Button></Link>
                  <Link to="/login"><Button variant="danger" size="sm" className="text-white">Sign in</Button></Link>
                </>
              )}
            </div>
          </Navbar.Collapse>
        </Container>

        <style>{`
          .hover-link:hover { color: #ff4d6d !important; text-decoration: underline; }
          .icon-link:hover svg { transform: scale(1.2); transition: transform 0.2s ease; }
        `}</style>
      </Navbar>


      {/* Hero Carousel dưới Header */}











    </>
  );
};

export default Header;
