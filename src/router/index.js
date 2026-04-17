import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../portfolio/components/home-page.component.vue')
  },
  {
    path: '/projects',
    name: 'projects',
    component: () => import('../portfolio/components/projects-page.component.vue')
  },
  {
    path: '/certifications',
    name: 'certifications',
    component: () => import('../portfolio/components/certifications-page.component.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' };
    }
    return { top: 0, behavior: 'smooth' };
  }
});

export default router;
