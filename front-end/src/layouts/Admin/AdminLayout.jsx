import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './AdminLayout.module.scss';
import { FaChartPie, FaUsers, FaBoxOpen, FaNewspaper, FaSignOutAlt, FaClipboardList } from "react-icons/fa";

const AdminLayout = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className={styles.adminLayout}>
            <aside className={styles.sidebar}>
                <h2 className={styles.logo}>Admin Panel</h2>
                <nav className={styles.nav}>
                    
                    <Link
                        to="/admin"
                        className={`${styles.navItem} ${location.pathname === '/admin' ? styles.active : ''}`}
                    >
                        <FaChartPie className={styles.icon}/>  Task
                    </Link>

                    <Link
                        to="/admin/users"
                        className={`${styles.navItem} ${location.pathname === '/admin/users' ? styles.active : ''}`}
                    >
                        <FaUsers className={styles.icon}/> Manage User
                    </Link>

                    <Link
                        to="/admin/products"
                        className={`${styles.navItem} ${location.pathname === '/admin/products' ? styles.active : ''}`}
                    >
                        <FaBoxOpen className={styles.icon}/> Manage Product
                    </Link>

                    <Link
                        to="/admin/news"
                        className={`${styles.navItem} ${location.pathname === '/admin/news' ? styles.active : ''}`}
                    >
                        <FaNewspaper className={styles.icon}/> Manage News
                    </Link>
                </nav>

                <button className={styles.logoutBtn} onClick={handleLogout}>
                    <FaSignOutAlt className={styles.icon}/> Logout
                </button>
            </aside>

            <main className={styles.content}>
                {children}
            </main>
        </div>
    );
};

export default AdminLayout;
