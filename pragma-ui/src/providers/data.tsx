import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const DataContext = createContext({});

const dataSources = {
    testnet: '/api/onchain?network=testnet',
    mainnet: '/api/onchain?network=mainnet',
    offchain: '/api/proxy',
};

export const DataProvider = ({ children }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [source, setSource] = useState('testnet');  // Default source

    const fetchData = useCallback(async (source) => {
        try {
            setLoading(true);
            const response = await fetch(dataSources[source]);
            const result = await response.json();
            setData(result);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData(source);
    }, [source, fetchData]);

    const switchSource = (newSource) => {
        if (dataSources[newSource]) {
            setSource(newSource);
        } else {
            console.error('Invalid data source');
        }
    };

    return (
        <DataContext.Provider value={{ data, loading, error, switchSource, currentSource: source }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);
