import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';  
import httpRequest from '../../../utils/httpRequest';
import { FaShoppingCart, FaStar, FaRegStar } from 'react-icons/fa';

const ProductDetail = ({ addtocart }) => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);

  useEffect(() => {
  const fetchProductDetail = async () => {
    try {
      const res = await httpRequest.get(`products/${id}`);
      setProduct(res.data);
    } catch (err) {
      console.error("Lỗi khi tải chi tiết sản phẩm:", err);
    }
  };

  fetchProductDetail();
}, [id]);

  if (!product) return <p className="text-center mt-5">Đang tải sản phẩm...</p>;

  // Hàm render sao đánh giá
  const renderStars = (rating) => {
    const stars = [];
    const maxStars = 5;

    for (let i = 1; i <= maxStars; i++) {
      stars.push(
        i <= rating 
          ? <FaStar key={i} className="text-warning me-1" />
          : <FaRegStar key={i} className="text-muted me-1" />
      );
    }
    return stars;
  };

  return (
    <div className="container my-5">
  <div className="row g-3 align-items-start">
    {/* Hình ảnh sản phẩm */}
    <div className="col-md-5 text-center">
      <img
        src={getImageUrl(product.Img)}
        alt={product.Title}
        className="img-fluid rounded-3 shadow-sm"
        style={{ maxHeight: '350px', objectFit: 'contain', backgroundColor: "#fff", padding: "10px" , width: '70%' }}
      />
    </div>

    {/* Thông tin sản phẩm */}
    <div className="col-md-7">
      <div>
        <h6 className="text-info fw-semibold mb-2" >
          {product.Cat}
        </h6>

        <h2 className="fw-bold mb-3" style={{ color: "#457" }}>
          {product.Title}
        </h2>

        {/* Đánh giá sao */}
        <div className="mb-3 d-flex align-items-center">
          {renderStars(product.rating || 4)}
          <span className="text-muted ms-2">(130 đánh giá)</span>
        </div>
          <h4> {parseFloat(product.Price).toLocaleString('vi-VN')} VND</h4>

        <p className="text-muted mb-3">{product.Description}</p>

        {/* Số lượng đã bán */}
        <div className="mb-3">
          <span className="badge rounded-pill text-dark px-3 py-2">
            Đã bán {product.Luotban} lượt
          </span>
        </div>

        {/* Nút thêm vào giỏ hàng */}
        <button
          className="btn btn-success d-flex align-items-center gap-2 px-4 py-2"
          onClick={() => addtocart(product)}
          style={{ borderRadius: '30px', fontSize: '1rem' }}>
          <FaShoppingCart />
          <span>Thêm vào giỏ</span>
        </button>
      </div>
    </div>
  </div>
</div>


  );
};

export default ProductDetail;
