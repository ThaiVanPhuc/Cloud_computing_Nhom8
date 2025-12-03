import React, { useEffect, useState } from "react";
import styles from "./Products.module.scss";
import { getImageUrl } from "../../../utils/image";
import * as productServices from "../../../services/productServices";
import { FaEdit, FaTrash, FaImage } from "react-icons/fa";

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
  const [imagePreview, setImagePreview] = useState(null);
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
    // Set preview to existing image
    if (product.Img) {
      setImagePreview(getImageUrl(product.Img));
    }
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "Img") {
      const file = files[0];
      setFormData((prev) => ({ ...prev, Img: file }));
      
      // Create preview URL
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
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
      if (formData.Img) form.append("Img", formData.Img);

      if (formData.id) await productServices.updateProduct(formData.id, form, token);
      else await productServices.createProduct(form, token);

      setFormData({ id: "", Title: "", Cat: "", Price: "", Description: "", Img: null });
      setImagePreview(null);
      setShowModal(false);
      fetchProducts();
    } catch (err) {
      console.error("Error saving product:", err);
      setError("Lỗi khi lưu sản phẩm. Vui lòng kiểm tra lại.");
    }
  };

  const handleAddProductClick = () => {
    setFormData({ id: "", Title: "", Cat: "", Price: "", Description: "", Img: null });
    setImagePreview(null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({ id: "", Title: "", Cat: "", Price: "", Description: "", Img: null });
    setImagePreview(null);
    setError("");
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Product Management</h1>
        <button className={styles.addBtn} onClick={handleAddProductClick}>
          Thêm Sản phẩm
        </button>
      </div>

      {/* Grid sản phẩm */}
      <div className={styles.productGrid}>
        {products.map((product) => (
          <div key={product._id} className={styles.productCard}>
            <div className={styles.imgWrapper}>
              {product.Img && (
                <img src={getImageUrl(product.Img)} alt={product.Title} />
              )}
            </div>
            <div className={styles.productInfo}>
              <h3>{product.Title}</h3>
              <p className={styles.cat}>{product.Cat}</p>
              <p className={styles.price}>{product.Price} VND</p>
            </div>
            <div className={styles.cardActions}>
              <button onClick={() => handleEdit(product)} className={styles.editBtn}>
                <FaEdit />
              </button>
              <button onClick={() => confirmDelete(product)} className={styles.deleteBtn}>
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal thêm/cập nhật */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>{formData.id ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}</h2>
            {error && <p className={styles.error}>{error}</p>}
            
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formLeft}>
                <input type="text" name="Title" placeholder="Tên sản phẩm" value={formData.Title} onChange={handleChange} required />
                <input type="text" name="Cat" placeholder="Danh mục" value={formData.Cat} onChange={handleChange} required />
                <input type="text" name="Price" placeholder="Giá (VND)" value={formData.Price} onChange={handleChange} required />
                <textarea name="Description" placeholder="Mô tả sản phẩm" value={formData.Description} onChange={handleChange} />
                <input type="file" name="Img" accept="image/*" onChange={handleChange} />
              </div>

              <div className={styles.formRight}>
                <div className={styles.imagePreviewBox}>
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" />
                  ) : (
                    <div className={styles.placeholder}>
                      <FaImage />
                      <p>Xem trước hình ảnh</p>
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.modalButtons}>
                <button type="submit" className={styles.saveBtn}>{formData.id ? "Cập nhật" : "Thêm"}</button>
                <button type="button" className={styles.cancelBtn} onClick={closeModal}>Hủy</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal xóa */}
      {showDeleteModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Bạn có chắc chắn muốn xóa sản phẩm này không?</h3>
            <p><strong>{productToDelete?.Title}</strong></p>
            <div className={styles.modalButtons}>
              <button className={styles.deleteBtn} onClick={handleDelete}>Xóa</button>
              <button className={styles.cancelBtn} onClick={cancelDelete}>Hủy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProductPage;