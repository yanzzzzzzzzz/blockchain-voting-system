<template>
  <div class="vote-card p-card">
    <h3>{{ vote.title }}</h3>
    <p>
      <strong>投票時間:</strong> {{ formattedStartTime }} -
      {{ formattedEndTime }}
    </p>
    <p>
      <Button
        label="進入投票"
        icon="pi pi-check-circle"
        @click="goToVote"
        class="p-button p-button-success"
      />
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { VoteInfo } from '@/models/voteSystem'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'

const props = defineProps<{
  vote: VoteInfo
}>()

const router = useRouter()

const formattedStartTime = computed(() => {
  return new Date(props.vote.startTime).toLocaleString() // 顯示當地時間
})

const formattedEndTime = computed(() => {
  return new Date(props.vote.endTime).toLocaleString()
})

function goToVote() {
  router.push({
    name: 'VotePage',
    params: { id: props.vote.id },
  })
}
</script>

<style scoped>
.vote-card {
  width: 300px;
  margin: 1em;
}
</style>
