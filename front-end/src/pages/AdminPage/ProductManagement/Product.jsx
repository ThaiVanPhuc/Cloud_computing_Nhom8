import React, { useEffect, useState } from "react";
import styles from "./Products.module.scss";
import { getImageUrl } from "../../../utils/image";
import * as productServices from "../../../services/productServices";

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

    const fetchProducts = async () => {
        try {
            const data = await productServices.getAllProducts();
            
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem("token");
            await productServices.deleteProduct(id, token);
            fetchProducts();
        } catch (error) {
            console.error("Error deleting product:", error);
        }
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
            if (formData.id) {
                const updateData = {
                    Title: formData.Title,
                    Cat: formData.Cat,
                    Price: formData.Price,
                    Description: formData.Description,
                };
                if (formData.Img) {
                    updateData.Img = formData.Img;
                }
                await productServices.updateProduct(formData.id, updateData, token);
            } else {
                await productServices.createProduct(formData, token);
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
        } catch (error) {
            console.error("Error saving product:", error);
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
                                            style={{ width: "60px", height: "60px", objectFit: "cover" }}
                                        />
                                    )}
                                </td>
                                <td>
                                    <button
                                        className={styles.editBtn}
                                        onClick={() => handleEdit(product)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className={styles.deleteBtn}
                                        onClick={() => handleDelete(product._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>

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
                            <input
                                type="file"
                                name="Img"
                                accept="image/*"
                                onChange={handleChange}
                            />
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
        </div>
    );
};

export default AdminProductPage;
