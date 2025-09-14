// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Voting {
	struct Candidate {
		string name;
		uint256 voteCount;
	}

	address public admin;
	bool public votingOpen;
	Candidate[] public candidates;
	mapping(address => bool) public hasVoted;

	event CandidateRegistered(uint256 indexed candidateId, string name);
	event VotingStarted();
	event Voted(address indexed voter, uint256 indexed candidateId);
	event VotingClosed();

	modifier onlyAdmin() {
		require(msg.sender == admin, "Only admin");
		_;
	}

	modifier whenVotingClosed() {
		require(!votingOpen, "Voting open");
		_;
	}

	modifier whenVotingOpen() {
		require(votingOpen, "Voting closed");
		_;
	}

	constructor() {
		admin = msg.sender;
	}

	function registerCandidate(string calldata name) external onlyAdmin whenVotingClosed {
		require(bytes(name).length > 0, "Name required");
		candidates.push(Candidate({ name: name, voteCount: 0 }));
		emit CandidateRegistered(candidates.length - 1, name);
	}

	function startVoting() external onlyAdmin whenVotingClosed {
		require(candidates.length >= 1, "No candidates");
		votingOpen = true;
		emit VotingStarted();
	}

	function vote(uint256 candidateId) external whenVotingOpen {
		require(!hasVoted[msg.sender], "Already voted");
		require(candidateId < candidates.length, "Invalid candidate");
		hasVoted[msg.sender] = true;
		candidates[candidateId].voteCount += 1;
		emit Voted(msg.sender, candidateId);
	}

	function closeVoting() external onlyAdmin whenVotingOpen {
		votingOpen = false;
		emit VotingClosed();
	}

	function getCandidates() external view returns (Candidate[] memory) {
		return candidates;
	}
}


