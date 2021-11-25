<script>
import { defineComponent } from 'vue'
import { useRegisterSW } from 'virtual:pwa-register/vue'

export default defineComponent({
  name: 'PWA',
  computed: {
    message () {
      if (this.needRefresh) {
        return 'New content available, click on reload button to update.'
      }
      if (this.offlineReady) {
        return 'App ready to work offline'
      }
      return ''
    },
    action () {
      if (this.needRefresh) {
        return 'reload'
      }
      if (this.offlineReady) {
        return 'close'
      }
      return ''
    }
  },
  methods: {
    async onClick (action) {
      if (action === 'reload') {
        await this.updateServiceWorker()
      }
      if (action === 'close') {
        this.needRefresh = false
        this.offlineReady = false
      }
    }
  },
  setup () {
    const { needRefresh, offlineReady, updateServiceWorker } = useRegisterSW()
    return { needRefresh, offlineReady, updateServiceWorker }
  }
})
</script>

<template>
  <div class="pwa" role="alert" v-if="needRefresh || offlineReady">
    <div class="message">{{ message }}</div>
    <button @click="onClick(action)">{{ action }}</button>
  </div>
</template>

<style>
.pwa {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1em;
  padding: .5em 1em;
  padding-block: .5em;
  padding-inline: 1em;
  position: fixed;
  top: 1em;
  left: 0;
  right: 0;
  margin-right: auto;
  margin-left: auto;
  width: 100%;
  max-width: min(400px, 80%);
  background-color: var(--bg-shade-2);
}
.pwa button {
  cursor: pointer;
  background-color: var(--bg-shade-1);
  color: inherit;
  border: 0;
  padding: .5em .8em;
  padding-block: .5em;
  padding-inline: .8em;
  font-size: .8em;
  font-weight: 600;
  transition: background-color .3s ease;
  text-transform: uppercase;
}
.pwa button:focus,
.pwa button:hover {
  background-color: var(--accent-color);
}
</style>