import { getVotingSystemContract } from '@/utils/web3.ts'
import type { VoteInfo, VoteView } from '@/models/voteSystem.ts'
import { convertBigIntTimestampToISO } from '@/utils/time.ts'
export async function getAllVotes() {
  const contract = getVotingSystemContract()
  if (!contract) return

  const result = await contract.getAllVotes()
  let votes: VoteInfo[] = []
  for (let i = 0; i < result.length; i++) {
    const vote = result[i]
    votes.push({
      id: Number(vote[0]),
      title: vote[1],
      startTime: convertBigIntTimestampToISO(vote[2]),
      endTime: convertBigIntTimestampToISO(vote[3]),
    })
  }
  return votes
}
export async function getVote(id: number) {
  console.log('run')

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
  }
  return vote
}

export async function vote(id: number, voteOptionIndex: number) {
  const contract = getVotingSystemContract()
  if (!contract) return
  const result = await contract.vote(id, voteOptionIndex)
  console.log('result', result)
}
