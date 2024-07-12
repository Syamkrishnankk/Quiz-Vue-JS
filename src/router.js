

import { createRouter, createWebHistory } from 'vue-router';
import { defineAsyncComponent } from 'vue'
import QuizView from './components/QuizView.vue'

// const UserDetails = () => import('./components/QuizView.vue')
import Quiz from './components/Quiz.vue'
const routes = [
  { path: '/', component:  () => import('./components/Quiz.vue') },
  { path: '/QuizView', name: 'quizview', component: QuizView, props : true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
