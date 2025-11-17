import React, { useEffect, useState } from 'react';
import httpRequest from '../../../utils/httpRequest';
import { Link } from 'react-router-dom';
import styles from './News.module.scss';
import { getImageUrl } from "../../../utils/image";

const NewsList = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await httpRequest.get("news");
        setNews(res.data.news);
      } catch (err) {
        console.error("Lỗi khi tải tin tức:", err);
      }
    };
    fetchNews();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>📰 Tin tức mới nhất</h2>
      <div className={styles.list}>
        {Array.isArray(news) && news.map(item => (
          <Link to={`/news/${item._id}`} className={styles.card} key={item._id}>
            <div className={styles.cardInner}>
              <div className={styles.imageWrapper}>
                {item.image && <img src={item.image} alt={item.title} />}
              </div>
              <div className={styles.content}>
                <h3 className={styles.title}>{item.title}</h3>
                <p className={styles.snippet}>{item.content.substring(0, 100)}...</p>
                {item.imgStory && (
                  <img
                    src={getImageUrl(item.imgStory)}
                    alt="story"
                    className={styles.storyImage}
                  />
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <style>{`
        .${styles.container} {
          padding: 40px 20px;
          max-width: 1200px;
          margin: auto;
        }

        .${styles.heading} {
          font-size: 2rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 40px;
          color: #ff4d6d;
        }

        .${styles.list} {
          display: flex;
          flex-wrap: wrap;
          gap: 24px;
          justify-content: flex-start;
        }

        .${styles.card} {
          flex: 1 1 calc(33% - 16px); /* 3 khung trên 1 hàng */
          max-width: 350px;
          display: block;
          background: #fff;
          border-radius: 16px;
          overflow: hidden;
          text-decoration: none;
          color: inherit;
          box-shadow: 0 8px 20px rgba(0,0,0,0.08);
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .${styles.card}:hover {
          transform: translateY(-5px) scale(1.02);
          box-shadow: 0 12px 28px rgba(0,0,0,0.15);
        }

        .${styles.cardInner} {
          display: flex;
          flex-direction: row;
          gap: 16px;
          min-height: 200px;
        }

        .${styles.imageWrapper} {
          flex: 1 1 40%;
          overflow: hidden;
        }

        .${styles.imageWrapper} img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .${styles.card}:hover .${styles.imageWrapper} img {
          transform: scale(1.08);
        }

        .${styles.content} {
          flex: 1 1 60%;
          padding: 16px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 8px;
        }

        .${styles.title} {
          font-size: 1rem;
          font-weight: 600;
          color: #222;
        }

        .${styles.snippet} {
          font-size: 0.875rem;
          color: #555;
          flex-grow: 1;
        }

        .${styles.storyImage} {
          margin-top: 10px;
          border-radius: 12px;
          width: 100%;
          height: 80px;
          object-fit: cover;
        }

        @media (max-width: 1024px) {
          .${styles.card} {
            flex: 1 1 calc(50% - 16px); /* 2 khung trên 1 hàng */
          }
        }

        @media (max-width: 768px) {
          .${styles.cardInner} {
            flex-direction: column;
          }
          .${styles.card} {
            flex: 1 1 100%;
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default NewsList;
