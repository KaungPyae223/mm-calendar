import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: 'src/main.js',  // Your library entry
      name: 'MmCalendar',
      fileName: (format) => `mm-calendar.${format}.js`,
    },
    rollupOptions: {
      // Exclude dependencies you don’t want bundled
      external: [],
    },
  },
})
