import React, { useEffect, useState } from "react";
import httpRequest from "../../../utils/httpRequest";
import { BsArrowRight } from "react-icons/bs";
import "./Home.css";
import Chatbox from "../../../components/Chatbox/chatbox";
import { getImageUrl } from "../../../utils/image";
import { Button, Carousel } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Home = ({ addtocart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  // Slide data
  const slides = [
    {
      img: "https://img.pikbest.com/wp/202346/operation-interface-modern-minimal-search-engine-a-3d-rendering-of-an-online-browser-window-on-multiple-computer-screens-with-operating-system-mockup-white-theme-and-pink-pastel-background_9736970.jpg!bw700", // luxury laptop
      desc: "High-end laptops crafted for elegance ",
      btnText: "Shop Now",
      btnLink: "/product",
    },
    {
      img: "https://img.pikbest.com/ai/illus_our/20230427/7aa4e43a48c28685ed3c28d782d41414.jpg!sw800", // luxury office
      desc: "Upgrade your home office with premium gadgets.",
      btnText: "Explore",
      btnLink: "/product",
    },
    {
      img: "https://img.pikbest.com/wp/202346/pink-pastel-background-featuring-a-3d-rendered-laptop-computer_9633799.jpg!sw800", // luxury device
      desc: "Smartphones, headphones, tablets & more in style.",
      btnText: "Discover",
      btnLink: "/product",
    },
  ];
  return (
    <>
      {/* Banner */}
      {/* Hero Carousel full width giống Header */}
      <div
        style={{
          width: "100%",
          marginTop: "0px",
          background: "linear-gradient(180deg, #f4f4f4ff, #ffffffff)",
          padding: "60px 0 80px 0",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "90%",
            maxWidth: "1300px",
            borderRadius: "40px",
            background: "linear-gradient(145deg, #fff, #ffe8ef)",
            boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
            overflow: "hidden",
          }}
        >
          <Carousel
            interval={4000}
            controls={true}
            indicators={true}
            fade
            style={{
              width: "100%",
            }}
          >
            {slides.map((slide, index) => (
              <Carousel.Item key={index}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "60px",
                    padding: "60px 80px",
                    flexWrap: "wrap",
                  }}
                >
                  {/* Ảnh bên trái */}
                  <div
                    style={{
                      flex: "1 1 45%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        background: "#fff",
                        padding: "10px",
                        borderRadius: "20px",
                        boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
                      }}
                    >
                      <img
                        src={slide.img}
                        alt={slide.desc}
                        style={{
                          width: "100%",
                          height: "340px",
                          borderRadius: "20px",
                          objectFit: "cover",
                          transition: "transform 0.4s ease",
                        }}
                        onMouseOver={(e) =>
                          (e.currentTarget.style.transform = "scale(1.05)")
                        }
                        onMouseOut={(e) =>
                          (e.currentTarget.style.transform = "scale(1)")
                        }
                      />
                    </div>
                  </div>

                  {/* Nội dung bên phải */}
                  <div
                    style={{
                      flex: "1 1 45%",
                      textAlign: "left",
                      color: "#333",
                    }}
                  >
                    <h2
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "2.8rem",
                        fontWeight: "600",
                        color: "#2b2b2b",
                        marginBottom: "25px",
                      }}
                    >
                      {slide.title || "Experience Innovation with Premium Tech"}
                    </h2>
                    <p
                      style={{
                        fontSize: "1.1rem",
                        lineHeight: "1.7",
                        color: "#555",
                        marginBottom: "35px",
                      }}
                    >
                      {slide.desc}
                    </p>
                    <Link to={slide.btnLink}>
                      <Button
                        style={{
                          background:
                            "linear-gradient(90deg, #ff4d6d, #ff007f)",
                          border: "none",
                          padding: "14px 36px",
                          fontWeight: "600",
                          borderRadius: "40px",
                          color: "#fff",
                          boxShadow: "0 8px 18px rgba(255, 100, 130, 0.4)",
                          transition: "all 0.3s ease",
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.transform = "scale(1.08)";
                          e.currentTarget.style.boxShadow =
                            "0 10px 22px rgba(255, 100, 130, 0.5)";
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.transform = "scale(1)";
                          e.currentTarget.style.boxShadow =
                            "0 8px 18px rgba(255, 100, 130, 0.4)";
                        }}
                      >
                        {slide.btnText}
                      </Button>
                    </Link>
                  </div>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </div>
      {/* Hien thi san pham  */}
      <div className="container mt-5">
        <div className="row">
          {products.map((product) => (
            <div key={product._id} className="col-12 col-sm-6 col-md-3 mb-4">
              <div
                className="card h-100 shadow-sm border-0 product-card"
                style={{
                  minHeight: "380px",
                  borderRadius: "12px",
                  overflow: "hidden",
                  transition: "transform 0.3s, box-shadow 0.3s",
                }}
              >
                <div className="position-relative overflow-hidden">
                  <img
                    src={getImageUrl(`/uploads/${product.Image}`)}
                    alt={product.Name}
                    className="card-img-top product-img"
                    style={{
                      height: "220px",
                      width: "100%",
                      objectFit: "cover",
                      backgroundColor: "#f8f8f8",
                      transition: "transform 0.3s",
                    }}
                  />
                </div>
                <div className="card-body d-flex flex-column text-center">
                  <h5
                    className="card-title fw-bold mb-2"
                    style={{ color: "#094", fontSize: "1.1rem" }}
                  >
                    {product.Name}
                  </h5>
                  <p className="card-text text-muted small flex-grow-1">
                    {product.Description}
                  </p>
                  <div className="d-flex justify-content-between align-items-center mt-auto">
                    <div
                      className="fw-semibold text-dark fs-6 mb-0"
                      style={{ color: "#094" }}
                    >
                      {product.Price.toLocaleString("vi-VN")} VND
                    </div>
                    <button
                      className="btn btn-outline-success ms-2 text-dark"
                      style={{
                        background: "rgb(212, 243, 245)",
                        borderRadius: "8px",
                        transition: "all 0.3s",
                      }}
                      onClick={() => navigate("/product")}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = "#a7e0e5")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background =
                          "rgb(212, 243, 245)")
                      }
                    >
                      Shop Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Thêm CSS hover */}
        <style>{`
    .product-card:hover {
      transform: translateY(-5px) scale(1.03);
      box-shadow: 0 12px 25px rgba(0,0,0,0.15);
    }
    .product-card:hover .product-img {
      transform: scale(1.08);
    }
  `}</style>
      </div>
      {/* End San pham */}

      {/* Seller */}
      <div className="container-fluid py-5" style={{ background: "#f5f5f5" }}>
        <div className="container py-5">
          {/* Title */}
          <div className="text-center mb-5"></div>

          <div className="row g-4 justify-content-center">
            {/* Card 1 - Ipad */}
            <div className="col-md-6 col-lg-4">
              <div className="seller-card position-relative overflow-hidden rounded shadow-lg">
                <img
                  src="/seller/ipad.jpeg"
                  className="img-fluid w-100"
                  alt="Ipad"
                />
                <div className="seller-overlay d-flex flex-column justify-content-end p-4">
                  <h5 className="text-white fw-bold">iPad Gen 10</h5>
                  <span
                    className="badge mt-2"
                    style={{
                      backgroundColor: "#ff4d6d", // màu hồng
                      color: "#fff", // chữ trắng
                      fontWeight: "600",
                      fontSize: "0.9rem",
                      padding: "5px 10px",
                      borderRadius: "12px",
                    }}
                  >
                    Free Delivery
                  </span>
                </div>
              </div>
            </div>

            {/* Card 2 - Smart Watch */}
            <div className="col-md-6 col-lg-4">
              <div className="seller-card position-relative overflow-hidden rounded shadow-lg">
                <img
                  src="/seller/watch.jpg"
                  className="img-fluid w-100"
                  alt="Smart Watch"
                />
                <div
                  className="seller-overlay d-flex flex-column justify-content-end p-4"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent, rgba(247,165,118,0.85))",
                  }}
                >
                  <h5 className="text-white fw-bold">Smart Watch</h5>
                  <span className="badge bg-warning mt-2">Discount 30$</span>
                </div>
              </div>
            </div>

            {/* Card 3 - Headphones */}
            <div className="col-md-6 col-lg-4">
              <div className="seller-card position-relative overflow-hidden rounded shadow-lg">
                <img
                  src="/seller/heaphones.jpg"
                  className="img-fluid w-100"
                  alt="Headphones"
                />
                <div
                  className="seller-overlay d-flex flex-column justify-content-end p-4"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent, rgba(128,238,142,0.85))",
                  }}
                >
                  <h5 className="text-white fw-bold">Headphones Bluetooth</h5>
                  <span className="badge bg-success mt-2">10% Discount</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Seller */}

      {/* Banner 2 */}
      <div
        className="banner py-5"
        style={{
          background: "linear-gradient(to right, #fffaf0, #ffecec)",
        }}
      >
        <div
          className="container-fluid p-4 rounded-3 shadow-sm"
          style={{
            backgroundColor: "#ffffff",
            color: "#333",
            maxWidth: "1300px",
          }}
        >
          {/* Tiêu đề */}
          <div className="text-center mb-5">
            <h2
              className="fw-bold mb-2"
              style={{
                color: "#ff4d6d",
                fontSize: "2rem",
                letterSpacing: "1px",
              }}
            >
              LATEST TECHNOLOGY COLLECTION
            </h2>
            <p className="text-secondary fs-5">
              Discover the latest innovations — sleek, smart & stylish.
            </p>
          </div>

          {/* Slider hiển thị 3 ảnh */}
          <div className="slider-container position-relative mx-auto">
            <div className="slider-track">
              {[
                "https://img.pikbest.com/ai/illus_our/20230526/daf2c59f0ddb664241a5c3401dcf4b55.jpg!sw800",
                "https://img.pikbest.com/wp/202346/cladding-headphone-clad-smartphone-displays-3d-rendered-music-application-against-pink-backdrop_9626996.jpg!bw700",
                "https://img.pikbest.com/wp/202346/cladding-headphone-clad-smartphone-displaying-3d-rendered-music-app-against-pink-backdrop_9626905.jpg!bw700",
                "https://img.pikbest.com/wp/202346/pink-pastel-background-featuring-a-3d-rendered-laptop-computer_9633799.jpg!sw800",
                "https://image.slidesdocs.com/responsive-images/background/sleek-white-gaming-keyboard-featuring-dynamic-rgb-lights-in-striking-3d-render-powerpoint-background_00277d3707__960_540.jpg",
                "https://image.slidesdocs.com/responsive-images/background/click-search-information-computer-concept-for-seo-and-web-analytics-on-a-pastel-pink-3d-rendered-illustration-powerpoint-background_5b2dd96804__960_540.jpg",
              ].map((img, index) => (
                <div className="slide-item" key={index}>
                  <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                    <img
                      src={img}
                      alt={`Tech ${index}`}
                      className="w-100"
                      style={{
                        height: "200px",
                        objectFit: "cover",
                        transition: "transform 0.5s ease",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Nút Shop Now */}
          <div className="text-center mt-5">
            <Link
              to="/product"
              className="btn px-5 py-3 rounded-pill fw-semibold shadow-sm"
              style={{
                background: "linear-gradient(90deg, #ff4d6d, #ff7b92)",
                color: "#fff",
                fontSize: "1.1rem",
                border: "none",
              }}
            >
              Shop Now <BsArrowRight className="ms-2" />
            </Link>
          </div>
        </div>

        <Chatbox />
      </div>
      {/* End Banner 2 */}
    </>
  );
};

export default Home;
