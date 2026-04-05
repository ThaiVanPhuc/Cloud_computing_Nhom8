import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineInstagram, AiOutlineTwitter } from "react-icons/ai";
import { RiFacebookFill } from "react-icons/ri";
import { BsYoutube } from "react-icons/bs";

const Footer = () => {
  const [hoveredSocial, setHoveredSocial] = useState(null);
  const [hoveredLink, setHoveredLink] = useState(null);

  const socialLinks = [
    { icon: <RiFacebookFill />, color: "#543ff4ff", name: "Facebook" },
    { icon: <AiOutlineInstagram />, color: "#de693eff", name: "Instagram" },
    { icon: <AiOutlineTwitter />, color: "#129eefff", name: "Twitter" },
    { icon: <BsYoutube />, color: "#ec0f21ff", name: "YouTube" },
  ];

  const pages = [
    { label: "Home", to: "/" },
    { label: "Sản phẩm", to: "/product" },
    { label: "Tin tức", to: "/news" },
    { label: "Liên hệ", to: "/contact" },
  ];

  return (
    <footer
      style={{
        background: "linear-gradient(135deg, #c67070ff 0%, #fdc2c2ff 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated Background Elements */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          opacity: 0.1,
        }}
      >
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: Math.random() * 100 + 50 + "px",
              height: Math.random() * 100 + 50 + "px",
              borderRadius: "50%",
              background: "white",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              animation: `float ${
                Math.random() * 10 + 10
              }s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Main Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: "60px 20px 40px",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "40px",
              marginBottom: "40px",
            }}
          >
            {/* Logo + Social */}
            <div
              style={{
                animation: "slideIn 0.6s ease-out",
              }}
            >
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.15)",
                  backdropFilter: "blur(10px)",
                  padding: "30px",
                  borderRadius: "20px",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  transition: "all 0.3s ease",
                  background: "rgba(255, 255, 255, 0.15)",
                  backdropFilter: "blur(10px)",
                  padding: "30px",
                  borderRadius: "20px",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  height: "100%",
                }}
              >
                <h4
                  style={{
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "26px",
                    marginBottom: "15px",
                    textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
                    background: "linear-gradient(45deg, #fff, #a58f12ff)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    whiteSpace: "nowrap",
                  }}
                >
                  PucShop
                </h4>
                <p
                  style={{
                    color: "rgba(255, 255, 255, 0.9)",
                    marginBottom: "20px",
                    lineHeight: "1.6",
                  }}
                >
                  Cửa hàng công nghệ phong cách nhẹ nhàng – trẻ trung – hiện
                  đại.
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: "15px",
                    fontSize: "28px",
                  }}
                >
                  {socialLinks.map((item, index) => (
                    <a
                      key={index}
                      href="#"
                      onMouseEnter={() => setHoveredSocial(index)}
                      onMouseLeave={() => setHoveredSocial(null)}
                      style={{
                        color: hoveredSocial === index ? item.color : "#fff",
                        transition: "all 0.3s ease",
                        transform:
                          hoveredSocial === index
                            ? "translateY(-8px) scale(1.2)"
                            : "translateY(0) scale(1)",
                        filter:
                          hoveredSocial === index
                            ? "drop-shadow(0 5px 15px rgba(255,255,255,0.5))"
                            : "none",
                        display: "inline-block",
                      }}
                    >
                      {item.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Shop Manager */}
            <div
              style={{
                animation: "slideIn 0.6s ease-out 0.1s backwards",
              }}
            >
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.15)",
                  backdropFilter: "blur(10px)",
                  padding: "30px",
                  borderRadius: "20px",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  height: "100%",
                }}
              >
                <h6
                  style={{
                    color: "#ffd700",
                    fontWeight: "bold",
                    marginBottom: "20px",
                    fontSize: "18px",
                    textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
                  }}
                >
                  Shop Manager
                </h6>

                {/* Tất cả tên trong một khung */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "10px",
                    padding: "10px",
                    borderRadius: "12px",
                    fontSize: "14px",
                    color: "#fff",
                    lineHeight: "1.5",
                    textAlign: "center",
                  }}
                >
                  {[
                    "Thái Văn Phúc"
                  ].map((name, index) => (
                    <span
                      key={index}
                      style={{
                        whiteSpace: "nowrap",
                        textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
                      }}
                    >
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Pages */}
            <div
              style={{
                animation: "slideIn 0.6s ease-out 0.2s backwards",
              }}
            >
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.15)",
                  backdropFilter: "blur(10px)",
                  padding: "30px",
                  borderRadius: "20px",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  height: "100%",
                }}
              >
                <h6
                  style={{
                    color: "#ffd700",
                    fontWeight: "bold",
                    marginBottom: "20px",
                    fontSize: "18px",
                    textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
                  }}
                >
                  Pages
                </h6>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {pages.map((page, index) => (
                    <li key={index} style={{ marginBottom: "12px" }}>
                      <Link
                        to={page.to}
                        onMouseEnter={() => setHoveredLink(index)}
                        onMouseLeave={() => setHoveredLink(null)}
                        style={{
                          color: "#fff",
                          textDecoration: "none",
                          display: "inline-block",
                          transition: "all 0.3s ease",
                          transform:
                            hoveredLink === index
                              ? "translateX(10px)"
                              : "translateX(0)",
                          fontWeight: hoveredLink === index ? "bold" : "normal",
                          textShadow:
                            hoveredLink === index
                              ? "0 0 10px rgba(255,255,255,0.8)"
                              : "none",
                        }}
                      >
                        {hoveredLink === index && "→ "}
                        {page.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Contact */}
            <div
              style={{
                animation: "slideIn 0.6s ease-out 0.3s backwards",
              }}
            >
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.15)",
                  backdropFilter: "blur(10px)",
                  padding: "30px",
                  borderRadius: "20px",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  height: "100%",
                }}
              >
                <h6
                  style={{
                    color: "#ffd700",
                    fontWeight: "bold",
                    marginBottom: "20px",
                    fontSize: "18px",
                    textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
                  }}
                >
                  About Contact
                </h6>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    color: "rgba(255, 255, 255, 0.9)",
                    fontSize: "14px",
                    lineHeight: "1.8",
                  }}
                >
                  <li style={{ marginBottom: "8px" }}>
                    <strong style={{ color: "#ffd700" }}>📧 Email:</strong>{" "}
                    puc@shoptech.vn
                  </li>
                  <li style={{ marginBottom: "8px" }}>
                    <strong style={{ color: "#ffd700" }}>📞 Hotline:</strong>{" "}
                    0123 456 789
                  </li>
                  <li style={{ marginBottom: "8px" }}>
                    <strong style={{ color: "#ffd700" }}>📍 Address:</strong> 33
                    Xô Viết Nghệ Tĩnh, Đà Nẵng
                  </li>
                  <li>
                    <strong style={{ color: "#ffd700" }}>💳 Payment:</strong>{" "}
                    Visa, MasterCard, Momo
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Open Hours */}
          <div
            style={{
              textAlign: "center",
              marginTop: "40px",
              animation: "slideIn 0.6s ease-out 0.4s backwards",
            }}
          >
            <div
              style={{
                background: "rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(10px)",
                padding: "20px",
                borderRadius: "15px",
                display: "inline-block",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
              }}
            >
              <p
                style={{
                  color: "#fff",
                  margin: 0,
                  fontSize: "16px",
                  fontWeight: "500",
                }}
              >
                ⏰ <strong style={{ color: "#ffd700" }}>Giờ mở cửa:</strong>{" "}
                08:00 – 21:00 (Tất cả các ngày trong tuần)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div
        style={{
          background: "rgba(0, 0, 0, 0.2)",
          backdropFilter: "blur(10px)",
          padding: "20px",
          textAlign: "center",
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <p
          style={{
            color: "rgba(255, 255, 255, 0.9)",
            margin: 0,
            fontSize: "14px",
            animation: "pulse 2s ease-in-out infinite",
          }}
        >
          © 2025 PucShop. All rights reserved. ✨
        </p>
      </div>
    </footer>
  );
};

export default Footer;
