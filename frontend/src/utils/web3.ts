import { ethers } from "ethers";
import contractAddress from "../contracts/contract-address.json";
import VotingABI from "../contracts/Voting.json";
import VotingSystemABI from "../contracts/VotingSystem.json";

declare global {
  interface Window {
    ethereum: any;
  }
}

let provider: ethers.BrowserProvider | null = null;
let signer: ethers.Signer | null = null;
let votingContract: ethers.Contract | null = null;
let votingSystemContract: ethers.Contract | null = null;

export async function setupWeb3(): Promise<void> {
  if (window.ethereum) {
    provider = new ethers.BrowserProvider(window.ethereum);
    signer = await provider.getSigner();
    votingContract = new ethers.Contract(
      contractAddress.Voting,
      VotingABI.abi,
      signer
    );

    votingSystemContract = new ethers.Contract(
      contractAddress.VotingSystem,
      VotingSystemABI.abi,
      signer
    );
  } else {
    console.error("請安裝 MetaMask");
  }
}

export function getVotingContract(): ethers.Contract | null {
  return votingContract;
}

export function getVotingSystemContract(): ethers.Contract | null {
  return votingSystemContract;
}
