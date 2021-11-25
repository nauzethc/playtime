<script>
import { defineComponent, ref } from 'vue'
import { debounce, throttle } from 'underscore'

export default defineComponent({
  name: 'TinyForm',
  emits: ['submit'],
  data() {
    return {
      search: '',
      collapsed: true
    }
  },
  methods: {
    submit: throttle(function () {
      if (this.search.length >= 3) {
        this.$emit('submit', { search: this.search })
      }
    }, 500, { trailing: false }),
    input: debounce(function () {
      if (this.search.length >= 3) {
        this.submit()
      }
    }, 500),
    toggle() {
      this.collapsed = !this.collapsed
      if (!this.collapsed) {
        this.$nextTick(() => this.searchInput.focus())
      } else {
        this.search = ''
      }
    }
  },
  setup() {
    const searchInput = ref(null)
    return { searchInput }
  }
})
</script>

<template>
  <form class="tiny-form" @submit.prevent="submit" :class="{ collapsed }">
    <input
      ref="searchInput"
      type="text"
      name="search"
      v-model="search"
      autocomplete="off"
      @input="input"
      @keydown.escape="toggle"
    />
    <button @click.prevent="toggle">
      <svg class="icon" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path
          fill-rule="evenodd"
          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
  </form>
</template>

<style>
.tiny-form {
  position: relative;
  height: 3em;
  flex-grow: 1;
  max-width: max(30%, 200px);
}
.tiny-form input {
  width: 100%;
  border-bottom: 2px solid var(--fg-color);
  background-color: transparent;
  padding: 0.5em 3em 0.5em 1em;
  transform: scaleX(1);
  transform-origin: 100%;
  transition: transform 0.5s ease;
}
.tiny-form.collapsed input {
  transform: scaleX(0);
}
.tiny-form button {
  cursor: pointer;
  color: inherit;
  position: absolute;
  top: 0.2em;
  bottom: 0;
  right: 0;
  width: 3em;
  height: 3em;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 50%;
  background-color: transparent;
}
.tiny-form button:active,
.tiny-form button:focus {
  outline: none !important;
}
.tiny-form .icon {
  width: 2em;
}
</style>