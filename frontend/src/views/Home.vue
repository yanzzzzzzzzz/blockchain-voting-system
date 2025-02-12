<template>
  <h1>Voting DApp</h1>
  <div v-if="candidates.length === 0">載入候選人...</div>
  <ul>
    <li v-for="candidate in candidates" :key="candidate.index" class="py-1">
      {{ candidate.name }} - 票數: {{ candidate.voteCount }}
      <Button @click="selectedCandidate = candidate.index">選擇</Button>
    </li>
  </ul>
  <Button @click="vote" :disabled="selectedCandidate === null || loading">
    投票
  </Button>
  <Button label="Create Vote" icon="pi pi-plus" @click="showDialog = true" />
  <div>
    <CreateVoteDialog v-model="showDialog" />
  </div>
  <div v-if="voteData">
    <VoteCard v-for="vote in voteData" :key="vote.id" :vote="vote" />
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { setupWeb3, getVotingContract } from "../utils/web3.ts";
import CreateVoteDialog from "../components/CreateVoteDialog.vue";

import { getAllVotes } from "../Api/voteSystem.api.ts";
import { Button } from "primevue";
import VoteCard from "../components/VoteCard.vue";
import type { VoteInfo } from "../model/voteSystem.ts";
interface Candidate {
  index: number;
  name: string;
  voteCount: string;
}
const candidates = ref<Candidate[]>([]);
const selectedCandidate = ref<number | null>(null);
const loading = ref<boolean>(false);
const voteData = ref<VoteInfo[] | undefined>(undefined);
const showDialog = ref<boolean>(false);

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
  voteData.value = await getAllVotes();
});
</script>
