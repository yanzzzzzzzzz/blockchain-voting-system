import type { VoteOption } from './voteOption'

export interface VoteView {
  id: number
  title: string
  options: VoteOption[]
  createTime: string
  startTime: string
  endTime: string
  exists: boolean
  isVote: boolean
}
