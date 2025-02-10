<template>
  <Dialog header="Create Vote" v-model:visible="showDialog" :modal="true" :closable="false" :style="{ width: '50vw' }">
    <div class="p-fluid">
      <!-- 投票標題 -->
      <div class="p-field">
        <label for="title">Title</label>
        <InputText id="title" v-model="voteData.title" placeholder="Enter vote title" />
      </div>

      <!-- 投票選項 -->
      <div class="p-field">
        <label for="voteOptions">Vote Options</label>
        <InputText id="voteOptions" v-model="voteData.options" placeholder="Enter vote options (comma separated)" />
      </div>

      <!-- 開始時間 -->
      <div class="p-field">
        <label for="startTime">Start Time</label>
        <Calendar id="startTime" v-model="voteData.startTime" :showTime="true" />
      </div>

      <!-- 結束時間 -->
      <div class="p-field">
        <label for="endTime">End Time</label>
        <Calendar id="endTime" v-model="voteData.endTime" :showTime="true" />
      </div>

      <!-- 按鈕提交 -->
      <div class="p-d-flex p-jc-end">
        <Button label="Submit" icon="pi pi-check" @click="submitVote" />
        <Button label="Cancel" icon="pi pi-times" class="p-button-secondary" @click="cancelVote" />
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Calendar from 'primevue/calendar';

// 接收父元件傳遞的 showDialog 參數
defineProps({
  showDialog: {
    type: Boolean,
    required: true
  }
});

// 定義發送事件到父元件的方法
const emit = defineEmits(['update:showDialog']);

// 定義投票資料結構
interface VoteData {
  title: string;
  options: string;
  startTime: Date | null;
  endTime: Date | null;
}

// 投票資料
const voteData = ref<VoteData>({
  title: '',
  options: '',
  startTime: null,
  endTime: null
});

// 提交投票
const submitVote = () => {
  console.log('Vote Data:', voteData.value);
  // 提交後關閉 Dialog
  emit('update:showDialog', false);
};

// 取消投票，並關閉 Dialog
const cancelVote = () => {
  emit('update:showDialog', false);
};
</script>
