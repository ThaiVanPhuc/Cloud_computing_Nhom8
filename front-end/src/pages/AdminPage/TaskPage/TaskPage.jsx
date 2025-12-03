import React, { useEffect, useState } from "react";
import { FiPackage, FiDollarSign, FiTrendingDown, FiTrendingUp } from "react-icons/fi";

const TaskPage = () => {
    const [orders, setOrders] = useState([]);
    const [bubbles, setBubbles] = useState([]);

    useEffect(() => {
        setOrders([
            { id: 1, customer: "Nguyễn Văn A", total: 6899976, fee: 0, profit: 6899976, platform: "Lazada", shop: "Lona Official Store", orders: 31 },
            { id: 2, customer: "Lê Văn C", total: 4320230, fee: 646676, profit: 3673554, platform: "Lazada", shop: "Lona Tech", orders: 50 },
            { id: 3, customer: "Trần Thị B", total: 1358000, fee: 210034, profit: 1147966, platform: "Shopee", shop: "Lonatech Official", orders: 13 },
            { id: 4, customer: "TikTok User", total: 174000, fee: 4959, profit: 169041, platform: "TikTok", shop: "LonaTech", orders: 2 },
        ]);

        // Generate bubbles
        const generateBubbles = () => {
            const newBubbles = [];
            for (let i = 0; i < 15; i++) {
                newBubbles.push({
                    id: i,
                    size: Math.random() * 60 + 20,
                    left: Math.random() * 100,
                    delay: Math.random() * 5,
                    duration: Math.random() * 10 + 10
                });
            }
            setBubbles(newBubbles);
        };
        generateBubbles();
    }, []);

    const getPlatformColor = (platform) => {
        switch (platform.toLowerCase()) {
            case 'lazada': return '#0F1C87';
            case 'shopee': return '#EE4D2D';
            case 'tiktok': return '#000000';
            default: return '#6366f1';
        }
    };

    return (
        <div style={styles.container}>
            {/* Animated Bubbles Background */}
            <div style={styles.bubblesContainer}>
                {bubbles.map((bubble) => (
                    <div
                        key={bubble.id}
                        style={{
                            ...styles.bubble,
                            width: `${bubble.size}px`,
                            height: `${bubble.size}px`,
                            left: `${bubble.left}%`,
                            animationDelay: `${bubble.delay}s`,
                            animationDuration: `${bubble.duration}s`
                        }}
                    />
                ))}
            </div>

            <div style={styles.content}>
                <h2 style={styles.pageTitle}>
                    <span style={styles.titleGradient}>Báo cáo tài chính sàn</span>
                </h2>

                {/* Summary Cards */}
                <div style={styles.summaryGrid}>
                    <div style={styles.card}>
                        <div style={{...styles.iconBox, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
                            <FiPackage size={24} color="#fff" />
                        </div>
                        <p style={styles.cardLabel}>Số đơn</p>
                        <p style={styles.cardValue}>96</p>
                        <span style={styles.cardDown}>-63%</span>
                    </div>

                    <div style={styles.card}>
                        <div style={{...styles.iconBox, background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'}}>
                            <FiDollarSign size={24} color="#fff" />
                        </div>
                        <p style={styles.cardLabel}>Doanh thu</p>
                        <p style={styles.cardValue}>12.752.206</p>
                        <span style={styles.cardDown}>-47%</span>
                    </div>

                    <div style={styles.card}>
                        <div style={{...styles.iconBox, background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'}}>
                            <FiTrendingDown size={24} color="#fff" />
                        </div>
                        <p style={styles.cardLabel}>Chi phí</p>
                        <p style={styles.cardValue}>861.669</p>
                        <span style={styles.cardDown}>-68%</span>
                    </div>

                    <div style={styles.card}>
                        <div style={{...styles.iconBox, background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'}}>
                            <FiTrendingUp size={24} color="#fff" />
                        </div>
                        <p style={styles.cardLabel}>Lợi nhuận</p>
                        <p style={styles.cardValue}>11.890.537</p>
                        <span style={styles.cardDown}>-45%</span>
                    </div>
                </div>

                {/* Filters */}
                <div style={styles.filterBar}>
                    <select style={styles.select}>
                        <option>Theo ngày tạo</option>
                        <option>Hôm nay</option>
                        <option>7 ngày</option>
                        <option>30 ngày</option>
                    </select>

                    <select style={styles.select}>
                        <option>- Sàn -</option>
                        <option>Lazada</option>
                        <option>Shopee</option>
                        <option>TikTok</option>
                    </select>

                    <select style={styles.select}>
                        <option>Gian hàng</option>
                        <option>Lona Official Store</option>
                        <option>LonaTech</option>
                    </select>
                </div>

                <h3 style={styles.tableTitle}>Lợi nhuận chi tiết</h3>

                <div style={styles.tableWrapper}>
                    <table style={styles.table}>
                        <thead>
                            <tr style={styles.tableHeaderRow}>
                                <th style={styles.th}>Sàn TMĐT</th>
                                <th style={styles.th}>Shop ID | Tên gian hàng</th>
                                <th style={styles.th}>Tổng đơn</th>
                                <th style={styles.th}>Doanh thu</th>
                                <th style={styles.th}>Phí trả sàn</th>
                                <th style={styles.th}>Lợi nhuận</th>
                            </tr>
                        </thead>

                        <tbody>
                            {orders.map((item) => (
                                <tr key={item.id} style={styles.tableRow}>
                                    <td style={styles.td}>
                                        <span style={{
                                            ...styles.platform,
                                            backgroundColor: getPlatformColor(item.platform),
                                        }}>
                                            {item.platform}
                                        </span>
                                    </td>
                                    <td style={styles.td}>{item.shop}</td>
                                    <td style={styles.td}>{item.orders}</td>
                                    <td style={styles.td}>{item.total.toLocaleString()}</td>
                                    <td style={styles.td}>{item.fee.toLocaleString()}</td>
                                    <td style={{...styles.td, color: '#10b981', fontWeight: '600'}}>
                                        {item.profit.toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <style>{keyframes}</style>
        </div>
    );
};

const styles = {
    container: {
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '40px 20px',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
    bubblesContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        zIndex: 1,
    },
    bubble: {
        position: 'absolute',
        bottom: '-100px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '50%',
        animation: 'rise 15s infinite ease-in',
        backdropFilter: 'blur(2px)',
        boxShadow: '0 8px 32px rgba(255, 255, 255, 0.1)',
    },
    content: {
        position: 'relative',
        zIndex: 2,
        maxWidth: '1400px',
        margin: '0 auto',
    },
    pageTitle: {
        fontSize: '42px',
        fontWeight: '800',
        textAlign: 'center',
        marginBottom: '40px',
    },
    titleGradient: {
        background: 'linear-gradient(to right, #fff, #f0f0f0)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        textShadow: '0 4px 20px rgba(0,0,0,0.1)',
    },
    summaryGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '24px',
        marginBottom: '40px',
    },
    card: {
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        padding: '30px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        position: 'relative',
        overflow: 'hidden',
    },
    iconBox: {
        width: '60px',
        height: '60px',
        borderRadius: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '16px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
    },
    cardLabel: {
        fontSize: '14px',
        color: '#64748b',
        marginBottom: '8px',
        fontWeight: '500',
    },
    cardValue: {
        fontSize: '32px',
        fontWeight: '800',
        color: '#1e293b',
        marginBottom: '8px',
    },
    cardDown: {
        color: '#ef4444',
        fontSize: '14px',
        fontWeight: '600',
    },
    filterBar: {
        display: 'flex',
        gap: '16px',
        marginBottom: '30px',
        flexWrap: 'wrap',
    },
    select: {
        padding: '12px 20px',
        borderRadius: '12px',
        border: 'none',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        color: '#1e293b',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
        outline: 'none',
        transition: 'all 0.3s ease',
    },
    tableTitle: {
        fontSize: '24px',
        fontWeight: '700',
        color: '#fff',
        marginBottom: '20px',
        textShadow: '0 2px 10px rgba(0,0,0,0.2)',
    },
    tableWrapper: {
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    tableHeaderRow: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    th: {
        padding: '20px',
        textAlign: 'left',
        fontWeight: '600',
        fontSize: '14px',
        color: '#fff',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
    },
    tableRow: {
        borderBottom: '1px solid #e2e8f0',
        transition: 'all 0.3s ease',
    },
    td: {
        padding: '20px',
        fontSize: '15px',
        color: '#334155',
        fontWeight: '500',
    },
    platform: {
        padding: '6px 16px',
        borderRadius: '20px',
        color: '#fff',
        fontSize: '13px',
        fontWeight: '600',
        display: 'inline-block',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    },
};

const keyframes = `
    @keyframes rise {
        0% {
            bottom: -100px;
            opacity: 0;
            transform: translateX(0) scale(0.8);
        }
        10% {
            opacity: 0.3;
        }
        50% {
            opacity: 0.4;
        }
        100% {
            bottom: 110%;
            opacity: 0;
            transform: translateX(${Math.random() * 200 - 100}px) scale(1.2);
        }
    }
    
    @media (hover: hover) {
        .card:hover {
            transform: translateY(-8px);
            box-shadow: 0 25px 70px rgba(0, 0, 0, 0.2);
        }
        .select:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        }
        tr:hover {
            background-color: rgba(102, 126, 234, 0.05);
        }
    }
`;

export default TaskPage;