<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Error',
  props: {
    error: {
      type: [Error, String]
    }
  },
  computed: {
    message () {
      return (this.error && this.error.message) || this.error
    }
  }
})
</script>

<template>
  <div class="error">
    {{ message }}
  </div>
</template>

<style>
.error {
  display: flex;
  align-items: center;
  padding-inline: 1em;
  padding-block: .5em;
  background-color: #EF4444;
  color: #FEE2E2;
}
</style>