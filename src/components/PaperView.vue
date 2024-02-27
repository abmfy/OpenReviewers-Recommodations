<template>
  <n-space vertical>
    <template v-if="!state.loading">
      <n-list>
        <n-list-item v-for="paper in state.papers" :key="paper.url">
          <paper-entry :paper="paper" />
        </n-list-item>
      </n-list>
    </template>
    <template v-else v-for="_ in 10" :key="_">
      <n-skeleton text size="medium" style="width: 30%" />
      <n-skeleton text :repeat="3" />
      <n-skeleton text style="width: 20%" />
    </template>
  </n-space>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { NList, NListItem, NSkeleton, NSpace } from 'naive-ui';

import PaperEntry from '@/components/PaperEntry.vue';
import api from '@/utils/api';
import type { Paper } from '@/types';

const props = defineProps<{
  category: string,
  date: string,
}>();

const state: {
  loading: boolean;
  papers: Paper[];
} = reactive({
  loading: true,
  papers: [],
});

api('papers', {data: props}).then(response => {
  state.loading = false;
  state.papers = response.data;
})
</script>