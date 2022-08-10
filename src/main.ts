import { createApp } from 'vue'
import App from './App.vue'
import './base.css'
import { fluent } from './translation'

createApp(App).use(fluent).mount('#app')
