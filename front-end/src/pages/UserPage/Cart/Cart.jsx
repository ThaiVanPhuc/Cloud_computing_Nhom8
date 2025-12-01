import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import httpRequest from "../../../utils/httpRequest";
import { getImageUrl } from "../../../utils/image";
import { useNavigate } from "react-router-dom";
import "./cart.css";

const Cart = ({ setCart }) => {
  const navigate = useNavigate();
  const [cart, setCartState] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [error, setError] = useState("");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
  });

  // Hàm dispatch event cập nhật Header
  const updateCartHeader = (items) => {
    const totalQty = items.reduce(
      (sum, item) => (item.product ? sum + item.qty : sum),
      0
    );
    window.dispatchEvent(new CustomEvent("cartUpdated", { detail: totalQty }));
  };

  // Lấy giỏ hàng từ server
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await httpRequest.get("cart");
        const dataItems = response.data.items || response.data.data?.items || [];
        const validCart = dataItems.filter((item) => item.product);
        setCartState(validCart);
        updateCartHeader(validCart); // Cập nhật số lượng Header
      } catch (error) {
        console.error("Lỗi khi lấy giỏ hàng:", error);
        setCartState([]);
        updateCartHeader([]); // Header = 0
      }
    };
    fetchCart();
  }, []);

  const toggleSelect = (id) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const incqty = async (productId) => {
    try {
      const response = await httpRequest.post("cart", { productId, qty: 1 });
      const dataItems = response.data.items || response.data.data?.items || [];
      const validCart = dataItems.filter((item) => item.product);
      setCartState(validCart);
      updateCartHeader(validCart);
    } catch (err) {
      console.error("Lỗi khi tăng số lượng:", err);
    }
  };

  const decqty = async (productId) => {
    try {
      const response = await httpRequest.post("cart", { productId, qty: -1 });
      const dataItems = response.data.items || response.data.data?.items || [];
      const validCart = dataItems.filter((item) => item.product);
      setCartState(validCart);
      updateCartHeader(validCart);
    } catch (err) {
      console.error("Lỗi khi giảm số lượng:", err);
    }
  };

  const removeProduct = async (productId) => {
    try {
      const response = await httpRequest.delete(`cart/${productId}`);
      const dataItems = response.data.items || response.data.data?.items || [];
      const validCart = dataItems.filter((item) => item.product);
      setCartState(validCart);
      setSelectedProducts((prev) => prev.filter((id) => id !== productId));
      updateCartHeader(validCart);
    } catch (err) {
      console.error("Lỗi khi xóa sản phẩm:", err);
    }
  };

  const validCart = cart.filter((item) => item.product);

  const totalSelected = validCart
    .filter((item) => selectedProducts.includes(item.product._id))
    .reduce((sum, item) => sum + item.qty * item.product.Price, 0);

  const handlePayment = () => {
    if (selectedProducts.length === 0) {
      setError("Vui lòng chọn sản phẩm cần thanh toán!");
      return;
    }
    setError("");
    setShowPaymentModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const isValidPhone = (phone) => /^0[0-9]{9}$/.test(phone);
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handlePayOnDelivery = async () => {
    if (!userInfo.name || !userInfo.address || !userInfo.phone || !userInfo.email) {
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

    try {
      await Promise.all(
        selectedProducts.map((id) => httpRequest.delete(`cart/${id}`))
      );

      const remaining = validCart.filter(
        (item) => !selectedProducts.includes(item.product._id)
      );
      setCartState(remaining);
      setSelectedProducts([]);
      setShowPaymentModal(false);
      updateCartHeader(remaining);

      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      console.error("Lỗi khi thanh toán:", err);
      setError("Thanh toán thất bại, vui lòng thử lại!");
    }
  };

  return (
    <>
      {validCart.length === 0 ? (
        <div className="empty-cart text-center" style={{ marginTop: "50px" }}>
          <h2>Giỏ hàng của bạn đang trống!</h2>
          <button
            className="btn btn-primary mt-3"
            onClick={() => navigate("/product")}
          >
            Shop Now
          </button>
        </div>
      ) : (
        <>
          <div className="cart-wrapper">
            {validCart.map((curElm) => {
              const selected = selectedProducts.includes(curElm.product._id);
              return (
                <div className="cart-item" key={curElm.product._id}>
                  <input
                    type="checkbox"
                    className="select-checkbox"
                    checked={selected}
                    onChange={() => toggleSelect(curElm.product._id)}
                  />
                  <div className="cart-left">
                    <img
                      src={getImageUrl(curElm.product.Img)}
                      alt={curElm.product.Title}
                      className="cart-img"
                    />
                  </div>
                  <div className="cart-middle">
                    <h4 className="cart-category">{curElm.product.Cat}</h4>
                    <h3 className="cart-title">{curElm.product.Title}</h3>
                    <p className="cart-price">{curElm.product.Price.toLocaleString()} VND</p>
                    <div className="cart-qty">
                      <button onClick={() => incqty(curElm.product._id)} className="qty-btn">+</button>
                      <input type="text" readOnly value={curElm.qty} className="qty-input" />
                      <button onClick={() => decqty(curElm.product._id)} className="qty-btn">-</button>
                    </div>
                    <h4 className="cart-subtotal">
                      Tạm tính: {(curElm.qty * curElm.product.Price).toLocaleString()} VND
                    </h4>
                  </div>
                  <button className="remove-btn" onClick={() => removeProduct(curElm.product._id)}>
                    <AiOutlineClose />
                  </button>
                </div>
              );
            })}
            <p style={{ color: "red", marginLeft: "20px" }}>{error}</p>
          </div>

          {selectedProducts.length > 0 && (
            <div className="cart-footer">
              <h2>Tổng tiền: {totalSelected.toLocaleString()} VND</h2>
              <button className="checkout-btn" onClick={handlePayment}>
                Thanh toán
              </button>
            </div>
          )}
        </>
      )}

      {showPaymentModal && (
        <div className="overlay">
          <div className="payment-box">
            <h2>Đặt Hàng</h2>
            <div className="pay-on-delivery-info">
              <label style={{color: "#000", fontWeight: "bold"}}>Tên:</label>
              <input type="text" name="name" value={userInfo.name} onChange={handleInputChange} />
              <label style={{color: "#000", fontWeight: "bold"}}>Địa chỉ:</label>
              <input type="text" name="address" value={userInfo.address} onChange={handleInputChange} />
              <label style={{color: "#000", fontWeight: "bold"}}>Số điện thoại:</label>
              <input type="tel" name="phone" value={userInfo.phone} onChange={handleInputChange} />
              <label style={{color: "#000", fontWeight: "bold"}}>Email:</label>
              <input type="email" name="email" value={userInfo.email} onChange={handleInputChange} />
              <p className="error-text">{error}</p>
              <button id="payOnDelivery" onClick={handlePayOnDelivery}>
                Thanh toán {totalSelected.toLocaleString()} VND
              </button>
              <button id="goBack" onClick={() => setShowPaymentModal(false)}>Quay lại</button>
            </div>
          </div>
        </div>
      )}

      {showToast && (
        <div className="toast">Thanh toán thành công!</div>
      )}
    </>
  );
};

export default Cart;
