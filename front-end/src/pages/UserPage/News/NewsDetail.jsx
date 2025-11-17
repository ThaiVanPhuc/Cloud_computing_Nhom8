import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './NewsDetail.module.scss';
import { getImageUrl } from "../../../utils/image";
import httpRequest from '../../../utils/httpRequest';

const NewsDetail = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        const res = await httpRequest.get(`news/${id}`);
        setNews(res.data);
      } catch (err) {
        console.error("Lỗi khi tải chi tiết tin tức:", err);
      }
    };
    fetchNewsDetail();
  }, [id]);

  if (!news) return <div className={styles.loading}>Đang tải...</div>;

  return (
    <div className={styles.detailContainer}>
      <Link to="/news" className={styles.back}>← Quay lại danh sách</Link>

      <h2 className={styles.title}>{news.title}</h2>

      {news.imgStory && (
        <div className={styles.imageWrapper}>
          <img src={getImageUrl(news.imgStory)} alt={news.title} className={styles.image} />
        </div>
      )}

      <p className={styles.content}>{news.content}</p>

      <style>{`
        .${styles.detailContainer} {
          max-width: 900px;
          margin: 40px auto;
          padding: 20px;
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.08);
        }

        .${styles.back} {
          display: inline-block;
          margin-bottom: 20px;
          color: #ff4d6d;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s;
        }

        .${styles.back}:hover {
          color: #e6003e;
        }

        .${styles.title} {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 20px;
          color: #222;
        }

        .${styles.imageWrapper} {
          width: 100%;
          max-height: 400px;
          overflow: hidden;
          border-radius: 16px;
          margin-bottom: 20px;
        }

        .${styles.imageWrapper} img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .${styles.imageWrapper} img:hover {
          transform: scale(1.05);
        }

        .${styles.content} {
          font-size: 1rem;
          line-height: 1.8;
          color: #555;
          white-space: pre-line;
        }

        .${styles.loading} {
          text-align: center;
          font-size: 1.2rem;
          padding: 50px 0;
          color: #999;
        }

        @media (max-width: 768px) {
          .${styles.detailContainer} {
            padding: 15px;
            margin: 20px;
          }
          .${styles.title} {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default NewsDetail;
