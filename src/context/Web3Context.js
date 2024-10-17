import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { createConfig, http, WagmiProvider } from 'wagmi';
import {
    mainnet,
    sepolia,
    polygon,
    arbitrum,
    optimism,
    avalanche,
    fantom,
    gnosis,
    bsc
} from 'wagmi/chains';
import { metaMask } from 'wagmi/connectors';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const chains = [
    mainnet,
    sepolia,
    polygon,
    arbitrum,
    optimism,
    avalanche,
    fantom,
    gnosis,
    bsc
    // Add more chains as needed
];

const config = createConfig({
    chains,
    connectors: [
        metaMask(),
    ],
    transports: chains.reduce((acc, chain) => {
        acc[chain.id] = http();
        return acc;
    }, {}),
});

export function Web3Context({ children }) {
    return (
        <QueryClientProvider client={queryClient}>
            <WagmiProvider config={config}>
                <RainbowKitProvider chains={config.chains}>
                    {children}
                </RainbowKitProvider>
            </WagmiProvider>
        </QueryClientProvider>
    );
}
