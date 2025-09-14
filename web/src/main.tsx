import React from 'react'
import ReactDOM from 'react-dom/client'
import { createConfig, http, WagmiProvider } from 'wagmi'
import { polygonAmoy } from 'wagmi/chains'
import { injected } from '@wagmi/connectors'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App.tsx'
import './index.css'

const config = createConfig({
	chains: [polygonAmoy],
	transports: { [polygonAmoy.id]: http() },
	connectors: [injected()]
})

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<WagmiProvider config={config}>
			<QueryClientProvider client={queryClient}>
				<App />
			</QueryClientProvider>
		</WagmiProvider>
	</React.StrictMode>,
)
