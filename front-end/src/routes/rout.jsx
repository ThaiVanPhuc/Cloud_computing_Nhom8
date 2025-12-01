import { Routes, Route } from "react-router-dom";
import Home from "../pages/UserPage/Home/Home";
import Product from "../pages/UserPage/Product/Product";
import Cart from "../pages/UserPage/Cart/Cart";
import Contact from "../pages/UserPage/Contact/Contact";
import Login from "../pages/Authentication/Login/Login";
import Signup from "../pages/Authentication/SignUp/SignUp";
import AdminUserPage from '../pages/AdminPage/UserManagement/Users';
import AdminProductPage from '../pages/AdminPage/ProductManagement/Product';
import AdminLayout from "../layouts/Admin/AdminLayout";
import AdminRoute from "./AdminRoute";
import SearchPage from "../pages/UserPage/Product/searchProduct";
import AdminNewPage from '../pages/AdminPage/NewPage';
import NewPage from '../pages/UserPage/News/new';
import NewsDetail from '../pages/UserPage/News/NewsDetail';


const Rout = ({
  product,
  setProduct,
  detail,
  view,
  close,
  setClose,
  cart,
  setCart,
  addtocart,
  ProductDetail,
}) => {
  return (
    <>
      <Routes>

        <Route
          path="/"
          element={
            <Home
              detail={detail}
              view={view}
              close={close}
              setClose={setClose}
              addtocart={addtocart}
            />
          }
        />

        <Route
          path="/product"
          element={
            <Product
              product={product}
              setProduct={setProduct}
              detail={detail}
              view={view}
              close={close}
              setClose={setClose}
              addtocart={addtocart}
            />
          }
        />

        <Route
          path="/product/:id"
          element={<ProductDetail addtocart={addtocart} />}
        />

        <Route path="/search" element={<SearchPage addtocart={addtocart} />} />

        <Route
          path="/product/:id"
          element={<ProductDetail addtocart={addtocart} />}
        />

        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/news" element={<NewPage />} />
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />


        {/* ===================== ADMIN ROUTES ===================== */}

        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <AdminLayout>
                <AdminUserPage />
              </AdminLayout>
            </AdminRoute>
          }
        />

        <Route
          path="/admin/products"
          element={
            <AdminRoute>
              <AdminLayout>
                <AdminProductPage />
              </AdminLayout>
            </AdminRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/news"
          element={
            <AdminRoute>
              <AdminLayout>
                <AdminNewPage />
              </AdminLayout>
            </AdminRoute>
          }
        />

      </Routes>
    </>
  );
};

export default Rout;
