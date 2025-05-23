import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

const Home = () => {
    const [url, setUrl] = useState<string>('');
    const [customUrl, setCustomUrl] = useState<string>('');
    const [shortUrl, setShortUrl] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const handleShortenUrl = async () => {
        setError(null); // Reset error state
        try {
            const response = await fetch('http://localhost:8000/api/shorten', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    longUrl: url,
                    custom: customUrl,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                setShortUrl(data.shortUrl);
            } else {
                setError(data.message || 'Failed to shorten URL');
            }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            setError('An error occurred while shortening the URL');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center mt-5 gap-5">
            <Input
                className="mt-10 w-1/2 border-black text-black p-2"
                placeholder="Type Your URL To Be Shortened"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
            />
            <Input
                className="mt-2 w-1/2 border-black text-black p-2"
                placeholder="Type Custom URL (Optional)"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
            />
            <Button onClick={handleShortenUrl}>Shorten URL</Button>
            {shortUrl && <p>Shortened URL: <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a></p>}
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
};

export default Home;