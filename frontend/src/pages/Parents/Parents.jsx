import styles from './Parents.module.css';
import parents from '../../images/SPSL3193.JPG';

const Parents = () => {
    return (
      <div id="parents" className={styles.pageContainer}>
      <div className={styles.card}>
      <img src={parents} alt="parents" className={styles.photo}/>
      <h1 className={styles.pageTitle}>Părinții </h1>
      <p className={styles.pageContent}>Așa cum orice poveste de
         succes are eroi necunoscuți, așa și noi avem părinți 
         care ne-au ghidat pe drumul iubirii. Nicoleta-Luminița și Gheorghe și Steluța și Gheorghe au avut un rol 
         esențial în construirea poveștii noastre de dragoste.

</p>
         </div>
    </div>
    );
  };
  
  export default Parents;
  