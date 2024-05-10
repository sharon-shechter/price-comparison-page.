import Navbar from '../components/Navbar';
import styles from '../styles/about.module.css';

export default function AboutPage() {
  return (
    <div className={styles.homeSection}>
      <Navbar />
      <section className={styles.aboutSection}>
        <h1 className={styles.title}>About Us</h1>
        <div className={styles.projectInfo}>
          <h2 className={styles.projectTitle}>Our Story</h2>
          <p className={styles.projectText}>
            This project was developed as part of a university course on Artificial Intelligence. The assignment was to apply our theoretical knowledge to a practical problem, leading to the creation of a price comparison web page for popular online retailers.

            The goal was to develop a tool that would allow users to easily compare prices across various platforms such as Wesbuy, Walmart, and Newegg. This solution aimed to address the common challenge of finding the best deals online, simplifying the shopping process and helping users save money.

            Throughout the project, I focused on both the backend and frontend aspects. The backend involved crafting efficient algorithms to scrape and analyze prices from different websites, while the frontend work ensured that the interface was user-friendly, attractive, and responsive.

            The feedback received upon presenting the price comparison webpage was overwhelmingly positive. Users appreciated the simplicity and effectiveness of the tool, which notably improved their shopping experiences. This project not only allowed me to apply my academic knowledge to a real-world issue but also demonstrated the impact of practical solutions in everyday challenges.
          </p>
          <img src="./images/university-logo.jpg" alt="University Logo" className={styles.universityLogo} />
        </div>
      </section>
    </div>
  );
}
