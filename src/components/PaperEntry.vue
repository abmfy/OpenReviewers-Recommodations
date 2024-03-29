<template>
  <n-thing>
    <n-a :href="paper.url" style="text-decoration: none;">
      <n-h2 align-text prefix="bar">
        <n-text :type="getTitleType(paper.ac.decision)">
          {{ getTitlePrefix(paper.ac.decision) + paper.title }}
        </n-text>
      </n-h2>
    </n-a>
      {{ paper.abstract }}
    <br/>
    <n-collapse style="padding-top: 0;">
      <n-collapse-item name="details">
        <template #header>
          <b>Review Details</b>
        </template>
        <n-list :show-divider="false">
          <n-list-item v-for="review, id in paper.reviews" :key="id">
            <n-card embedded>
              <template #header>
                <n-text type="info">
                  <b>Reviewer {{ id + 1 }}</b>
                </n-text>
              </template>
              <n-space vertical>
                <n-space>
                  <b>Rating:</b> {{ review.rating }} / 10
                  <b>Soundness:</b> {{ review.soundness }} / 4
                  <b>Presentation:</b> {{ review.presentation }} / 4
                  <b>Contribution:</b> {{ review.contribution }} / 4
                  <b>Confidence:</b> {{ review.confidence }} / 5
                </n-space>
                <b>Summary:</b>
                <n-text v-for="text, id in review.summary.split('\n')" :key="id">
                  {{ text }}
                </n-text>
                <b>Strengths:</b>
                <n-text type="success" v-for="text, id in review.strengths.split('\n')" :key="id">
                  {{ text }}
                </n-text>
                <b>Weaknesses:</b>
                <n-text type="error" v-for="text, id in review.weaknesses.split('\n')" :key="id">
                  {{ text }}
                </n-text>
              </n-space>
            </n-card>
          </n-list-item>
          <n-list-item>
            <n-card embedded>
              <template #header>
                <n-text type="info">
                  <b>Area Chair</b>
                </n-text>
              </template>
              <n-space vertical>
                <n-text>
                  <b>Final Decision:</b> {{ paper.ac.decision }}
                </n-text>
                <n-text>
                  {{ paper.ac.comments }}
                </n-text>
              </n-space>
            </n-card>
          </n-list-item>
        </n-list>
      </n-collapse-item>
    </n-collapse>
    <template #footer>
      <n-space>
        <n-popover>
          <template #trigger>
            <n-rate readonly allow-half :default-value="Math.ceil(avgRate) / 2" />
          </template>
          <n-text type="primary">
            Average Rating: {{ avgRate.toFixed(2) }} / 10
          </n-text>
        </n-popover>
        <n-text type="info">
          {{ paper.authors.join(', ') }}
        </n-text>
      </n-space>
    </template>
  </n-thing>
</template>

<script setup lang="ts">
import { NA, NCard, NCollapse, NCollapseItem, NH2, NList, NListItem, NPopover, NRate, NSpace, NText, NThing } from 'naive-ui';

import type { Paper } from '@/types';
import { onMounted } from 'vue';

const {paper} = defineProps<{paper: Paper}>();

const avgRate = paper.reviews.reduce((acc, review) => acc + review.rating, 0) / paper.reviews.length;

// Render LaTeX
onMounted(() => {
  (window as any).MathJax.typesetPromise([document.body]);
});

// Upper case first letter
const upperFirst = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

// Get type of title
const getTitleType = (decision: string) => {
  decision = decision.toLowerCase();
  if (decision.includes('reject')) {
    return 'default';
  } else {
    return 'success';
  }
}

// Get prefix of title
const getTitlePrefix = (decision: string) => {
  if (decision.toLowerCase().includes('reject')) {
    return '';
  }
  decision = upperFirst(decision);
  return `(🎉 ${decision}) `
}
</script>

<style>
.n-collapse-item__content-inner {
  padding-top: 0px !important;
}
</style>