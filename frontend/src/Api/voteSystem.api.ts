import { getVotingSystemContract } from "../utils/web3.ts";
import type { VoteInfo } from "../model/voteSystem.ts";
import { convertBigIntTimestampToISO } from "../utils/time.ts";
export async function getAllVotes() {
  const contract = getVotingSystemContract();
  if (!contract) return;

  const result = await contract.getAllVotes();
  let votes: VoteInfo[] = [];
  for (let i = 0; i < result.length; i++) {
    const vote = result[i];
    votes.push({
      id: Number(vote[0]),
      title: vote[1],
      startTime: convertBigIntTimestampToISO(vote[2]),
      endTime: convertBigIntTimestampToISO(vote[3]),
    });
  }
  return votes;
}
export async function getVote(id: number) {
  console.log("run");

  const contract = getVotingSystemContract();
  if (!contract) return;
  console.log("run contract");

  const result = await contract.getVote(id);
}
