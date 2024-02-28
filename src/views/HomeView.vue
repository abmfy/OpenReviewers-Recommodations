<template>
  <div style="padding: 24px">
    <n-space align="baseline">
      <n-h1 prefix="bar">
        OpenReviewers
        <n-gradient-text type="success">
          For You
        </n-gradient-text>
      </n-h1>
      <n-h1>
        <n-text depth="3">
          {{dateString}}
        </n-text>
      </n-h1>
      <n-popover>
        <template #trigger>
          <n-button circle type="primary">
            <template #icon>
              <n-icon>
                <calendar-outline />
              </n-icon>
            </template>
          </n-button>
        </template>
        <n-date-picker panel v-model:value="date" v-model:formatted-value="dateString" :is-date-disabled="date_disabled"/>
      </n-popover>
    </n-space>

    <n-tabs :key="dateString" v-model:value="tab" size="large" default-value="LG" animated>
      <n-tab-pane v-for="[name, tab] in CATEGORIES" :key="name" :name="name" :tab="tab">
        <paper-view :category="name" :date="dateString"/>
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { NButton, NDatePicker, NGradientText, NH1, NIcon, NPopover, NSpace, NTabPane, NTabs, NText } from 'naive-ui';
import { CalendarOutline } from '@vicons/ionicons5';

import api from '@/utils/api';
import PaperView from '@/components/PaperView.vue';

const CATEGORIES = [
  ['LG', 'Machine Learning'],
  ['AI', 'Artificial Intelligence'],
  ['CL', 'Computation and Language'],
  ['CV', 'Computer Vision and Pattern Recognition'],
  ['RO', 'Robotics'],
] as const;

const today = new Date().setHours(0, 0, 0, 0);
const date = ref(today);

const dateString = ref(new Date(date.value).toISOString().split('T')[0]);

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

const tab = ref('LG');

</script>
