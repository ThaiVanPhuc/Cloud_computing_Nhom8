import React, { useEffect, useState } from "react";
import httpRequest from "../../../utils/httpRequest";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import banner from "../../../assets/box-Banner/background2.avif";
import './Home.css';
import Chatbox from "../../../components/Chatbox/chatbox";
import { getImageUrl } from "../../../utils/image";

const Home = ({addtocart}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Lấy dữ liệu sản phẩm từ MongoDB qua API
  useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await httpRequest.get("home/all");
      console.log("Dữ liệu trả về từ API:", response.data);
      setProducts(response.data);
    } catch (error) {
      console.error("Lỗi khi tải sản phẩm:", error);
      setError("Không thể tải sản phẩm");
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);
 
  // Carousel Bootstrap
  useEffect(() => {
    const el = document.querySelector("#TechnologyCarousel");
    if (el && window.bootstrap) {
      new window.bootstrap.Carousel(el, {
        interval: 8000,
        ride: "carousel",
        pause: false,
        wrap: true,
      });
    }
  }, []);
 

  if (loading) {
    return <div className="text-center mt-5">Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div className="text-danger text-center mt-5">{error}</div>;
  }

  
  return (
    <>
      {/* Banner */}
      <div className="top_banner py-5"  style={{ background: "linear-gradient(to right, #fffde7, #fff3e0)" }}>
        <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between">
          <div className="text-center text-md-start mb-4 mb-md-0" style={{ maxWidth: "600px" }}>
            <p className="text-warning fw-bold mb-2">Premium TECHNOLOGY</p>
            <h1 className="fw-bold text-success display-5 mb-3">
              The Best NoteBook <br /> Collection 2025
            </h1>
          </div>
          <div id="TechnologyCarousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner rounded shadow" style={{ width: "500px", height: "250px", overflow: "hidden" }}>
              <div className="carousel-item active">
                <img src="/images/background1.jpg" className="d-block w-100 h-100" alt="Banner 1" style={{ objectFit: "cover" }} />
              </div>
              <div className="carousel-item">
                <img src="/images/background.jpg" className="d-block w-100 h-100" alt="Banner 2" style={{ objectFit: "cover" }} />
              </div>
            </div>
          </div>
        </div> </div>
   {/* Hien thi san pham  */}
    <div className="container mt-5"  >
      <div className="row"> {products.map((product) => (
          <div key={product._id} className="col-12 col-sm-6 col-md-3 mb-4">
            <div className="card h-100 shadow-sm border" style={{  minHeight: "400px",  borderRadius: "6px",  overflow: "hidden", }}>
              <div className="position-relative">
            {/* Thay bằng cái này */}
              {/* <img
                  src={`http://localhost:5000${product.Image}`}  alt={product.Name} 
                className="card-img-top"  style={{ height: "250px",  width: "100%", objectFit: "cover",  backgroundColor: "#f8f8f8", }}  />
              </div> */}
              <img
                  src={getImageUrl(`/uploads/${product.Image}`)}  alt={product.Name} 
                className="card-img-top"  style={{ height: "250px",  width: "100%", objectFit: "cover",  backgroundColor: "#f8f8f8", }}  />
              </div>
              <div className="card-body d-flex flex-column text-center">
                <h5 className="card-title fw-bold" style={{color:'#094',}}>{product.Name}</h5>
                <p className="card-text text-muted small flex-grow-1">{product.Description}</p>
                <div className="d-flex justify-content-between align-items-center mt-auto">
                  <div className="fw-semi text-dark fs-7 mb-0">
                  {product.Price.toLocaleString("vi-VN",)} VND
                  </div>
                  <button 
                      className="btn btn-outline-success ms-2 text-dark" 
                      style={{ background: 'rgb(212, 243, 245)' }}onClick={() => addtocart(product)} >
                       
                      🛒 Add to cart
                    </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    {/*End San pham */}

    {/* Seller */}
    <div className="container-fluid service py-5">
      <div className="container py-5">
        <div className="row g-4 justify-content-center">
          {/* Feature 1 - Ipad */}
          <div className="col-md-6 col-lg-4">
            <div className="border border-dark rounded overflow-hidden bg-dark cursor-pointer">
              <img src="/seller/ipad.jpeg" className="img-fluid w-100" alt="Ipad" />
              <div className=" text-center p-4 rounded-bottom" style={{ backgroundColor: '#AEC6CF' }}>
                <h5 className="text-light">Ipad Gen 10 </h5>
                <h3 className="text-secondary">Free delivery</h3>
              </div>
            </div>
          </div>
          {/* Feature 2 - Smart watch */}
          <div className="col-md-6 col-lg-4">
          <div className="border border-dark rounded overflow-hidden cursor-pointer">
            <img src="/seller/watch.jpg" className="img-fluid w-100" alt="watch" />
            <div className="text-center p-4 rounded-bottom" style={{ backgroundColor: 'rgb(247, 165, 118)' }}>
              <h5 className="text-light">Smart watch</h5>
              <h3 className="text-secondary">Discount 30$</h3>
            </div>
          </div>
        </div>


          {/* Feature 3 - */}
          <div className="col-md-6 col-lg-4">
          <div className="border border-dark rounded overflow-hidden cursor-pointer">
            <img src="/seller/heaphones.jpg" className="img-fluid w-100" alt="Headphones" />
            <div className="text-center p-4 rounded-bottom" style={{ backgroundColor: 'rgb(128, 238, 142)' }}>
              <h5 className="text-light">Headphones Bluetooth</h5>
              <h3 className="text-secondary">10% Discount</h3>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
    {/* End Seller */}

    {/* Banner 2 */}
    <div className="banner py-5 bg-light" style={{ background: "linear-gradient(to right, #fffde7, #fff3e0)" }} >
    <div className="container p-4 rounded" style={{ backgroundColor: "rgb(240, 248, 249)",  color: "#333", }}>
    <div className="detail mb-4">
    <h3 className="fw-bold fs-5 text-success mb-2"> LATEST TECHNOLOGY ADDED</h3>     
    <h3
        className="h3 mb-3"
        style={{ color: "grey", fontSize: "1.5rem", fontWeight: "500", }}  >
        Explore the Newest Tech: TVs, Laptops, Headphones & More
      </h3>
      <Link to="/product" className="link">
        Shop Now <BsArrowRight />
      </Link>
    </div>
    <div className="img_box">
      <img
        src={banner}
        className="d-block w-100 h-100"
        alt="Banner"
        style={{ objectFit: "cover" }}
      />
    </div>
  </div>
  <Chatbox />
</div>
 {/*End Banner 2 */}

    </>
  );
};

export default Home;
