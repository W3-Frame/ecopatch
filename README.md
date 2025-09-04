# 🌱 EcoPatch – ReFi Hackathon Project (ETHAccra 2025)

**Tagline:**  
👉 “Invest in the land. Grow the future.”  

EcoPatch is a **Regenerative Finance (ReFi)** platform that enables ecological restoration in Africa through **NFT land patches**.  
Each patch is represented as an NFT, generating **carbon credits redistributed** to holders while directly supporting local communities.  


## ✨ Features

- 🎋 **Tokenized ecological zones** → Fractionalized into **NFTs (ERC-721)**  
- 💧 **Decentralized funding pool** → Users co-finance projects  
- 🌍 **Carbon credits redistribution** → Proportional to NFTs held  
- 🛒 **Built-in marketplace** → Buy & sell tokenized land patches  
- 📊 **Admin & User Dashboard** → Manage projects, track impact, claim rewards  


## 🧩 User Flow

1. **Admin** creates a zone (location, description, number of patches)  
2. The zone is **fractionalized into NFTs** representing patches  
3. **Users purchase NFTs** directly or via a funding pool  
4. Once funding is reached → NFTs are **auto-minted**  
5. **Carbon credits** generated are redistributed to holders  
6. NFTs can be **resold** on the marketplace  


## 🛠️ Tech Stack

- **Smart Contracts** → Solidity, Hardhat, Remix  
- **Frontend & Dashboard** → [Scaffold-ETH 2](https://github.com/scaffold-eth/scaffold-eth-2) (Next.js + Wagmi + RainbowKit)  
- **Blockchain** → Ethereum Testnet (**Base Sepolia**)  
- **NFT Standard** → ERC-721  
- **Storage** → IPFS / Filecoin (metadata, ecological reports)  
- **Identity** → ENS for projects & communities  


## 📦 Installation

### 1. Clone the repo
```bash
git clone https://github.com/W3-Frame/ecopatch
cd ecopatch
````

### 2. Install dependencies

```bash
cd frontend
yarn install
```

### 3. Run the app locally

```bash
yarn dev
```

App will run at [http://localhost:3000](http://localhost:3000) 🌍

### 4. Deploy smart contracts (Hardhat)

```bash
cd contracts
npx hardhat compile
npx hardhat deploy --network base-sepolia
```


## 📊 Smart Contracts

* **EcoPatchNFT.sol** → Manages tokenized land patches (ERC-721)
* **EcoPatchPool.sol** → Funding pool & redistribution logic
* **EcoPatchAdmin.sol** → Zone creation & project management


## 🎥 Demo

* **Pitch Deck (PDF)** → \[Insert link]
* **Demo Video (≤4 min)** → \[Insert Loom/YouTube link]
* **Screenshots**

  * Admin Dashboard
  * Minted NFT Patch
  * Marketplace (mock)


## 🏆 Targeted Bounties

* 🌱 **DeFi & ReFi Track** → regenerative finance use case
* 🧑‍💻 **BuidlGuidl** → Scaffold-ETH MVP
* 🔗 **Base** → Deployed on Base Sepolia
* 🪪 **ENS** → Project & community identity
* 🗄 **Filecoin** → Ecological data storage


## 🚀 Roadmap

* ✅ **Hackathon MVP** : NFT + Pool contract + Dashboard
* 🔜 **Phase 2** : ENS + Filecoin + Chainlink Oracles
* 🔜 **Phase 3** : Official carbon credits certification + full marketplace
* 🔜 **Phase 4** : Multi-country Africa rollout + NGO partnerships


## 👥 Team

* **Solidity Dev & Team Lead** → Hermann
* **Product & Solidity Dev** → Laboré
* **Frontend** → Georginio
* **Design & Branding** → Zeus


## 🤝 Contribution

We welcome contributions!

1. Fork the repo
2. Create a branch (`git checkout -b feature/my-feature`)
3. Commit (`git commit -m 'add my feature'`)
4. Push (`git push origin feature/my-feature`)
5. Open a Pull Request


## 📜 License

MIT License © 2025 EcoPatch Team
