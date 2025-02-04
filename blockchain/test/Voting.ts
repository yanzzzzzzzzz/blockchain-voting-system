import { expect } from "chai";
import { ethers } from "hardhat";

describe("Voting", function () {
  async function deployVotingFixture() {
    const [owner, voter1, voter2] = await ethers.getSigners();
    const candidateNames = ["Alice", "Bob", "Charlie"];

    const Voting = await ethers.getContractFactory("Voting");
    const voting = await Voting.deploy(candidateNames);

    return { voting, owner, voter1, voter2, candidateNames };
  }

  describe("Deployment", function () {
    it("應該初始化候選人", async function () {
      const { voting, candidateNames } = await deployVotingFixture();

      const candidates = await voting.getCandidates();
      expect(candidates.length).to.equal(candidateNames.length);
      for (let i = 0; i < candidates.length; i++) {
        expect(candidates[i].name).to.equal(candidateNames[i]);
        expect(candidates[i].voteCount).to.equal(0);
      }
    });

    it("應該設置正確的合約擁有者", async function () {
      const { voting, owner } = await deployVotingFixture();
      expect(await voting.owner()).to.equal(owner.address);
    });
  });

  describe("Voting", function () {
    it("應該允許用戶投票", async function () {
      const { voting, voter1 } = await deployVotingFixture();

      await voting.connect(voter1).vote(0);
      const candidates = await voting.getCandidates();

      expect(candidates[0].voteCount).to.equal(1);
    });

    it("應該阻止重複投票", async function () {
      const { voting, voter1 } = await deployVotingFixture();

      await voting.connect(voter1).vote(0);
      await expect(voting.connect(voter1).vote(0)).to.be.revertedWith(
        "You have already voted"
      );
    });

    it("應該阻止對無效候選人投票", async function () {
      const { voting, voter1, candidateNames } = await deployVotingFixture();

      await expect(
        voting.connect(voter1).vote(candidateNames.length)
      ).to.be.revertedWith("Invalid candidate index");
    });
  });
});
