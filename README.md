# 🌱 EcoPatch – Regenerative Finance Platform

**Tagline:**  
👉 "Invest in the land. Grow the future."  

EcoPatch is a **Regenerative Finance (ReFi)** platform that enables ecological restoration in Africa through **NFT land patches**.  
Each patch is represented as an NFT, generating **carbon credits redistributed** to holders while directly supporting local communities.  

## 📋 Project Structure

```
ecopatch/
├── CONTRIBUTING.md         # Contribution guidelines
├── LICENCE                 # License information
├── README.md               # Project documentation
├── package.json            # Root package configuration
├── packages/
│   ├── hardhat/            # Smart contracts & blockchain interactions
│   │   ├── contracts/      # Solidity smart contracts
│   │   │   ├── CollectionFactory.sol  # Factory for creating NFT collections
│   │   │   ├── NFTCollection.sol      # ERC-721 implementation
│   │   │   └── SE2NFT.sol             # Base NFT contract
│   │   ├── deploy/         # Deployment scripts
│   │   │   ├── 01_deploy_se2_nft.ts
│   │   │   ├── 02_deploy_collection_factory.ts
│   │   │   └── 03_deploy_nft_collection.ts
│   │   ├── scripts/        # Utility scripts
│   │   │   ├── generateAccount.ts
│   │   │   ├── generateTsAbis.ts
│   │   │   └── ...
│   │   ├── test/           # Contract tests
│   │   ├── eslint.config.mjs
│   │   ├── hardhat.config.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── landing/            # Landing page (Vue.js)
│   │   ├── public/         # Static assets
│   │   │   ├── favicon.ico
│   │   │   ├── vector1.png
│   │   │   ├── vector2.png
│   │   │   └── ...
│   │   ├── src/            # Source code
│   │   │   ├── component/  # Vue components
│   │   │   │   ├── CallToActionSection.vue
│   │   │   │   ├── FaqSection.vue
│   │   │   │   ├── FeaturesSection.vue
│   │   │   │   ├── Footer.vue
│   │   │   │   ├── HeroSection.vue
│   │   │   │   ├── InpactSection.vue
│   │   │   │   ├── NavBar.vue
│   │   │   │   ├── TestimonialsSection.vue
│   │   │   │   └── TypeSection.vue
│   │   │   ├── App.vue     # Main Vue app
│   │   │   ├── index.css   # Global styles
│   │   │   └── main.ts     # Entry point
│   │   ├── env.d.ts
│   │   ├── eslint.config.ts
│   │   ├── index.html
│   │   ├── package.json
│   │   ├── postcss.config.js
│   │   ├── tailwind.config.js
│   │   ├── tsconfig.app.json
│   │   ├── tsconfig.json
│   │   ├── tsconfig.node.json
│   │   └── vite.config.ts
│   └── nextjs/             # Main application (Next.js)
│       ├── app/            # Next.js app directory
│       │   ├── blockexplorer/  # Block explorer features
│       │   │   ├── _components/
│       │   │   ├── address/
│       │   │   ├── transaction/
│       │   │   ├── layout.tsx
│       │   │   └── page.tsx
│       │   ├── debug/          # Debugging tools
│       │   │   ├── _components/
│       │   │   └── page.tsx
│       │   ├── erc721/         # NFT interactions
│       │   │   ├── components/
│       │   │   └── page.tsx
│       │   ├── layout.tsx
│       │   ├── not-found.tsx
│       │   └── page.tsx
│       ├── components/     # React components
│       │   ├── Footer.tsx
│       │   ├── Header.tsx
│       │   ├── scaffold-eth/
│       │   └── ...
│       ├── contracts/      # Contract ABIs and addresses
│       ├── hooks/          # Custom React hooks
│       ├── public/         # Static assets
│       ├── services/       # Service layer
│       ├── styles/         # CSS styles
│       ├── types/          # TypeScript type definitions
│       ├── utils/          # Utility functions
│       ├── eslint.config.mjs
│       ├── next.config.ts
│       ├── package.json
│       ├── postcss.config.js
│       ├── scaffold.config.ts
│       ├── tsconfig.json
│       └── vercel.json
```

 **EcoPath LandingPage** → [LandingPage](https://ecopathlanding.netlify.app/)

## ✨ Features

- 🎋 **Tokenized ecological zones** → Fractionalized into **NFTs (ERC-721)**  
- 💧 **Decentralized funding pool** → Users co-finance projects  
- 🌍 **Carbon credits redistribution** → Proportional to NFTs held  
- 🛒 **Built-in marketplace** → Buy & sell tokenized land patches  
- 📊 **Admin & User Dashboard** → Manage projects, track impact, claim rewards  
- 🖼️ **Attractive landing page** → Showcasing project features and impact


## 🧩 User Flow

1. **Admin** creates a zone (location, description, number of patches)  
2. The zone is **fractionalized into NFTs** representing patches  
3. **Users purchase NFTs** directly or via a funding pool  
4. Once funding is reached → NFTs are **auto-minted**  
5. **Carbon credits** generated are redistributed to holders  
6. NFTs can be **resold** on the marketplace  


## 🛠️ Tech Stack

- **Smart Contracts** → Solidity, Hardhat, OpenZeppelin
  - `CollectionFactory.sol` - Creates and manages NFT collections
  - `NFTCollection.sol` - ERC-721 implementation for land patches
  - `SE2NFT.sol` - Base NFT contract for the platform
- **Frontend** 
  - **Landing Page** → Vue.js + Tailwind CSS
  - **Main Application** → [Scaffold-ETH 2](https://github.com/scaffold-eth/scaffold-eth-2) (Next.js + Wagmi + RainbowKit)
- **Blockchain** → Ethereum-compatible networks (Base, Ethereum)
- **NFT Standard** → ERC-721
- **Storage** → IPFS / Filecoin (metadata, ecological reports)


## 📦 Installation

### Prerequisites
- Node.js 16+ and Yarn
- Git

### 1. Clone the repo
```bash
git clone https://github.com/W3-Frame/ecopatch
cd ecopatch
```

### 2. Install dependencies

```bash
yarn install
```

### 3. Run the components

#### For Smart Contracts (Hardhat)
```bash
cd packages/hardhat
yarn chain          # Start a local blockchain
yarn deploy         # Deploy contracts to the local chain
```

#### For Landing Page (Vue)
```bash
cd packages/landing
yarn dev            # Start the landing page development server
```

#### For Main App (Next.js)
```bash
cd packages/nextjs
yarn dev            # Start the Next.js development server
```

App will run at:
- Landing page: [http://localhost:5173](http://localhost:5173)
- Main app: [http://localhost:3000](http://localhost:3000)

### 4. Deploy to testnet

```bash
cd packages/hardhat
yarn deploy --network base-sepolia
```


## 📊 Smart Contracts

### CollectionFactory.sol
Factory contract that creates and manages NFT collections. Features:
- Create new NFT collections with custom parameters
- Track all collections created through the factory
- Events emitted on collection creation

### NFTCollection.sol
Implementation of the ERC-721 standard for land patches:
- Automatically mints all tokens to the creator
- Customizable name, symbol, and base URI
- Fixed total supply set at creation

### SE2NFT.sol
Base NFT implementation with additional features for the platform.


## � Frontend Components

### Landing Page (Vue.js)
Modern, responsive landing page with the following sections:
- Hero Section - Main introduction and call to action
- Features Section - Key platform capabilities
- Type Section - Types of ecological projects
- Testimonials - User success stories
- Impact Section - Measurable ecological impact
- FAQ Section - Common questions answered
- Call To Action - Final conversion point

### Main Application (Next.js)
- Block Explorer - Browse blockchain transactions
- NFT Dashboard - Manage owned NFTs
- Admin Panel - Create and manage zones
- Marketplace - Buy and sell land patches


## 🚀 Roadmap

### Phase 1: MVP
- ✅ Smart contract development
- ✅ Landing page design and implementation
- ✅ Basic NFT minting and viewing

### Phase 2: Core Features
- 🔄 Marketplace implementation
- 🔄 Carbon credit tracking and distribution
- 🔄 Community governance features

### Phase 3: Scaling
- � Multi-chain support
- 📅 Mobile application
- 📅 API for third-party integration


## 🤝 Contributing

We welcome contributions to EcoPatch! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details.


## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENCE) file for details.
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
