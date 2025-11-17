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

            <div className={styles.content}>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.snippet}>{item.content.substring(0, 80)}...</p>
            </div>

            {item.imgStory && (
                  <img
                    src={getImageUrl(item.imgStory)}
                    alt="story"
                    className={styles.storyImage}
                  />
                )}

          </Link>
        ))}
      </div>
    </div>
  );
};

export default NewsList;
