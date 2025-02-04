<script setup lang="ts">
import { ref, onMounted } from "vue";
import { setupWeb3, getVotingContract } from "./utils/web3.ts";

interface Candidate {
  index: number;
  name: string;
  voteCount: string;
}

const candidates = ref<Candidate[]>([]);
const selectedCandidate = ref<number | null>(null);
const loading = ref<boolean>(false);

async function loadCandidates() {
  const contract = getVotingContract();
  if (!contract) return;

  const result = await contract.getCandidates();
  console.log("result", result);

  candidates.value = result.map(
    (c: { name: string; voteCount: bigint }, index: number) => ({
      index,
      name: c.name,
      voteCount: c.voteCount.toString(),
    })
  );
}

async function vote() {
  if (selectedCandidate.value === null) return;
  const contract = getVotingContract();
  if (!contract) return;

  loading.value = true;
  try {
    const tx = await contract.vote(selectedCandidate.value);
    await tx.wait();
    alert("投票成功！");
    loadCandidates(); // 重新載入候選人數據
  } catch (error) {
    alert((error as Error).message);
  }
  loading.value = false;
}

onMounted(async () => {
  await setupWeb3();
  await loadCandidates();
});
</script>

<template>
  <div>
    <h1>Voting DApp</h1>
    <div v-if="candidates.length === 0">載入候選人...</div>
    <ul>
      <li v-for="candidate in candidates" :key="candidate.index">
        {{ candidate.name }} - 票數: {{ candidate.voteCount }}
        <button @click="selectedCandidate = candidate.index">選擇</button>
      </li>
    </ul>
    <button @click="vote" :disabled="selectedCandidate === null || loading">
      投票
    </button>
  </div>
</template>
