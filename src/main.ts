import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import YyMathjax from 'mathjax3-vue';

import '@/mock/backend';

const app = createApp(App);

app.use(router);

const MathJaxConfig = {
  tex: {
      inlineMath: [['$', '$']],
      processEscapes: true
  }
}

app.use(YyMathjax, MathJaxConfig);

app.mount('#app');
