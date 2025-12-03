import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import httpRequest from "../../../utils/httpRequest";
import { FaShoppingCart, FaStar, FaRegStar, FaArrowLeft } from "react-icons/fa";
import { getImageUrl } from "../../../utils/image";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const res = await httpRequest.get(`products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Lỗi khi tải chi tiết sản phẩm:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetail();
  }, [id]);

  if (loading) return <p className="text-center mt-5">Đang tải sản phẩm...</p>;
  if (!product)
    return <p className="text-center mt-5">Không tìm thấy sản phẩm.</p>;

  const handleAddToCart = async () => {
    try {
      await httpRequest.post("cart", {
        productId: product._id,
        qty: 1,
      });
      alert("Đã thêm sản phẩm vào giỏ hàng!");
    } catch (err) {
      console.error("Lỗi khi thêm vào giỏ:", err);
      alert("Không thể thêm vào giỏ hàng!");
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const maxStars = 5;
    for (let i = 1; i <= maxStars; i++) {
      stars.push(
        i <= rating ? (
          <FaStar key={i} className="text-warning me-1" />
        ) : (
          <FaRegStar key={i} className="text-muted me-1" />
        )
      );
    }
    return stars;
  };

  return (
    <div className="container my-5">
      {/* Nút quay lại */}
      <button
        onClick={() => navigate("/product")}
        className="btn btn-light mb-3 d-flex align-items-center justify-content-center shadow-sm"
        style={{
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          padding: "0",
          fontSize: "1rem",
        }}
        title="Quay lại sản phẩm"
      >
        <FaArrowLeft />
      </button>

      {/* Card sản phẩm kiểu bong bóng */}
      <div
        className="p-4 shadow-lg"
        style={{
          borderRadius: "30px",
          background: "#ffffff",
          boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
          transition: "transform 0.2s",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.transform = "translateY(-5px)")
        }
        onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
      >
        <div className="row g-4 align-items-center">
          {/* Hình ảnh sản phẩm */}
          <div className="col-md-5 text-center">
            <img
              src={getImageUrl(product.Img)}
              alt={product.Title}
              className="img-fluid rounded-4 shadow-sm"
              style={{
                maxHeight: "350px",
                objectFit: "contain",
                backgroundColor: "#fff",
                padding: "15px",
                width: "80%",
              }}
            />
          </div>

          {/* Thông tin sản phẩm */}
          <div className="col-md-7">
            <h6 className="text-info fw-semibold mb-2">{product.Cat}</h6>
            <h2 className="fw-bold mb-3" style={{ color: "#457" }}>
              {product.Title}
            </h2>

            {/* Đánh giá sao */}
            <div className="mb-3 d-flex align-items-center">
              {renderStars(product.rating || 4)}
              <span className="text-muted ms-2">(130 đánh giá)</span>
            </div>

            {/* Giá */}
            <h4 className="text-danger fw-bold mb-3">
              {parseFloat(product.Price).toLocaleString("vi-VN")} VND
            </h4>

            {/* Mô tả */}
            <p className="text-muted mb-3">{product.Description}</p>

            {/* Số lượt bán */}
            <div className="mb-3">
              <span className="badge rounded-pill bg-light text-dark px-3 py-2 shadow-sm">
                Đã bán {product.Luotban} lượt
              </span>
            </div>

            {/* Nút Thêm vào giỏ */}
            <button
              className="btn btn-success d-flex align-items-center gap-2 px-4 py-2"
              onClick={handleAddToCart}
              style={{
                borderRadius: "30px",
                fontSize: "1rem",
                transition: "transform 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
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
