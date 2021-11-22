<script>
import { defineComponent } from "vue";
import { debounce, throttle } from 'underscore'

export default defineComponent({
  name: 'BasicForm',
  emits: ['submit'],
  data () {
    return {
      search: ''
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
    }, 500)
  }
})
</script>

<template>
  <form @submit.prevent="submit" class="basic-form">
    <input type="text" v-model="search" @input="input" placeholder="Search..." />
    <svg class="icon" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path>
    </svg>
  </form>
</template>

<style>
.basic-form {
  display: flex;
  flex-direction: column;
  position: relative;
}
.basic-form input {
  font-size: 1.2em;
  height: 3em;
  padding-left: 3em;
  width: 100%;
}
.basic-form .icon {
  opacity: .5;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  margin-inline: 1em;
  width: 2em;
  height: 3.5em;
}
</style>