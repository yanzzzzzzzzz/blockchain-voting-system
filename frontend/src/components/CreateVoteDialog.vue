<template>
  <Dialog
    header="Create Vote"
    :visible="modelValue"
    @update:visible="$emit('update:modelValue', $event)"
    :modal="true"
    :closable="false"
    :style="{ width: '50vw' }"
  >
    <div class="p-fluid">
      <div class="p-field">
        <label for="title">Title</label>
        <InputText id="title" v-model="voteData.title" placeholder="Enter vote title" />
      </div>

      <div class="p-field">
        <label for="voteOptions">Vote Options</label>
        <InputText
          id="voteOptions"
          v-model="voteData.options"
          placeholder="Enter vote options (comma separated)"
        />
      </div>

      <div class="p-field">
        <label for="startTime">Start Time</label>
        <Calendar id="startTime" v-model="voteData.startTime" :showTime="true" />
      </div>

      <div class="p-field">
        <label for="endTime">End Time</label>
        <Calendar id="endTime" v-model="voteData.endTime" :showTime="true" />
      </div>

      <div class="p-d-flex p-jc-end">
        <Button label="Submit" icon="pi pi-check" @click="submitVote" />
        <Button label="Cancel" icon="pi pi-times" class="p-button-secondary" @click="cancelVote" />
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Calendar from 'primevue/calendar'
import type { CreateVoteData } from '@/models/createVoteData'
defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue', 'createVote'])

const voteData = ref<CreateVoteData>({
  title: '',
  options: '',
  startTime: null,
  endTime: null,
})

const submitVote = () => {
  console.log('Vote Data:', voteData.value)
  emit('createVote', voteData.value)
  emit('update:modelValue', false)
}

const cancelVote = () => {
  emit('update:modelValue', false)
}
</script>
