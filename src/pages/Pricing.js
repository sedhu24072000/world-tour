// Uses the same styles as Product
import styles from "./Product.module.css";
import PageNav from './pageNav'
import img2 from '../assets/img-2.jpg'

export default function Product() {
  return (
    
    <main className={styles.product}>
    <PageNav></PageNav>
      <section>
        <div>
          <h2>
            Simple pricing.
            <br />
            Just $9/month.
          </h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae vel
            labore mollitia iusto. Recusandae quos provident, laboriosam fugit
            voluptatem iste.
          </p>
        </div>
        <img src={img2} alt="overview of a large city with skyscrapers" />
      </section>
    </main>
  );
}
