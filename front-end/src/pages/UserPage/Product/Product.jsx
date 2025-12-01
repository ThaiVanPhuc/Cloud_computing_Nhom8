import React, { useState, useEffect } from "react";
import {
  AiOutlineShoppingCart,
  AiOutlineHeart,
} from "react-icons/ai";
import { BsEye } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import "./product.css";
import httpRequest from "../../../utils/httpRequest";
import { getImageUrl } from "../../../utils/image";

const Product = () => {
  const [product, setProduct] = useState([]);
  const [originalProduct, setOriginalProduct] = useState([]);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "",
    action: null,
  });

  const [activeCategory, setActiveCategory] = useState("All Products");

  const [showToast] = useState(false);

  const navigate = useNavigate();

  const handleAddToCart = async (item) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setToast({
        show: true,
        message: "Bạn cần đăng nhập để thêm vào giỏ hàng!",
        type: "info",
        action: () => navigate("/login") // callback khi nhấn OK
      });
      return;
    }

    try {
      await httpRequest.post("cart", { productId: item._id, qty: 1 });
      
      // 🔹 Tự động cập nhật số lượng giỏ hàng ở Header
      const res = await httpRequest.get("cart");
      const total = res.data.items?.reduce((sum, i) => i.product ? sum + i.qty : sum, 0) || 0;
      window.dispatchEvent(new CustomEvent("cartUpdated", { detail: total }));

      setToast({ show: true, message: "Đã thêm vào giỏ hàng!", type: "success", action: null });
      setTimeout(() => setToast({ show: false, message: "", type: "", action: null }), 2000);
    } catch (error) {
      console.error("Lỗi thêm vào giỏ:", error);
      setToast({ show: true, message: "Thêm vào giỏ thất bại!", type: "error", action: null });
      setTimeout(() => setToast({ show: false, message: "", type: "", action: null }), 2000);
    }
  };

  // Filter
  const filterProduct = (cat) => {
    setProduct(originalProduct.filter((x) => x.Cat === cat));
    setActiveCategory(cat); // cập nhật category đang chọn
  };

  const allProducts = () => {
    setProduct(originalProduct);
    setActiveCategory("All Products"); // đặt All Products là active
  };

  // Fetch Products
  useEffect(() => {
    const f = async () => {
      try {
        const res = await httpRequest.get("products");
        setProduct(res.data);
        setOriginalProduct(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    f();
  }, []);

  return (
    <>
      {/* 👉 TOAST THÔNG BÁO */}
      {showToast && (
        <div className="toast-message">
          Đã thêm vào giỏ hàng!
        </div>
      )}
      {toast.show && (
        <div className="toast-message">
          <div>{toast.message}</div>
          {toast.action && (
            <div className="toast-buttons">
              <button
                onClick={() => {
                  toast.action();
                  setToast({ show: false, message: "", type: "", action: null });
                }}
              >
                OK
              </button>
              <button
                onClick={() =>
                  setToast({ show: false, message: "", type: "", action: null })
                }
              >
                Hủy
              </button>
            </div>
          )}
        </div>
      )}

      {/* DANH SÁCH SẢN PHẨM */}
      <div className="products">
        <h2>Products</h2>

        <div className="container">
          {/* LEFT CATEGORY */}
          <div className="filter">
            <div className="categories">
              <h3>categories</h3>
              <ul>
                <li
                  className={activeCategory === "All Products" ? "active" : ""}
                  onClick={allProducts}
                >
                  All Products
                </li>
                <li
                  className={activeCategory === "Tablet" ? "active" : ""}
                  onClick={() => filterProduct("Tablet")}
                >
                  Tablet
                </li>
                <li
                  className={activeCategory === "Smart Watch" ? "active" : ""}
                  onClick={() => filterProduct("Smart Watch")}
                >
                  Smart Watch
                </li>
                <li
                  className={activeCategory === "Laptop" ? "active" : ""}
                  onClick={() => filterProduct("Laptop")}
                >
                  Laptop
                </li>
                <li
                  className={activeCategory === "Headphone" ? "active" : ""}
                  onClick={() => filterProduct("Headphone")}
                >
                  Headphone
                </li>
                <li
                  className={activeCategory === "Camera" ? "active" : ""}
                  onClick={() => filterProduct("Camera")}
                >
                  Camera
                </li>
                <li
                  className={activeCategory === "Gaming" ? "active" : ""}
                  onClick={() => filterProduct("Gaming")}
                >
                  Gaming
                </li>
              </ul>

            </div>
          </div>

          {/* RIGHT PRODUCTS */}
          <div className="productbox">
            <div className="contant">
              {product.map((p) => (
                <div className="box" key={p._id}>
                  <div className="img_box">
                    <img src={getImageUrl(p.Img)} alt={p.Title} />

                    <div className="icon">
                      <li onClick={() => handleAddToCart(p)}>
                        <AiOutlineShoppingCart />
                      </li>

                      <li onClick={() => navigate(`/product/${p._id}`)}>
                        <BsEye />
                      </li>

                      <li>
                        <AiOutlineHeart />
                      </li>
                    </div>
                  </div>

                  <div className="detail">
                    <p>{p.Cat}</p>
                    <h3>{p.Title}</h3>
                    <h4>{p.Price.toLocaleString("vi-VN")} VND</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
