
import navbarStyles from '../styles/Navbar.module.css'; // Import navbar styles

export default function Navbar() {
    return (
        <nav className={navbarStyles.navbar}>
            <div className={navbarStyles.navLogo}>
                    <img src="/images/logo.png" alt="logo" className={navbarStyles.logo}/>
            </div>
            <div>
                <a href="/" className={navbarStyles.navItem}>Home</a>
                <a href="/about" className={navbarStyles.navItem}>About</a>
                <a href="/contact" className={navbarStyles.navItem}>Contact</a>
            </div>
        </nav>
    );
}
