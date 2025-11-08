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
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?keyword=${searchQuery}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <Navbar expand="lg" style={{ backgroundColor: "#fbdada" }}>
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={logo} alt="logo" width="40" height="40" className="me-2" />
          <span className="fw-bold text-primary">TECHNOLOGY SHOP</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav" className="justify-content-between">
          <Nav className="mx-auto">
            <Nav.Item><Link to="/" className="nav-link">Home</Link></Nav.Item>
            <Nav.Item><Link to="/product" className="nav-link">Sản phẩm</Link></Nav.Item>
            <Nav.Item><Link to="/news" className="nav-link">Tin Tức</Link></Nav.Item>
            <Nav.Item><Link to="/contact" className="nav-link">Liên hệ</Link></Nav.Item>
          </Nav>

          <Form onSubmit={handleSearchSubmit} className="me-3">
            <div className="d-flex align-items-center" style={{ maxWidth: "320px" }}>
              <FormControl type="text" placeholder="Tìm kiếm sản phẩm" value={searchQuery}
                onChange={handleSearchChange}
                style={{ borderRadius: "20px", padding: "10px", flex: 1 }} />
              <Button variant="primary" type="submit"
                style={{
                  marginLeft: "8px", borderRadius: "20px", padding: "8px 12px",
                  display: "flex", alignItems: "center", justifyContent: "center"
                }}>
                <FaSearch />
              </Button>
            </div>
          </Form>
          <div className="d-flex align-items-center gap-3">
            <Link to="/favorites"><FaHeart size={20} color="red" /></Link>
            <Link to="/cart"><FaShoppingBag size={20} color="green" /></Link>

            {user ? (
              <>
                <span className="fw-bold">{user.username}</span>
                <Button variant="outline-danger" size="sm" onClick={handleLogout}>Logout</Button>
              </>
            ) : (
              <>
                <Link to="/login"><FaUser size={20} /></Link>
                <Link to="/signup"><Button variant="outline-secondary" size="sm">Sign up</Button></Link>
                <Link to="/login"><Button variant="outline-secondary" size="sm">Sign In</Button></Link>
              </>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
