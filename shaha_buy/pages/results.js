// pages/results.js
import Navbar from '../components/Navbar';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import commonStyles from '../styles/Common.module.css';
import resultsStyles from '../styles/Results.module.css';

export default function Results() {
    const router = useRouter();
    const { query, similar } = router.query;
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (query) {
                setLoading(true);
                setError(null);
                // Decide which endpoint to hit based on the 'similar' parameter
                const endpoint = similar === 'true' ? `http://localhost:8000/search_similar/${query}` : `http://localhost:8000/search/${query}`;
                try {
                    const res = await fetch(endpoint);
                    if (!res.ok) {
                        throw new Error('Failed to fetch data');
                    }
                    let data = await res.json();
                    if (similar === 'true') {
                        data = data.flat(3)
                        data.pop();
                        data.pop();
                    }else{
                        data = data[0]
                    }
                    console.log(data)
                    setResults(data);
                } catch (error) {
                    setError(error.message);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchData();
    }, [query, similar]);

    return (
        <>
        <Navbar />

        <div className={commonStyles.container}>
            <h1>{similar === 'true' ? `Similar Results for "${query}"` : `Results for "${query}"`}</h1>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {!loading && !error && results.length > 0 && (
                <div className={resultsStyles.resultsSection}>
                    <table className={commonStyles.table}>
                        <thead>
                        <tr>
                            <th className={commonStyles.th}>Store</th>
                            <th className={commonStyles.th}>Item</th>
                            <th className={commonStyles.th}>Price(USD)</th>
                            <th className={commonStyles.th}>Link</th>
                        </tr>
                        </thead>
                        <tbody>
                        {results.map((item, index) => (
                            <tr key={index}>
                                <td>{item.site}</td>
                                <td>{item.item}</td>
                                <td>{item.price}</td>
                                <td>
                                    <a href={item.url} target="_blank" rel="noopener noreferrer" className={commonStyles.link}>View</a>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
            {!loading && !error && results.length === 0 && (
                <p>No results found for "{query}". Please try a different search term.</p>
            )}
        </div>
        </>
    );
}
