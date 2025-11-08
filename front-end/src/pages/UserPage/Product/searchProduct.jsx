import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import httpRequest from '../../../utils/httpRequest';
import { Container, Row, Col, Button } from 'react-bootstrap';
import "./search.css";
const SearchPage = ({ addtocart }) => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Lấy từ khóa tìm kiếm từ URL
  const query = new URLSearchParams(location.search).get('keyword');

useEffect(() => {
  const fetchProducts = async () => {
    try {
      const res = await httpRequest.get(`products/search?search=${query}`);
      setProducts(res.data);
    } catch (error) {
      console.error("Lỗi khi tìm kiếm sản phẩm:", error);
    } finally {
      setLoading(false);
    }
  };

  if (query) {
    fetchProducts();
  }
}, [query]);

  return (
    <Container className="mt-4 text-center " >
      <h4>Kết quả tìm kiếm cho: "<strong>{query}</strong>"</h4>

      {loading ? (
        <p>Đang tải...</p>
      ) : products.length === 0 ? (
        <p>Không tìm thấy sản phẩm nào.</p>
      ) : (
        <Row className="g-4">
          {products.map((product) => (
            <Col md={3} key={product._id} className="mb-4">
              <div className="product-card shadow-sm rounded">
                <div className="img-container">
                  <img
                    src={getImageUrl(product.Img)}
                    alt={product.Title}
                    style={{
                      width: '100%',
                      objectFit: 'cover',
                      borderRadius: '10px',
                    }}
                  />
                </div>
                <div className="p-3">
                  <h5 className="product-title text-center">{product.Title}</h5>
                  <p className="product-description" style={{ color: "grey", fontSize: '14px' }}>
                    Đã bán {product.Luotban} lượt
                  </p>

                  <div className="d-flex justify-content-between align-items-center">
                    <h6 className="product-price">
                      {parseFloat(product.Price).toLocaleString('vi-VN')} VND
                    </h6>

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
