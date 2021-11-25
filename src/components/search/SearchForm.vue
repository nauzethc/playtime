<script>
import { defineComponent } from "vue";
import { debounce, throttle } from 'underscore'
import { Platform, SortBy, Genre } from "howlongtobeat-api";

const DEFAULTS = {
  search: '',
  sortBy: undefined,
  platform: undefined,
  genre: undefined
}

export default defineComponent({
  name: 'SearchForm',
  props: {
    initialData: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['submit'],
  data() {
    return {
      form: { ...DEFAULTS, ...this.initialData },
      collapsed: true
    }
  },
  computed: {
    cleanedData() {
      return Object.fromEntries(
        Object.entries(this.form).filter(pair => pair[1] !== undefined)
      )
    },
    platforms() {
      return Platform
    },
    genres() {
      return Genre
    },
    sortBy() {
      return SortBy
    }
  },
  methods: {
    submit: throttle(function () {
      this.$emit('submit', { ...this.cleanedData })
    }, 500, { trailing: false }),
    input: debounce(function () {
      if (this.form.search.length >= 3) {
        this.submit()
      }
    }, 500),
    change: debounce(function () {
      this.submit()
    }),
    toggle() {
      this.collapsed = !this.collapsed
    },
    withSpaces (label) {
      return label ? label.replace(/([A-Z])/g, ' $1') : ''
    }
  }
})
</script>

<template>
  <form @submit.prevent="submit" class="search-form">
    <!-- Search -->
    <div class="field search">
      <input type="text" v-model="form.search" @input="input" placeholder="Search..." />
      <svg class="icon" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path
          fill-rule="evenodd"
          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
          clip-rule="evenodd"
        />
      </svg>
      <button @click.prevent="toggle">
        <i v-if="collapsed" class="icon down" />
        <i v-else class="icon up" />
      </button>
    </div>

    <fieldset class="advanced" :class="{ collapsed }">
      <!-- Sort by -->
      <div class="field sortBy">
        <label for="sortBy">Sort by</label>
        <select name="sortBy" v-model="form.sortBy" @change="change">
          <option :value="undefined" disabled>Select...</option>
          <option v-for="(value, name) in sortBy" :key="value" :value="value">{{ withSpaces(name) || 'All' }}</option>
        </select>
      </div>

      <!-- Platform -->
      <div class="field platform">
        <label for>Platform</label>
        <select name="platform" v-model="form.platform" @change="change">
          <option :value="undefined" disabled>Select...</option>
          <option v-for="(value, name) in platforms" :key="value" :value="value">{{ value || 'All' }}</option>
        </select>
      </div>

      <!-- Genre -->
      <div class="field genre">
        <label for>Genre</label>
        <select name="genre" v-model="form.genre" @change="change">
          <option :value="undefined" disabled>Select...</option>
          <option v-for="(value, name) in genres" :key="value" :value="value">{{ value || 'All' }}</option>
        </select>
      </div>
    </fieldset>
  </form>
</template>

<style>
.search-form {
  display: flex;
  flex-direction: column;
}
.search-form .field.search {
  position: relative;
}
.search-form .field.search input {
  font-size: 1.2em;
  height: 3em;
  padding: 0 3em;
  padding-inline: 3em;
  width: 100%;
}
.search-form .field.search > .icon {
  opacity: 0.5;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  margin: 0 1em;
  margin-inline: 1em;
  width: 2em;
  height: 3.5em;
}
.search-form .field.search button {
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 4em;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: hsl(0 0% 100% / .1);
  color: var(--fg-color);
  border: 0;
}
.search-form .field.search button:hover,
.search-form .field.search button:focus {
  background-color: hsl(0 0% 100% / .3);
  outline: none;
}
.search-form fieldset {
  display: grid;
  border: 0;
  padding: 1em;
  padding-block: 1em;
  padding-inline: 1em;
  gap: 1em;
  background-color: hsl(0 0% 0% / 0.2);
}
.search-form fieldset .field {
  display: flex;
  flex-direction: column;
  gap: 0.2em;
}
.search-form fieldset .field > * {
  flex-grow: 1;
  flex-shrink: 0;
}
.search-form fieldset.collapsed {
  display: none;
}

@media (min-width: 640px) {
  .search-form fieldset {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
</style>