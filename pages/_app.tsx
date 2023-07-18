import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import type { AppProps } from 'next/app';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  arbitrum,
  goerli,
  mainnet,
  optimism,
  polygon,
  zora,
} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    polygon,
  ],
  [alchemyProvider({
    apiKey: 'isEFye1FytsrF7PSDPX-pU2DucBQbIsW',
  }),
  // jsonRpcProvider({
  //   rpc: chain => ({
  //     http: `https://polygon-mainnet.g.alchemy.com/v2/isEFye1FytsrF7PSDPX-pU2DucBQbIsW`,
  //   }),
  // }),

  ]
);

const { connectors } = getDefaultWallets({
  appName: 'RainbowKit App',
  projectId: '2223dee4891a6d8e8e98c5975cd5a4be',
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
