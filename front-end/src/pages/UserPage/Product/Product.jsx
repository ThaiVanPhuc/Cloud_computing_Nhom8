import React, { useState, useEffect } from "react";
import { AiOutlineShoppingCart, AiOutlineHeart, AiOutlineCloseCircle, AiFillStar, } from "react-icons/ai";
import { BsEye } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import "./product.css";
import httpRequest from '../../../utils/httpRequest';

const Product = ({ detail, addtocart }) => {
  const [product, setProduct] = useState([]);
  const [originalProduct, setOriginalProduct] = useState([]);
  const [comments, setComments] = useState([]);
  const [close, setClose] = useState(false);

  // Lọc sản phẩm theo category
  const filterProduct = (category) => {
    const filtered = originalProduct.filter((x) => x.Cat === category);
    setProduct(filtered);
  };

  // Hiển thị lại tất cả sản phẩm
  const allProducts = () => {
    setProduct(originalProduct);
  };

  // Thêm bình luận
  const addComment = (newComment) => {
    setComments([...comments, newComment]);
  };
  // Xu ly duong dan den trang chi tiet san pham
  const navigate = useNavigate();

  const view = (product) => {
    navigate(`/product/${product._id}`);
  };



  // Lấy dữ liệu sản phẩm từ API
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await httpRequest.get("products");
      console.log("Dữ liệu trả về từ API:", response.data);
      setProduct(response.data);
      setOriginalProduct(response.data); // Lưu bản gốc để lọc
    } catch (error) {
      console.error("Lỗi khi tải sản phẩm:", error);
    }
  };

  fetchData();
}, []);

  return (
    <>
      {close ? (
        <div className="products_detail mb-4">
          <div className="container">
            <button onClick={() => setClose(false)} className="closebtn">
              <AiOutlineCloseCircle />
            </button>
            {detail.map((curElm) => {
              return (
                <div className="productbox mb-3" key={curElm.id}>
                  <div className="img_box">
                    <img src={curElm.Img} alt={curElm.Title}></img>
                  </div>
                  <div className="detail">
                    <h4>{curElm.Cat}</h4>
                    <h2>{curElm.Title}</h2>

                    <h3>{curElm.Price.toLocaleString("vi-VN",)} VND</h3>
                    <button onClick={() => addtocart(curElm)}>
                      Add To Cart
                    </button>
                  </div>
                </div>
              );
            })}
            <div className="productbox"></div>
            <div className="comments-section">
              <h3>Comments</h3>
              <div className="comments-list">
                {comments.map((comment, index) => (
                  <div className="comment" key={index}>
                    <div className="star-and-details">
                      <div className="star-icon">
                        {[...Array(parseInt(comment.stars))].map(
                          (star, index) => (
                            <AiFillStar className="gold-star" key={index} />
                          )
                        )}
                      </div>
                      <div className="comment-details">
                        <p>
                          <strong>{comment.name}</strong>
                        </p>
                        <p>{comment.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Form binh luanluan */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const newComment = {
                    name: e.target.elements.name.value,
                    comment: e.target.elements.comment.value,
                    stars: e.target.elements.stars.value,
                  };
                  addComment(newComment);
                  e.target.elements.name.value = "";
                  e.target.elements.comment.value = "";
                  e.target.elements.stars.value = "";
                }}
              >
                <input type="text" name="name" placeholder="Your name..." />
                <input
                  type="text"
                  name="comment"
                  placeholder="Your comment..."
                />
                <select name="stars">
                  <option value="1">1 star</option>
                  <option value="2">2 stars</option>
                  <option value="3">3 stars</option>
                  <option value="4">4 stars</option>
                  <option value="5">5 stars</option>
                </select>
                <button type="submit">Send</button>
              </form>
            </div>
          </div>
        </div>
      ) : null}
      {/* EndEnd */}
      {/* Phân loại  */}

      <div className="products">
        <h2>Products</h2>
        <div className="container">
          <div className="filter">
            <div className="categories">
              <h3>categories</h3>
              <ul>
                <li onClick={() => allProducts()}>All Products</li>
                <li onClick={() => filterProduct("Tablet")}>Tablet</li>
                <li onClick={() => filterProduct("Smart Watch")}>
                  Smart Watch
                </li>
                <li onClick={() => filterProduct("Laptop")}>Laptop</li>

                <li onClick={() => filterProduct("Headphone")}>Headphone</li>
                <li onClick={() => filterProduct("Camera")}>Camera</li>
                <li onClick={() => filterProduct("Gaming")}>Gaming</li>
              </ul>
            </div>
          </div>
          <div className="productbox">
            <div className="contant">
              {product.map((curElm) => {
                return (
                  <div className="box" key={curElm.id}>
                    <div className="img_box">
                      {/* <img src={`http://localhost:5000${curElm.Img}`} alt={curElm.Title}></img> */}
                      <img src={getImageUrl(curElm.Img)} alt={curElm.Title} />
                      <div className="icon">
                        <li onClick={() => addtocart(curElm)}>
                          <AiOutlineShoppingCart />
                        </li>

                        <li onClick={() => view(curElm)}>
                          <BsEye />
                        </li>
                        <li>
                          <AiOutlineHeart />
                        </li>
                      </div>
                    </div>
                    <div className="detail">
                      <p>{curElm.Cat}</p>
                      <h3>{curElm.Title}</h3>
                      <h4>{curElm.Price.toLocaleString("vi-VN",)} VND</h4>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;