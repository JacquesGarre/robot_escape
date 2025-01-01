import { defineConfig } from 'vite';

export default defineConfig({
  base: '/robot_escape/',
  resolve: {
    alias: {
      '/assets/': '/robot_escape/assets/',
    },
  },
});