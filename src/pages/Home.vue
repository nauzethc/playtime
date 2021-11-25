<script setup>
import { useRouter } from 'vue-router'
import Logo from '../components/Logo.vue'
import BasicForm from '../components/home/BasicForm.vue'

const router = useRouter()

function submit({ search }) {
  router.push({ name: 'search', query: { search } })
}
</script>

<template>
  <div id="home-page">
    <Logo />
    <p class="sub-logo">
      <a href="https://howlongtobeat.com/">HowLongToBeat.com</a>
    </p>
    <BasicForm @submit="submit" />
  </div>
</template>

<style>
#home-page {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 2em;
  padding-inline: 2em;
}
#home-page .logo {
  font-size: 2.5em;
}
#home-page .sub-logo {
  margin-top: -0.5em;
  margin-bottom: 3em;
  font-size: 0.7em;
}
#home-page .sub-logo a {
  color: var(--bg-shade-2);
}
#home-page .sub-logo a:hover,
#home-page .sub-logo a:focus {
  color: var(--accent-color);
}
#home-page .basic-form {
  width: 100%;
  max-width: 400px;
}

@media (min-width: 768px) {
  #home-page .logo {
    font-size: 3.5em;
  }
  #home-page .sub-logo {
    font-size: 1em;
  }
}
</style>