import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { all } from 'axios'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    host:'0.0.0.0',
    port:5173,
    allowedHosts:"all"
  },
  plugins: [react(), tailwindcss()
  ],

})
