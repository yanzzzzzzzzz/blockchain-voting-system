import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';

const VotingSystemModule = buildModule('VotingSystemModule', (m) => {
  // 預設投票的參數
  const title = 'Favorite Programming Language';
  const options = ['Solidity', 'JavaScript', 'Python'];
  const startTime = Math.floor(Date.now() / 1000) + 60; // 開始時間設為未來 60 秒
  const endTime = startTime + 3600; // 結束時間設為 1 小時後

  // 部署合約並傳遞參數
  const votingSystem = m.contract('VotingSystem', [
    title,
    options,
    startTime,
    endTime,
  ]);

  return { votingSystem };
});

export default VotingSystemModule;
