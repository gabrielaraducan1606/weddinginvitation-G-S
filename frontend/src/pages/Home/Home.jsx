import styles from "./Home.module.css";
import { Helmet } from "react-helmet";


const Home = () => {
  return (
    <div id="home" className={styles.pageContainer}>
      <div className={styles.overlay}></div>
      <Helmet>
        <title>Gabriela & Silviu - Acasă</title>
      </Helmet>
      <h1 className={styles.pageTitle}>Gabriela & Silviu</h1>
      <p className={styles.pageContent}>17 Mai 2025 - Buzău, România</p>
      <svg
          width="20"
          height="20"
          fill="currentColor"
          className={styles.iconHeart}
        >
          <use xlinkHref="#icon-logo-heart" />
        </svg>
    </div>
  );
};

export default Home;
