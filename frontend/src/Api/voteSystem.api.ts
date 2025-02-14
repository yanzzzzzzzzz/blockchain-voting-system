import { getVotingSystemContract } from '@/utils/web3.ts'
import { convertBigIntTimestampToISO, convertToUnixTimestamp } from '@/utils/time.ts'
import type { VoteInfo } from '@/models/voteInfo'
import type { VoteView } from '@/models/voteView'
import type { CreateVoteData } from '@/models/createVoteData'

export async function getAllVotes() {
  const contract = getVotingSystemContract()
  if (!contract) return

  const result = await contract.getAllVotes()
  console.log('getAllVotes', result)

  let votes: VoteInfo[] = []
  for (let i = 0; i < result.length; i++) {
    const vote = result[i]
    votes.push({
      id: Number(vote[0]),
      title: vote[1],
      startTime: convertBigIntTimestampToISO(vote[2]),
      endTime: convertBigIntTimestampToISO(vote[3]),
      isVote: vote[4],
    })
  }
  console.log('votes', votes)

  return votes
}
export async function getVote(id: number) {
  const contract = getVotingSystemContract()
  if (!contract) return

  const result = await contract.getVote(id)
  const vote: VoteView = {
    id: Number(result.id),
    title: result.title,
    options: result.options.map((opt: any) => ({
      option: opt.option,
      votes: Number(opt.votes),
    })),
    createTime: convertBigIntTimestampToISO(result.createTime),
    startTime: convertBigIntTimestampToISO(result.startTime),
    endTime: convertBigIntTimestampToISO(result.endTime),
    exists: result.exists,
    isVote: result.isVote,
  }
  console.log('getVote', vote)

  return vote
}

export async function vote(id: number, voteOptionIndex: number) {
  const contract = getVotingSystemContract()
  if (!contract) return
  const tx = await contract.vote(id, voteOptionIndex)
  console.log('start to wait for transaction to be mined')

  const receipt = await tx.wait()
  console.log('Transaction mined in block:', receipt.blockNumber)
}

export async function createVote(createVoteData: CreateVoteData) {
  const contract = getVotingSystemContract()
  if (!contract) return
  if (createVoteData.startTime == null || createVoteData.endTime == null) {
    return
  }
  const tx = await contract.createVote(
    createVoteData.title,
    createVoteData.options.split(',').map((option) => option.trim()),
    convertToUnixTimestamp(createVoteData.startTime),
    convertToUnixTimestamp(createVoteData.endTime)
  )
  console.log('start to wait for transaction to be mined')

  const receipt = await tx.wait()
  console.log('Transaction mined in block:', receipt.blockNumber)
}
