<script setup>
import Logo from './components/Logo.vue'
import PWA from './components/PWA.vue'
import TinyForm from './components/game/TinyForm.vue'

import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const isHome = computed(() => route.name === 'home')
const isGame = computed(() => route.name === 'game')

function submit(query) {
  router.push({ name: 'search', query })
}
</script>

<template>
  <PWA />
  <header v-if="!isHome">
    <Logo />
    <TinyForm v-if="isGame" @submit="submit" />
  </header>
  <main>
    <router-view />
  </main>
  <footer>
    <a href="https://twitter.com/nauzethc">Nauzet Hernandez</a>
    <a class="with-icon" href="https://github.com/nauzethc/playtime">
      <i class="icon github" /> Github
    </a>
  </footer>
</template>

<style>
@import "./assets/style.css";

#app {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  width: 100%;
  overflow-x: hidden;
}
#app > header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5em;
  padding-inline: 1.5em;
  height: 4rem;
  background-color: hsl(0 0% 0% / 0.4);
}
#app > header .logo {
  font-size: 1.3em;
}
#app > main {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
#app > footer {
  min-height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5em;
  padding-inline: 1.5em;
  background-color: hsl(0 100% 100% / 0.02);
  color: hsl(0 0% 50% / 0.7);
}
#app > footer a {
  color: hsl(0 0% 50% / 0.7);
}
#app > footer a:hover,
#app > footer a:focus {
  color: var(--accent-color);
}
</style>