import styles from "./AboutUs.module.css"
import aboutUsImg from "../../images/aboutUs.JPG";

const AboutUs = () => {
    return (
      <div id="about-us" className={styles.pageContainer}>
        <div className={styles.card}>
        <img src={aboutUsImg} alt="Povestea noastră" className={styles.photo}/>
        <h1 className={styles.pageTitle}>Gabriela & Silviu </h1>
        <p className={styles.pageContent}>Se pare că dragostea a 
          făcut încă o „victimă” în rândul celor care credeau că 
          sunt prea ocupați pentru a-și găsi jumătatea!
          Am spus „DA”
           unui destin scris de la prima întâlnire, iar acum, 
           după trei ani de iubire intensă, micuța noastră prințesă
            și o mare petrecere se pregătesc să marcheze 
            începutul unui nou capitol!

</p>
           </div>
      </div>
    );
  };
  
  export default AboutUs;
  