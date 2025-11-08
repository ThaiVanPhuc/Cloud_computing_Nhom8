import { useEffect, useState } from "react";
import styles from "./Users.module.scss";
import * as userServices from "../../../services/userServices";

const AdminUserPage = () => {
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({
        id: "",
        username: "",
        email: "",
        password: "",
        role: "user",
    });
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchUsers = async () => {
        try {
            const res = await userServices.getAllUsers(page);
            setUsers(res.users);
            setTotalPages(res.totalPages);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [page]);

    const confirmDelete = (user) => {
        setUserToDelete(user);
        setShowDeleteModal(true);
    };

    const handleDelete = async () => {
        try {
            await userServices.deleteUser(userToDelete._id);
            setShowDeleteModal(false);
            setUserToDelete(null);
            fetchUsers();
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const cancelDelete = () => {
        setUserToDelete(null);
        setShowDeleteModal(false);
    };

    const handleEdit = (user) => {
        setFormData({
            id: user._id,
            username: user.username,
            email: user.email,
            password: "",
            role: user.role,
        });
        setShowModal(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            if (formData.id) {
                const updateData = {
                    username: formData.username,
                    email: formData.email,
                    role: formData.role,
                };
                if (formData.password && formData.password.trim() !== "") {
                    updateData.password = formData.password;
                }
                await userServices.updateUser(formData.id, updateData);
            } else {
                await userServices.createUser(formData);
            }

            setFormData({
                id: "",
                username: "",
                email: "",
                password: "",
                role: "user",
            });
            setShowModal(false);
            fetchUsers();
        } catch (error) {
            console.error("Error saving user:", error);
            setError("Lỗi khi lưu người dùng. Vui lòng kiểm tra lại.");
        }
    };

    const handleAddUserClick = () => {
        setFormData({
            id: "",
            username: "",
            email: "",
            password: "",
            role: "user",
        });
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setFormData({
            id: "",
            username: "",
            email: "",
            password: "",
            role: "user",
        });
        setError("");
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>User Management</h1>
            <button className={styles.addBtn} onClick={handleAddUserClick}>Thêm User</button>

            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user._id}>
                            <td>{(page - 1) * 5 + index + 1}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <button className={styles.editBtn} onClick={() => handleEdit(user)}>Edit</button>
                                <button className={styles.deleteBtn} onClick={() => confirmDelete(user)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className={styles.pagination}>
                <button disabled={page === 1} onClick={() => setPage(page - 1)}>&laquo; Prev</button>
                <span>Trang {page} / {totalPages}</span>
                <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next &raquo;</button>
            </div>

            {showModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <h2>{formData.id ? "Cập nhật người dùng" : "Thêm người dùng"}</h2>
                        {error && <p className={styles.error}>{error}</p>}
                        <form onSubmit={handleSubmit} className={styles.form}>
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder={formData.id ? "Mật khẩu mới (nếu cần thay)" : "Mật khẩu"}
                                value={formData.password}
                                onChange={handleChange}
                                required={!formData.id}
                            />
                            <select name="role" value={formData.role} onChange={handleChange}>
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
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
                        <h3>Bạn có chắc chắn muốn xóa người dùng này không?</h3>
                        <p><strong>{userToDelete?.username}</strong> - {userToDelete?.email}</p>
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

export default AdminUserPage;
