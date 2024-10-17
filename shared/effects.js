import React, { useState, useEffect } from 'react';
import { getSession } from '../services/apiService';

const sessionEffect = (sessionID) => {

    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSession = async () => {
            try {
                setSession(await getSession(sessionID));
            } catch (err) {
                setError(err.message);
            }
            setLoading(false);
        };

        if (sessionID) {
            fetchSession();
        } else {
            setLoading(false);
        }
    }, [sessionID]);

    return [session, loading, error, setSession, setLoading, setError];
}

export default sessionEffect;