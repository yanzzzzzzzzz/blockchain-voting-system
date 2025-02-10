export interface VoteInfo {
  id: number;
  title: string;
  startTime: string;
  endTime: string;
}
export interface VoteOption {
  option: string;
  votes: number;
}

export interface VoteView {
  id: number;
  title: string;
  options: VoteOption[];
  createTime: string;
  startTime: string;
  endTime: string;
  exists: boolean;
}
