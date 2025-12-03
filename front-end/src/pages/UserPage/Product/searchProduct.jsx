import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import httpRequest from "../../../utils/httpRequest";
import { Container, Row, Col, Button } from "react-bootstrap";
import { getImageUrl } from "../../../utils/image";
import "./search.css";

const SearchPage = ({ addtocart }) => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const query = new URLSearchParams(location.search).get("keyword");

  useEffect(() => {
    if (!query) return;

    const fetchProducts = async () => {
      try {
        const res = await httpRequest.get(`products/search?search=${query}`);
        setProducts(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query]);

  return (
   <Container className="mt-4 search-container">
      <h4 className="search-heading">
        Kết quả tìm kiếm cho: <strong>{query}</strong>
      </h4>

      {loading ? (
        <p className="loading-text">Đang tải...</p>
      ) : products.length === 0 ? (
        <p className="no-result-text">Không tìm thấy sản phẩm nào.</p>
      ) : (
        <Row className="g-4">
          {products.map((product) => (
            <Col md={3} sm={6} xs={12} key={product._id}>
              <div className="product-card">
                <div className="product-img-wrapper">
                  <img
                    src={getImageUrl(product.Img)}
                    alt={product.Title}
                    className="product-img"
                  />
                </div>
                <div className="product-info">
                  <h5 className="product-title">{product.Title}</h5>
                  <p className="product-sold">Đã bán {product.Luotban} lượt</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="product-price">
                      {parseFloat(product.Price).toLocaleString("vi-VN")} VND
                    </span>
                    <Button
                      variant="success"
                      className="add-to-cart-btn"
                      onClick={() => addtocart(product)}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default SearchPage;
