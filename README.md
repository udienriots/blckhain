E-Voting Monorepo

Structure
- blockchain: Hardhat + Voting.sol (Polygon Amoy)
- server: Express + MySQL + JWT + ethers
- web: Vite + React + wagmi (wallet connect)

Setup
1) Blockchain
- cd blockchain
- create .env with AMOY_RPC_URL, PRIVATE_KEY, POLYGONSCAN_API_KEY
- npx hardhat compile
- npx hardhat run scripts/deploy.ts --network amoy → copy contract address

2) Server
- cd server
- copy .env.example to .env and fill DB + RPC + PRIVATE_KEY + VOTING_CONTRACT_ADDRESS
- npm run build && npm start

3) Web
- cd web
- npm run dev → http://localhost:5173

Admin
- Create admin: npx ts-node src/scripts/createAdmin.ts admin@example.com password
- Login on web, add candidates, start/close voting

Voter
- Login, connect MetaMask (Amoy), choose candidate, vote
