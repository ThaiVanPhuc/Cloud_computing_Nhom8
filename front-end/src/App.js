import React, { useState , useEffect} from "react";
import Nav from "./components/Header/Header";
import Rout from "./routes/rout";
import { BrowserRouter, useLocation } from "react-router-dom";
import Footer from "./components/Footer/footer";
import axios from "axios";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import ProductDetail from "./pages/UserPage/Product/ProductDetail";

const AppContent = () => {
  const location = useLocation();

  // add to cart
  const [cart, setCart] = useState([]);
  //product Details
  const [close, setClose] = useState(false);
  const [detail, setDetails] = useState([]);
  const [product, setProduct] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/products");  
        setProduct(response.data);  
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm: ", error);  
      }
    };

    fetchProducts();
  }, []); 

  // Hàm tìm kiếm sản phẩm theo danh mục
  const searchbtn = (category) => {
    const filtered = product.filter((x) => x.Cat === category);
    setProduct(filtered);
  };
   // Hiển thị chi tiết sản phẩm
   const view = (product) => {
    setDetails([{ ...product }]);
    setClose(true);
  };


  //add to cart
  const addtocart = (product) => {
    const exsit = cart.find((x) => {
      return x.id === product.id;
    });
    if (exsit) {
      alert("Sản phẩm này đã được thêm vào giỏ hàng");
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
      alert("Sản phẩm đã được thêm vào giỏ hàng");
    }
  };

  const hideHeaderFooter =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname.startsWith("/admin");

  return (
    <>
      {!hideHeaderFooter && <Nav searchbtn={searchbtn} />}
      <Rout
        product={product}
        setProduct={setProduct}
        detail={detail}
        view={view}
        close={close}
        setClose={setClose}
        cart={cart}
        setCart={setCart}
        addtocart={addtocart}
        ProductDetail={ProductDetail}
        
      />
       
      {!hideHeaderFooter && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
