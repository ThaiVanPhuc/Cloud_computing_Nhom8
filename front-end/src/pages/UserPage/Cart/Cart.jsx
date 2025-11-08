import React, { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import httpRequest from '../../../utils/httpRequest';
import './cart.css';

const Cart = ({ setCart }) => {
    const [cart, setCartState] = useState([]);
    const [error, setError] = useState('');
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [userInfo, setUserInfo] = useState({
        name: '',
        address: '',
        phone: '',
        email: '',
    });

 useEffect(() => {
  const fetchCart = async () => {
    try {
      const response = await httpRequest.get("cart");
      setCartState(response.data.cart);
    } catch (error) {
      console.error("Lỗi khi lấy giỏ hàng:", error);
    }
  };

  fetchCart();
}, []);

const incqty = async (productId) => {
  try {
    const response = await httpRequest.post("cart", { productId, qty: 1 });
    setCartState(response.data.cart);
  } catch (err) {
    console.error("Lỗi khi tăng số lượng:", err);
  }
};

const decqty = async (productId) => {
  try {
    const response = await httpRequest.post("cart", { productId, qty: -1 });
    setCartState(response.data.cart);
  } catch (err) {
    console.error("Lỗi khi giảm số lượng:", err);
  }
};

const removeProduct = async (productId) => {
  try {
    const response = await httpRequest.delete(`cart/${productId}`);
    setCartState(response.data.cart);
  } catch (err) {
    console.error("Lỗi khi xóa sản phẩm:", err);
  }
};

    const Totalprice = cart.reduce((price, item) => price + item.qty * item.Price, 0);

    const handlePayment = () => {
        setShowPaymentModal(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
    };

    const isValidPhone = (phone) => {
        const phoneRegex = /^0[0-9]{9}$/;
        return phoneRegex.test(phone);
    };

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handlePayOnDelivery = () => {
        if (!userInfo.name || !userInfo.address || !userInfo.phone || !userInfo.email) {
            setError('Vui lòng điền đầy đủ thông tin!');
            return;
        }

        if (!isValidPhone(userInfo.phone)) {
            setError('Số điện thoại không hợp lệ!');
            return;
        }

        if (!isValidEmail(userInfo.email)) {
            setError('Email không hợp lệ!');
            return;
        }
        setError('');
        setShowPaymentModal(false);
        setCartState([]);  // Clear cart after successful payment
    };

    return (
        <>
            <div className='cartcontainer'>
                {cart.length === 0 && (
                    <div className='emptycart'>
                        <h2 className='empty'>Cart is Empty</h2>
                        <Link to='/product' className='emptycartbtn'>
                            Shop Now
                        </Link>
                    </div>
                )}
            </div>
            <div className='contant'>
                {cart.map((curElm) => (
                    <div className='cart_item' key={curElm.id}>
                        <div className='img_box'>
                            <img src={curElm.Img} alt={curElm.Title}></img>
                        </div>
                        <div className='extra-content'>
                            <h2 className='totalprice'>Tổng: $ {Totalprice}</h2>
                            <button className='checkout' onClick={handlePayment}>
                                Thanh Toán
                            </button>
                        </div>
                        <div className='detail'>
                            <div className='detail'>
                                <h4>{curElm.Cat}</h4>
                                <h3>{curElm.Title}</h3>
                                <p>Price: {curElm.Price}</p>
                                <div className='qty'>
                                    <button className='incqty' onClick={() => incqty(curElm.id)}>
                                        +
                                    </button>
                                    <input type='text' value={curElm.qty}></input>
                                    <button className='decqty' onClick={() => decqty(curElm.id)}>
                                        -
                                    </button>
                                </div>
                                <h4 className='subtotal'>Tạm Tính: ${curElm.Price * curElm.qty}</h4>
                            </div>
                            <div className='close'>
                                <button onClick={() => removeProduct(curElm.id)}>
                                    <AiOutlineClose />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* Thanh toán */}
            {showPaymentModal && (
                <div className='payment-box'>
                    <h2>Đặt Hàng</h2>
                    <div className='pay-on-delivery-info'>
                        <label htmlFor='name'>Tên:</label>
                        <input
                            type='text'
                            id='name'
                            name='name'
                            value={userInfo.name}
                            onChange={handleInputChange}
                        ></input>
                        <br />
                        <br />
                        <label htmlFor='address'>Địa chỉ:</label>
                        <input
                            type='text'
                            id='address'
                            name='address'
                            value={userInfo.address}
                            onChange={handleInputChange}
                        ></input>
                        <br />
                        <br />
                        <label htmlFor='phone'>Số điện thoại:</label>
                        <input
                            type='tel'
                            id='phone'
                            name='phone'
                            value={userInfo.phone}
                            onChange={handleInputChange}
                        ></input>
                        <br />
                        <br />
                        <label htmlFor='email'>Email:</label>
                        <input
                            type='email'
                            id='email'
                            name='email'
                            value={userInfo.email}
                            onChange={handleInputChange}
                        ></input>
                        <br />
                        <br />
                        <p style={{ color: 'red' }}>{error}</p>
                        <button id='payOnDelivery' onClick={handlePayOnDelivery}>
                            Đặt Hàng Ngay
                        </button>
                        <button id='goBack' onClick={() => setShowPaymentModal(false)}>
                            Quay lại
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Cart;
