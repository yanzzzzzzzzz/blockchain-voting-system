<template>
  <h1>Voting DApp</h1>
  <Button label="Create Vote" icon="pi pi-plus" @click="showDialog = true" />
  <CreateVoteDialog v-model="showDialog" @createVote="processCreateVote" />
  <div v-if="voteData">
    <VoteCard v-for="vote in voteData" :key="vote.id" :vote="vote" />
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { setupWeb3 } from '@/utils/web3.ts'
import CreateVoteDialog from '@/components/CreateVoteDialog.vue'
import { getAllVotes } from '@/Api/voteSystem.api.ts'
import { createVote } from '@/Api/voteSystem.api.ts'
import { Button } from 'primevue'
import VoteCard from '@/components/VoteCard.vue'
import type { VoteInfo } from '@/models/voteInfo'
import type { CreateVoteData } from '@/models/createVoteData'

const voteData = ref<VoteInfo[] | undefined>(undefined)
const showDialog = ref<boolean>(false)

onMounted(async () => {
  await setupWeb3()
  voteData.value = await getAllVotes()
})
const processCreateVote = async (createVoteData: CreateVoteData) => {
  console.log('Create Vote Data:', createVoteData)
  await createVote(createVoteData)
}
</script>
