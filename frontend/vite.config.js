import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { all } from 'axios'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    host:true,
    allowedHosts:"all"
  },
  plugins: [react(), tailwindcss()
  ],

})
