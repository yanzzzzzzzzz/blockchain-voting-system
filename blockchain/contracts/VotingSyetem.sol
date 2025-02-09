// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract VotingSystem {
  struct VoteOption {
    string option;
    uint256 votes;
  }

  struct Vote {
    string title;
    VoteOption[] options;
    uint256 createTime;
    uint256 startTime;
    uint256 endTime;
    mapping(address => bool) hasVoted;
    bool exists;
  }

  struct VoteInfo {
    uint256 id;
    string title;
    uint256 startTime;
    uint256 endTime;
  }

  struct VoteView {
    uint256 id;
    string title;
    VoteOption[] options;
    uint256 createTime;
    uint256 startTime;
    uint256 endTime;
    bool exists;
  }

  address public owner;
  uint256 public voteCount;
  mapping(uint256 => Vote) public votes;

  event VoteCreated(
    uint256 voteId,
    string title,
    uint256 startTime,
    uint256 endTime
  );
  event Voted(uint256 voteId, uint256 optionIndex, address voter);

  modifier onlyOwner() {
    require(msg.sender == owner, 'Only owner can call this');
    _;
  }

  constructor(
    string memory _title,
    string[] memory _options,
    uint256 _startTime,
    uint256 _endTime
  ) {
    require(_options.length >= 2, 'At least two options are required');
    require(_endTime > _startTime, 'End time must be greater than start time');

    // 初始化第一個投票
    Vote storage newVote = votes[voteCount];
    newVote.title = _title;
    newVote.startTime = _startTime;
    newVote.endTime = _endTime;
    newVote.createTime = block.timestamp;
    newVote.exists = true;

    for (uint256 i = 0; i < _options.length; i++) {
      newVote.options.push(VoteOption(_options[i], 0)); // 初始化選項
    }

    emit VoteCreated(voteCount, _title, _startTime, _endTime);
    voteCount++;
  }

  // 创建新的投票
  function createVote(
    string memory _title,
    string[] memory _options,
    uint256 _startTime,
    uint256 _endTime
  ) public {
    require(_options.length >= 2, 'At least two options required');
    require(_endTime > _startTime, 'End time must be greater than start time');

    Vote storage newVote = votes[voteCount];
    newVote.title = _title;
    newVote.startTime = _startTime;
    newVote.endTime = _endTime;
    newVote.createTime = block.timestamp;
    newVote.exists = true;

    for (uint256 i = 0; i < _options.length; i++) {
      newVote.options.push(VoteOption(_options[i], 0)); // 初始化選項
    }

    emit VoteCreated(voteCount, _title, _startTime, _endTime);
    voteCount++;
  }

  // 參與投票
  function vote(uint256 _voteId, uint256 _optionIndex) public {
    require(votes[_voteId].exists, 'The vote does not exist');
    require(
      block.timestamp >= votes[_voteId].startTime,
      'Voting has not started'
    );
    require(
      block.timestamp <= votes[_voteId].endTime,
      'Voting period has ended'
    );
    require(
      _optionIndex < votes[_voteId].options.length,
      'Invalid option index'
    );
    require(!votes[_voteId].hasVoted[msg.sender], 'You have already voted');

    votes[_voteId].hasVoted[msg.sender] = true;
    votes[_voteId].options[_optionIndex].votes++;
    emit Voted(_voteId, _optionIndex, msg.sender);
  }

  // 獲取所有活動中的投票
  function getAllVotes() public view returns (VoteInfo[] memory) {
    uint256 activeVoteCount = 0;
    for (uint256 i = 0; i < voteCount; i++) {
      if (votes[i].exists && block.timestamp <= votes[i].endTime) {
        activeVoteCount++;
      }
    }

    VoteInfo[] memory voteInfos = new VoteInfo[](activeVoteCount);
    uint256 index = 0;

    for (uint256 i = 0; i < voteCount; i++) {
      if (votes[i].exists && block.timestamp <= votes[i].endTime) {
        voteInfos[index++] = VoteInfo(
          i,
          votes[i].title,
          votes[i].startTime,
          votes[i].endTime
        );
      }
    }
    return voteInfos;
  }

  // 獲取某個投票的所有選項及票數
  function getVote(uint256 _voteId) public view returns (VoteView memory) {
    require(votes[_voteId].exists, 'The vote does not exist');

    return
      VoteView({
        id: _voteId,
        title: votes[_voteId].title,
        options: votes[_voteId].options,
        createTime: votes[_voteId].createTime,
        startTime: votes[_voteId].startTime,
        endTime: votes[_voteId].endTime,
        exists: votes[_voteId].exists
      });
  }
}
