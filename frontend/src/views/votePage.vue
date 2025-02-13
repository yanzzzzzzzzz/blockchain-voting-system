<template>
  <div>
    <h1>投票頁面: {{ voteInfo?.title }}</h1>
    <ul>
      <li v-for="(option, index) in voteInfo?.options" :key="index" class="py-1">
        {{ option.option }} - 票數: {{ option.votes }}
        <Button
          @click="selectedCandidate = index"
          :class="{ 'selected-button': selectedCandidate === index }"
        >
          選擇
        </Button>
      </li>
    </ul>
    <Button @click="processVote" :disabled="selectedCandidate === null || loading"> 投票 </Button>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import { getVote, vote } from '@/Api/voteSystem.api.ts'
import type { VoteView } from '@/models/voteView'
import { Button } from 'primevue'

const route = useRoute()
const voteId = route.params.id
const voteInfo = ref<VoteView | undefined>(undefined)
const selectedCandidate = ref<number | null>(null)
const loading = ref<boolean>(true)
onMounted(async () => {
  loading.value = true
  voteInfo.value = await getVote(Number(voteId))
  loading.value = false
})

const processVote = async () => {
  if (selectedCandidate.value === null) return
  await vote(Number(voteId), selectedCandidate.value)
}
</script>

<style scoped>
.selected-button {
  background-color: blue;
  color: white;
}
</style>
