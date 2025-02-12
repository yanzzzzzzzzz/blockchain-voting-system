# blockchain-voting-system

A voting system using blockchain technology

## How to Run

### Build Smart Contract

1. Navigate to the blockchain directory and install dependencies:

   ```sh
   cd blockchain && npm i
   ```

2. Compile the smart contract:

   ```sh
   npx hardhat compile
   ```

3. Start the Hardhat local blockchain node:

   ```sh
   npx hardhat node
   ```

4. Create another terminal and go to blockchain folder, deploy the contract to the localhost network:

   ```sh
   cd blockchain && npx hardhat ignition deploy ./ignition/modules/VotingSystem.ts --network localhost
   ```

5. Save the deployed contract address.

### Frontend Setup

Open another terminal and follow these steps:

1. Navigate to the frontend directory and install dependencies:

   ```sh
   cd frontend && npm i
   ```

2. Copy the compiled contract artifact to the frontend project:

   ```sh
   cp ../blockchain/artifacts/contracts/Voting.sol/Voting.json src/contracts/
   ```

3. Fill the deployed contract address in the frontend configuration file:

   ```sh
   echo '{"VotingSystem": "YOUR_DEPLOYED_ADDRESS"}' > src/contracts/contract-address.json
   ```

4. Start the frontend development server:

   ```sh
   npm run dev
   ```

### Browser & MetaMask Setup

1. Install the [MetaMask browser extension](https://metamask.io/download/).
2. Add a custom network in MetaMask:
   - RPC URL: `http://127.0.0.1:8545`
   - chain ID: 31337
   - Keep other settings as default.
3. Import an account from the Hardhat node:
   - Open MetaMask and select **Add account or hardware wallet**.
   - Choose **Import account** and enter the private key from the Hardhat node.
4. Select the newly created custom network in MetaMask.

Your smart contract and frontend should now be ready to use!
