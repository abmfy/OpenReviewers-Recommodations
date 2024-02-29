<template>
  <n-space vertical>
    <template v-if="!state.loading">
      <n-empty v-if="false && !papers.length" size="large" description="Nothing" />
      <template v-else>
        <n-text depth="3">
          {{state.paperCount}} papers today
        </n-text>
        <n-list>
          <n-list-item v-for="paper in papers" :key="paper.url">
            <paper-entry :paper="paper" />
          </n-list-item>
        </n-list>
        <n-pagination v-model:page="state.page" :page-count="Math.ceil(state.paperCount / 10)" @update:page="jump" />
      </template>
    </template>
    <template v-else v-for="_ in 10" :key="_">
      <n-skeleton text size="medium" style="width: 30%" />
      <n-skeleton text :repeat="3" />
      <n-skeleton text style="width: 20%" />
    </template>
  </n-space>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue';
import { NEmpty, NList, NListItem, NPagination, NSkeleton, NSpace, NText } from 'naive-ui';

import PaperEntry from '@/components/PaperEntry.vue';
import api from '@/utils/api';
import type { Paper } from '@/types';

const props = defineProps<{
  category: string,
  date: string,
}>();

const state: {
  loading: boolean;
  papersAll: Paper[];
  paperCount: number;
  page: number;
} = reactive({
  loading: true,
  papersAll: [],
  paperCount: 0,
  page: 1,
});

const papers = computed(() => {
  const page = state.page - 1;
  return state.papersAll.slice(page * 10, (page + 1) * 10);
});

api('papers', {params: props}).then(response => {
  state.loading = false;
  state.papersAll = response.data;
  state.paperCount = state.papersAll.length;
})

const jump = () => {
  window.scrollTo(0, 0);
}
</script>