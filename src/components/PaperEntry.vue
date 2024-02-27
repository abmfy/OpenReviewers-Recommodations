<template>
  <n-a :href="paper.url" style="text-decoration: none;">
    <n-thing>
      <n-h2 align-text prefix="bar">
        {{ paper.title }}
      </n-h2>
      {{ paper.abstract }}
      <template #footer>
        <n-space>
          <n-rate readonly allow-half :default-value="avgRate / 2" />
          <n-text type="info">
            {{ paper.authors.join(', ') }}
          </n-text>
        </n-space>
      </template>
    </n-thing>
  </n-a>
</template>

<script setup lang="ts">
import { NA, NH2, NRate, NSpace, NText, NThing } from 'naive-ui';

import type { Paper } from '@/types';
import { onMounted } from 'vue';

const {paper} = defineProps<{paper: Paper}>();

const avgRate = paper.rating.reduce((a, b) => a + b, 0) / paper.rating.length;

// Render LaTeX
onMounted(() => {
  (window as any).MathJax.typesetPromise([document.body]);
});
</script>
