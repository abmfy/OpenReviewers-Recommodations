<template>
  <div style="padding: 24px">
    <n-space align="baseline" >
      <n-h1 prefix="bar">
        OpenReviewers For You
      </n-h1>
      <n-h1>
        <n-text depth="3">
          {{new Date().toLocaleDateString()}}
        </n-text>
      </n-h1>
    </n-space>

    <n-date-picker v-model:value="date" :is-date-disabled="date_disabled"/>
    <pre>{{ date }}</pre>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { NDatePicker, NH1, NSpace, NText } from 'naive-ui';

import api from '@/utils/api';

import '@/mock/backend';

const today = new Date().setHours(0, 0, 0, 0);
const date = ref(today);

const state = reactive({
  start_date: today,
  end_date: today,
});

const date_disabled = (date: number) => {
  return date < state.start_date || date > state.end_date;
};

api.get('date').then(response => {
  const {start, end} = response.data;
  state.start_date = Number(start);
  state.end_date = Number(end);
});

</script>
