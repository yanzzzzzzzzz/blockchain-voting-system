<template>
  <div>
    <h1>投票頁面: {{ voteId }}</h1>
    <!-- 在這裡顯示投票選項等 -->
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { onMounted } from "vue";
import { getVote } from "../Api/voteSystem.api.ts";

onMounted(async () => {
  console.log("123");
  console.log("voteId", voteId);
  await getVote(Number(voteId));
});
const route = useRoute();
const voteId = route.params.id;
</script>
