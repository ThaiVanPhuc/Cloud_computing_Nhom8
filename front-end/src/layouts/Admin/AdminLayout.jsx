import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './AdminLayout.module.scss';

const AdminLayout = ({ children }) => {
    const location = useLocation();

    return (
        <div className={styles.adminLayout}>
            <aside className={styles.sidebar}>
                <h2 className={styles.logo}>Admin Panel</h2>
                <nav className={styles.nav}>
                    <Link
                        to="/admin/users"
                        className={location.pathname === '/admin' ? styles.active : ''}
                    >
                        Task
                    </Link>
                    <Link
                        to="/admin/users"
                        className={location.pathname === '/admin/users' ? styles.active : ''}
                    >
                        Manage User
                    </Link>
                    <Link
                        to="/admin/products"
                        className={location.pathname === '/admin/products' ? styles.active : ''}
                    >
                        Manage Product
                    </Link>
                    <Link
                        to="/admin/news"
                        className={location.pathname === '/admin/news' ? styles.active : ''}
                    >
                        Manage News
                    </Link>
                </nav>
            </aside>

            <main className={styles.content}>
                {children}
            </main>
        </div>
    );
};

export default AdminLayout;
