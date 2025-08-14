import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    base: 'https://alexsmiian.github.io/game-board-card-selection',
    plugins: [react(), tailwindcss()],
})
