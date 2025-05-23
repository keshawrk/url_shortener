import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Notfound = () => {
    const navigate = useNavigate();
    const { slug } = useParams();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/${slug}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();
                if (response.ok && data.longUrl) {
                    window.location.href = data.longUrl; // Redirect to longUrl
                } else {
                    setError(data.message || 'Short URL not found');
                }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (err) {
                setError('An error occurred while fetching the URL');
            }
        };
        fetchData();
    }, [slug]);

    if (!error) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col mt-5 justify-center items-center">
            <h1 className="text-2xl">{error}</h1>
            <Button onClick={() => navigate('/')}>Go Back</Button>
        </div>
    );
};

export default Notfound;