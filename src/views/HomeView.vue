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
      <n-tab-pane v-for="[name, tab] in CATEGORIES" :key="name" :name="name" :tab="tab + getCount(name)">
        <paper-view :category="name" :date="dateString"/>
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
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

const state: {
  start_date: number;
  end_date: number;
  count: Record<'LG' | 'AI' | 'CL' | 'CV' | 'RO', number>;

} = reactive({
  start_date: today,
  end_date: today,

  count: {
    LG: 0,
    AI: 0,
    CL: 0,
    CV: 0,
    RO: 0,
  },
});

const date_disabled = (date: number) => {
  return date < state.start_date || date >= state.end_date;
};

api.get('date').then(response => {
  const {start, end} = response.data;
  state.start_date = Number(start);
  state.end_date = Number(end);

  date.value = state.end_date;
  dateString.value = new Date(date.value).toISOString().split('T')[0]
});

const tab = ref('LG');

watch(dateString, () => {
  for (const categoryTuple of CATEGORIES) {
    const category = categoryTuple[0];
    api('count', {params: {
      category,
      date: dateString.value,
    }}).then(response => {
      state.count[category] = response.data;
    });
  }
});

const getCount = (name: 'LG' | 'AI' | 'CL' | 'CV' | 'RO') => {
  const count = state.count[name];
  if (count == 0) {
    return '';
  }
  const plural = count != 1;
  return ` (${count} paper${plural ? 's' : ''})`;
}

</script>
