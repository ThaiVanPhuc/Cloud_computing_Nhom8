import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import httpRequest from "../../../utils/httpRequest";
import "./cart.css";
import { getImageUrl } from "../../../utils/image";

const Cart = ({ setCart }) => {
  const [cart, setCartState] = useState([]);
  const [error, setError] = useState("");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await httpRequest.get("cart");
        const validCart = Array.isArray(response.data.items)
          ? response.data.items.filter((item) => item.product)
          : [];
        setCartState(validCart);
      } catch (error) {
        console.error("Lỗi khi lấy giỏ hàng:", error);
        setCartState([]);
      }
    };
    fetchCart();
  }, []);

  const incqty = async (productId) => {
    try {
      const response = await httpRequest.post("cart", { productId, qty: 1 });
      const validCart = Array.isArray(response.data.items)
        ? response.data.items.filter((item) => item.product)
        : [];
      setCartState(validCart);
    } catch (err) {
      console.error("Lỗi khi tăng số lượng:", err);
    }
  };

  const decqty = async (productId) => {
    try {
      const response = await httpRequest.post("cart", { productId, qty: -1 });
      const validCart = Array.isArray(response.data.items)
        ? response.data.items.filter((item) => item.product)
        : [];
      setCartState(validCart);
    } catch (err) {
      console.error("Lỗi khi giảm số lượng:", err);
    }
  };

  const removeProduct = async (productId) => {
    try {
      const response = await httpRequest.delete(`cart/${productId}`);
      const validCart = Array.isArray(response.data.items)
        ? response.data.items.filter((item) => item.product)
        : [];
      setCartState(validCart);
    } catch (err) {
      console.error("Lỗi khi xóa sản phẩm:", err);
    }
  };

  // Lọc các item hợp lệ trước khi tính tổng
  const validCart = cart.filter((item) => item.product);
  const Totalprice = validCart.reduce(
    (price, item) => price + item.qty * item.product.Price,
    0
  );

  const handlePayment = () => {
    setShowPaymentModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const isValidPhone = (phone) => /^0[0-9]{9}$/.test(phone);
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handlePayOnDelivery = () => {
    if (
      !userInfo.name ||
      !userInfo.address ||
      !userInfo.phone ||
      !userInfo.email
    ) {
      setError("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    if (!isValidPhone(userInfo.phone)) {
      setError("Số điện thoại không hợp lệ!");
      return;
    }
    if (!isValidEmail(userInfo.email)) {
      setError("Email không hợp lệ!");
      return;
    }

    setError("");
    setShowPaymentModal(false);
    setCartState([]); // Clear cart
  };

  return (
    <>
      {/* Nếu Cart rỗng */}
      {validCart.length === 0 && (
        <div className="cartcontainer">
          <div className="emptycart">
            <h2 className="empty">Giỏ hàng trống</h2>
            <Link to="/product" className="emptycartbtn">
              Mua ngay
            </Link>
          </div>
        </div>
      )}

      {/* Danh sách sản phẩm */}
      <div className="contant">
        {validCart.map((curElm) => (
          <div className="cart_item" key={curElm.product._id}>
            <div className="img_box">
              <img
                src={getImageUrl(`/uploads${curElm.product.Img}`)}
                alt={curElm.product.Title}
              />
            </div>

            <div className="detail">
              <h4>{curElm.product.Cat}</h4>
              <h3>{curElm.product.Title}</h3>
              <p>Price: {curElm.product.Price.toLocaleString()} VND</p>

              <div className="qty">
                <button
                  className="incqty"
                  onClick={() => incqty(curElm.product._id)}
                >
                  +
                </button>
                <input type="text" readOnly value={curElm.qty} />
                <button
                  className="decqty"
                  onClick={() => decqty(curElm.product._id)}
                >
                  -
                </button>
              </div>

              <h4 className="subtotal">
                Tạm tính: {(curElm.qty * curElm.product.Price).toLocaleString()}{" "}
                VND
              </h4>
            </div>

            <div className="extra-content">
              <h2 className="totalprice">
                Tổng: {Totalprice.toLocaleString()} VND
              </h2>
              <button className="checkout" onClick={handlePayment}>
                Thanh toán
              </button>

              <div className="close">
                <button onClick={() => removeProduct(curElm.product._id)}>
                  <AiOutlineClose />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Form thanh toán */}
      {showPaymentModal && (
        <div className="overlay">
          <div className="payment-box">
            <h2>Đặt Hàng</h2>

            <div className="pay-on-delivery-info">
              <label>Tên:</label>
              <input
                type="text"
                name="name"
                value={userInfo.name}
                onChange={handleInputChange}
              />

              <label>Địa chỉ:</label>
              <input
                type="text"
                name="address"
                value={userInfo.address}
                onChange={handleInputChange}
              />

              <label>Số điện thoại:</label>
              <input
                type="tel"
                name="phone"
                value={userInfo.phone}
                onChange={handleInputChange}
              />

              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={userInfo.email}
                onChange={handleInputChange}
              />

              <p style={{ color: "red" }}>{error}</p>

              <button id="payOnDelivery" onClick={handlePayOnDelivery}>
                Đặt hàng ngay
              </button>

              <button id="goBack" onClick={() => setShowPaymentModal(false)}>
                Quay lại
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
