import { useEffect, useState } from "react";
import styles from "./New.module.scss";
import * as newsServices from "../../../services/newServices";
import { getImageUrl } from "../../../utils/image";
import { FaEdit, FaTrash, FaImage } from "react-icons/fa";

const AdminNewsPage = () => {
    const [newsList, setNewsList] = useState([]);
    const [formData, setFormData] = useState({
        id: "",
        title: "",
        content: "",
        imgStory: null,
    });
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [newsToDelete, setNewsToDelete] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchNews = async () => {
        try {
            const res = await newsServices.getAllNews(page, 5);
            setNewsList(res.news);
            setTotalPages(res.totalPages || 1);
        } catch (error) {
            console.error("Error fetching news:", error);
        }
    };

    useEffect(() => {
        fetchNews();
    }, [page]);

    const confirmDelete = (news) => {
        setNewsToDelete(news);
        setShowDeleteModal(true);
    };

    const handleDelete = async () => {
        try {
            await newsServices.deleteNew(newsToDelete._id);
            setShowDeleteModal(false);
            setNewsToDelete(null);
            fetchNews();
        } catch (error) {
            console.error("Error deleting news:", error);
        }
    };

    const cancelDelete = () => {
        setNewsToDelete(null);
        setShowDeleteModal(false);
    };

    const handleEdit = (news) => {
        setFormData({
            id: news._id,
            title: news.title,
            content: news.content,
            imgStory: null,
        });
        setShowModal(true);
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "imgStory") {
            setFormData((prev) => ({ ...prev, imgStory: files[0] }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const submitData = new FormData();
            submitData.append("title", formData.title);
            submitData.append("content", formData.content);
            if (formData.imgStory) {
                submitData.append("imgStory", formData.imgStory);
            }

            if (formData.id) {
                await newsServices.updateNew(formData.id, submitData);
            } else {
                await newsServices.createNew(submitData);
            }

            setFormData({
                id: "",
                title: "",
                content: "",
                imgStory: null,
            });
            setShowModal(false);
            fetchNews();
        } catch (error) {
            console.error("Error saving news:", error);
            setError("Lỗi khi lưu bài viết. Vui lòng kiểm tra lại.");
        }
    };

    const handleAddClick = () => {
        setFormData({
            id: "",
            title: "",
            content: "",
            imgStory: null,
        });
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setFormData({
            id: "",
            title: "",
            content: "",
            imgStory: null,
        });
        setError("");
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>News Management</h1>
                <button className={styles.addBtn} onClick={handleAddClick}>
                    Thêm bài viết
                </button>
            </div>

            {/* Card Grid Layout */}
            <div className={styles.newsGrid}>
                {newsList.map((item, index) => (
                    <div key={item._id} className={styles.newsCard}>
                        <div className={styles.newsImage}>
                            {item.imgStory ? (
                                <img src={getImageUrl(item.imgStory)} alt={item.title} />
                            ) : (
                                <div className={styles.noImage}>
                                    <FaImage />
                                </div>
                            )}
                        </div>
                        
                        <div className={styles.newsContent}>
                            <span className={styles.newsNumber}>#{(page - 1) * 5 + index + 1}</span>
                            <h3 className={styles.newsTitle}>{item.title}</h3>
                            <p className={styles.newsText}>{item.content}</p>
                            <p className={styles.newsDate}>
                                {new Date(item.createdAt).toLocaleDateString('vi-VN')}
                            </p>
                        </div>

                        <div className={styles.cardActions}>
                            <button className={styles.editBtn} onClick={() => handleEdit(item)}>
                                <FaEdit /> Sửa
                            </button>
                            <button className={styles.deleteBtn} onClick={() => confirmDelete(item)}>
                                <FaTrash /> Xóa
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.pagination}>
                <button disabled={page === 1} onClick={() => setPage(page - 1)}>&laquo; Prev</button>
                <span>Trang {page} / {totalPages}</span>
                <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next &raquo;</button>
            </div>

            {showModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <h2>{formData.id ? "Cập nhật bài viết" : "Thêm bài viết"}</h2>
                        {error && <p className={styles.error}>{error}</p>}
                       <form onSubmit={handleSubmit} className={styles.form}>
    <input
        type="text"
        name="title"
        placeholder="Tiêu đề"
        value={formData.title}
        onChange={handleChange}
        required
    />
    <textarea
        name="content"
        placeholder="Nội dung"
        value={formData.content}
        onChange={handleChange}
        required
    />
    <input
        type="file"
        name="imgStory"
        accept="image/*"
        onChange={handleChange}
        required={!formData.id}
    />

    {/* Hiển thị preview ảnh nếu có */}
    {formData.imgStory && (
        <div className={styles.imagePreview}>
            <img
                src={formData.imgStory instanceof File ? URL.createObjectURL(formData.imgStory) : getImageUrl(formData.imgStory)}
                alt="preview"
            />
        </div>
    )}

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

            {showDeleteModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <h3>Bạn có chắc chắn muốn xóa bài viết này không?</h3>
                        <p><strong>{newsToDelete?.title}</strong></p>
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

export default AdminNewsPage;