import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getAccessToken } from '../services/spotifyLogin';

const SpotifyCallback = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const code = params.get('code');
        const error = params.get('error');

        if (code) {
            console.log("Spotify callback: Found code, authenticating...");
            getAccessToken(code)
                .then(() => {
                    console.log("Spotify auth successful!");
                    navigate('/', { replace: true });
                })
                .catch(err => {
                    console.error("Spotify auth error:", err);
                    navigate('/?error=auth_failed', { replace: true });
                });
        } else if (error) {
            console.error("Spotify auth error from server:", error);
            navigate('/?error=' + error, { replace: true });
        } else {
            navigate('/', { replace: true });
        }
    }, [location, navigate]);

    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '50vh',
            flexDirection: 'column',
            gap: '20px'
        }}>
            <div className="loading-spinner"></div>
            <p>Authenticating with Spotify...</p>
        </div>
    );
};

export default SpotifyCallback;
