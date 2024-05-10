// pages/contact.js
import Navbar from '../components/Navbar';
import styles from '../styles/Contact.module.css';

export default function Contact() {
    return (
            <>
                <Navbar />
            <div className={styles.contact}>  
                <h1 className={styles.heading}>Let's Get in Touch!</h1>
                <p className={styles.intro}>
                    We're here to help and answer any question you might have. We look forward to hearing from you 😊
                </p>
                <div className={styles.contactDetails}>
                    <p><strong>Email:</strong> contact@yourdomain.com</p>
                    <p><strong>Phone:</strong> +123 456 7890</p>
                    <p><strong>Address:</strong> 123 Some Street, City, Country</p>
                </div>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31271.875826263397!2d-0.1276478641161693!3d51.507321516038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4876035159bb13c5%3A0x97528c6653bdf524!2sCentral%20London!5e0!3m2!1sen!2suk!4v1591005472583"
                    width="600"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    aria-hidden="false"
                    tabIndex="0"
                    className={styles.map}
                ></iframe>
            </div>
        </>
    );
}