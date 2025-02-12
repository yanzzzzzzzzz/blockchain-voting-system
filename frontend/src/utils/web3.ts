import { ethers } from 'ethers'
import contractAddress from '@/contracts/contract-address.json'
import VotingSystemABI from '@/contracts/VotingSystem.json'

declare global {
  interface Window {
    ethereum: any
  }
}

let provider: ethers.BrowserProvider | null = null
let signer: ethers.Signer | null = null
let votingSystemContract: ethers.Contract | null = null

export async function setupWeb3(): Promise<void> {
  if (window.ethereum) {
    provider = new ethers.BrowserProvider(window.ethereum)
    signer = await provider.getSigner()

    votingSystemContract = new ethers.Contract(
      contractAddress.VotingSystem,
      VotingSystemABI.abi,
      signer
    )
  } else {
    console.error('請安裝 MetaMask')
  }
}
export function getVotingSystemContract(): ethers.Contract | null {
  return votingSystemContract
}
