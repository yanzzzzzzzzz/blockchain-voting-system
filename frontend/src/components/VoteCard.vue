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
import { computed } from "vue";
import type { VoteInfo } from "../model/voteSystem.ts";
import { useRouter } from "vue-router";
import Button from "primevue/button";

// 定義 props
const props = defineProps<{
  vote: VoteInfo;
}>();

// 使用 Vue Router 進行頁面跳轉
const router = useRouter();

// 計算開始和結束時間
const formattedStartTime = computed(() => {
  return new Date(props.vote.startTime).toLocaleString(); // 顯示當地時間
});

const formattedEndTime = computed(() => {
  return new Date(props.vote.endTime).toLocaleString();
});

// 跳轉到投票頁面
function goToVote() {
  router.push({
    name: "VotePage",
    params: { id: props.vote.id },
  });
}
</script>

<style scoped>
.vote-card {
  width: 300px;
  margin: 1em;
}
</style>
