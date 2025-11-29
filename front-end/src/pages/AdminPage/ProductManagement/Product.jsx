import React, { useEffect, useState } from "react";
import styles from "./Products.module.scss";
import { getImageUrl } from "../../../utils/image";
import * as productServices from "../../../services/productServices";
import { FaEdit, FaTrash } from "react-icons/fa";

const AdminProductPage = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    Title: "",
    Cat: "",
    Price: "",
    Description: "",
    Img: null,
  });
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const fetchProducts = async () => {
    try {
      const data = await productServices.getAllProducts();
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const confirmDelete = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!productToDelete) return;
    try {
      const token = localStorage.getItem("token");
      await productServices.deleteProduct(productToDelete._id, token);
      setShowDeleteModal(false);
      setProductToDelete(null);
      fetchProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  const cancelDelete = () => {
    setProductToDelete(null);
    setShowDeleteModal(false);
  };

  const handleEdit = (product) => {
    setFormData({
      id: product._id,
      Title: product.Title,
      Cat: product.Cat,
      Price: product.Price,
      Description: product.Description,
      Img: null,
    });
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "Img") {
      setFormData((prev) => ({ ...prev, Img: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const token = localStorage.getItem("token");
      const form = new FormData();
      form.append("Title", formData.Title);
      form.append("Cat", formData.Cat);
      form.append("Price", formData.Price);
      form.append("Description", formData.Description);
      if (formData.Img) {
        form.append("Img", formData.Img);
      }

      if (formData.id) {
        await productServices.updateProduct(formData.id, form, token);
      } else {
        await productServices.createProduct(form, token);
      }

      setFormData({
        id: "",
        Title: "",
        Cat: "",
        Price: "",
        Description: "",
        Img: null,
      });
      setShowModal(false);
      fetchProducts();
    } catch (err) {
      console.error("Error saving product:", err);
      setError("Lỗi khi lưu sản phẩm. Vui lòng kiểm tra lại.");
    }
  };

  const handleAddProductClick = () => {
    setFormData({
      id: "",
      Title: "",
      Cat: "",
      Price: "",
      Description: "",
      Img: null,
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({
      id: "",
      Title: "",
      Cat: "",
      Price: "",
      Description: "",
      Img: null,
    });
    setError("");
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Product Management</h1>
      <button className={styles.addBtn} onClick={handleAddProductClick}>
        Thêm Sản phẩm
      </button>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Cat</th>
            <th>Price</th>
            <th>Description</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(products) &&
            products.map((product, index) => (
              <tr key={product._id}>
                <td>{index + 1}</td>
                <td>{product.Title}</td>
                <td>{product.Cat}</td>
                <td>{product.Price}</td>
                <td>{product.Description}</td>
                <td>
                  {product.Img && (
                    <img
                      src={getImageUrl(product.Img)}
                      alt={product.Title}
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover",
                      }}
                    />
                  )}
                </td>
                <td>
                  <button
                    className={styles.iconBtn}
                    onClick={() => handleEdit(product)}
                  >
                    <FaEdit className={styles.editIcon} />
                  </button>
                  <button
                    className={styles.iconBtn}
                    onClick={() => confirmDelete(product)}
                  >
                    <FaTrash className={styles.deleteIcon} />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Modal Thêm / Cập nhật sản phẩm */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>{formData.id ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}</h2>
            {error && <p className={styles.error}>{error}</p>}

            <form onSubmit={handleSubmit} className={styles.form}>
              <input
                type="text"
                name="Title"
                placeholder="Title"
                value={formData.Title}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="Cat"
                placeholder="Category"
                value={formData.Cat}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="Price"
                placeholder="Price"
                value={formData.Price}
                onChange={handleChange}
                required
              />
              <textarea
                name="Description"
                placeholder="Description"
                value={formData.Description}
                onChange={handleChange}
              />
              <input type="file" name="Img" accept="image/*" onChange={handleChange} />
              <div className={styles.modalButtons}>
                <button type="submit" className={styles.saveBtn}>
                  {formData.id ? "Cập nhật" : "Thêm"}
                </button>
                <button type="button" className={styles.cancelBtn} onClick={closeModal}>
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Xóa sản phẩm */}
      {showDeleteModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Bạn có chắc chắn muốn xóa sản phẩm này không?</h3>
            <p>
              <strong>{productToDelete?.Title}</strong>
            </p>
            <div className={styles.modalButtons}>
              <button className={styles.deleteBtn} onClick={handleDelete}>
                Xóa
              </button>
              <button className={styles.cancelBtn} onClick={cancelDelete}>
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProductPage;
