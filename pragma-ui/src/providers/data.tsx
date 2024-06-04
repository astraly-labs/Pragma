import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

type AssetT = {
    ticker: string;
    address: string;
    decimals: number;
};

type DataContextType = {
    assets: AssetT[];
    data: { [ticker: string]: any };
    loading: boolean;
    error: string | null;
    switchSource: (source: string) => void;
    currentSource: string;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

const dataSources = {
    testnet: '/api/onchain?network=testnet',
    mainnet: '/api/onchain?network=mainnet',
    offchain: '/api/proxy',
};

export const initialAssets: AssetT[] = [
    { ticker: "BTC/USD", address: "0x0", decimals: 8 },
    { ticker: "ETH/USD", address: "0x1", decimals: 8 },
    { ticker: "USDC/USD", address: "0x2", decimals: 6 },
    { ticker: "USDT/USD", address: "0x2", decimals: 6 },
    { ticker: "DAI/USD", address: "0x2", decimals: 8 },
];

export const DataProvider = ({ children }: { children: ReactNode }) => {
    const [assets] = useState<AssetT[]>(initialAssets);
    const [data, setData] = useState<{ [ticker: string]: any }>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [source, setSource] = useState('mainnet');

    const fetchData = useCallback(async (source: string) => {
        setLoading(true);
        setError(null);
        const results: { [ticker: string]: any } = {};

        try {
            await Promise.all(assets.map(async (asset) => {
                const response = await fetch(`${dataSources[source]}&pair=${asset.ticker}`);
                if (!response.ok) throw new Error(`Failed to fetch data for ${asset.ticker}`);
                const result = await response.json();
                results[asset.ticker] = result;
            }));
            setData(results);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [assets]);

    useEffect(() => {
        fetchData(source);
    }, [source, fetchData]);

    const switchSource = (newSource: string) => {
        if (dataSources[newSource]) {
            setSource(newSource);
        } else {
            console.error('Invalid data source');
        }
    };

    return (
        <DataContext.Provider value={{ assets, data, loading, error, switchSource, currentSource: source }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};
