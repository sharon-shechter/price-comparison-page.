import Navbar from '../components/Navbar';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from '../styles/Home.module.css';

export default function Home() {
    const [query, setQuery] = useState('');
    const router = useRouter();

    const handleSearch = async (event) => {
        event.preventDefault();
        await router.push(`/results?query=${encodeURIComponent(query)}`);
    };

    return (
        <div className={styles.homeSection}>
            <Navbar />
            <div className={styles.intro}>
                <h1>Welcome to SHASHA - BUY</h1>
                <p className={styles.description}>
                    Compare prices from different websites and find the best deals for your desired items.
                </p>
                <form onSubmit={handleSearch} className={styles.searchForm}>
                    <input
                        type="text"
                        placeholder="Insert an item name"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className={styles.input}
                    />
                    <button type="submit" className={styles.button}>Search</button>
                </form>
            </div>
        </div>
    );
}
