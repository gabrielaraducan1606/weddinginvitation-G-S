import styles from './GodParents.module.css';
import GodparentsPhoto from '../../images/godParents.JPG';

const GodParents = () => {
    return (
      <div id="godparents" className={styles.pageContainer}>
      <div className={styles.card}>
      <img src={GodparentsPhoto} alt="Nasi" className={styles.photo}/>
      <h4 className={styles.subtitle}>Nașii</h4>
      <h1 className={styles.pageTitle}>Flavia & Ionuț </h1>
      <p className={styles.pageContent}>Iar ca să fie totul 
        oficial, avem și o poveste de prietenie cu tradiție!
         Ionuț și Silviu sunt prieteni
          buni de mulți ani, iar acum 13 ani, nașul a făcut
           o promisiune… în scris! „Promit că voi fi nașul tău!”
            Da, ai citit bine, a fost un contract semnat! Și 
            cine se aștepta că, în timp, și soțiile lor să devină
             prietene bune și să transforme nunta într-un 
             eveniment legendar?! 

</p>
         </div>
    </div>
    );
  };
  
  export default GodParents;
  