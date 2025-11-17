import React, { useState, useEffect } from "react";
import {
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiOutlineCloseCircle,
  AiFillStar,
} from "react-icons/ai";
import { BsEye } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import "./product.css";
import httpRequest from "../../../utils/httpRequest";
import { getImageUrl } from "../../../utils/image";

const Product = () => {
  const [product, setProduct] = useState([]);
  const [originalProduct, setOriginalProduct] = useState([]);
  const [comments, setComments] = useState([]);
  const [close, setClose] = useState(false);

  const [showToast, setShowToast] = useState(false); // 👉 thêm state toast

  const navigate = useNavigate();

  // =====================
  // 👉 ADD TO CART (Có Toast)
  // =====================
  const handleAddToCart = async (item) => {
    try {
      await httpRequest.post("cart", {
        productId: item._id,
        qty: 1,
      });

      // Hiện toast
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    } catch (error) {
      console.error("Lỗi thêm vào giỏ:", error);
      alert("Thêm vào giỏ thất bại!");
    }
  };

  // Filter
  const filterProduct = (cat) => {
    setProduct(originalProduct.filter((x) => x.Cat === cat));
  };

  const allProducts = () => {
    setProduct(originalProduct);
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

      {/* DANH SÁCH SẢN PHẨM */}
      <div className="products">
        <h2>Products</h2>

        <div className="container">
          {/* LEFT CATEGORY */}
          <div className="filter">
            <div className="categories">
              <h3>categories</h3>
              <ul>
                <li onClick={allProducts}>All Products</li>
                <li onClick={() => filterProduct("Tablet")}>Tablet</li>
                <li onClick={() => filterProduct("Smart Watch")}>Smart Watch</li>
                <li onClick={() => filterProduct("Laptop")}>Laptop</li>
                <li onClick={() => filterProduct("Headphone")}>Headphone</li>
                <li onClick={() => filterProduct("Camera")}>Camera</li>
                <li onClick={() => filterProduct("Gaming")}>Gaming</li>
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
