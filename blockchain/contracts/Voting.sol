// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Voting {
    struct Candidate {
        string name;
        uint256 voteCount;
    }

    address public owner;
    mapping(address => bool) public hasVoted;
    Candidate[] public candidates;

    event VoteCasted(address voter, string candidateName);

    constructor(string[] memory _candidateNames) {
        owner = msg.sender;
        for (uint256 i = 0; i < _candidateNames.length; i++) {
            candidates.push(Candidate({name: _candidateNames[i], voteCount: 0}));
        }
    }

    function vote(uint256 candidateIndex) public {
        require(candidateIndex < candidates.length, "Invalid candidate index");
        require(!hasVoted[msg.sender], "You have already voted");

        hasVoted[msg.sender] = true;
        candidates[candidateIndex].voteCount += 1;

        emit VoteCasted(msg.sender, candidates[candidateIndex].name);
    }

    function getCandidates() public view returns (Candidate[] memory) {
        return candidates;
    }
}
