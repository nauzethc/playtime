<script>
import { defineComponent } from 'vue'
import Spinner from '../components/Spinner.vue'
import Error from '../components/Error.vue'
import SearchForm from '../components/search/SearchForm.vue'
import GameResult from '../components/search/GameResult.vue'

export default defineComponent({
  name: 'Search',
  components: {
    Spinner,
    Error,
    SearchForm,
    GameResult
  },
  data() {
    return {
      total: 0,
      games: [],
      error: null,
      pending: false,
      errorPage: null,
      pendingPage: false,
      page: 1
    }
  },
  computed: {
    hasMore() {
      return this.total > this.games.length
    }
  },
  methods: {
    async fetchData() {
      this.pending = true
      try {
        const query = new URLSearchParams(this.$route.query)
        const res = await fetch(`/api/games?${query}`)
        if (res.status === 200) {
          const { total, data } = await res.json()
          this.games = data
          this.total = total
          this.error = null
        } else {
          this.error = new Error(`Couldn't retrieve data from server`)
        }
      } catch (error) {
        this.error = error
      }
      this.pending = false
    },
    async loadMore() {
      if (this.hasMore && !this.pending && !this.pendingPage) {
        this.pendingPage = true
        try {
          this.page = this.page + 1
          const query = new URLSearchParams({ ...this.$route.query, page: this.page })
          const res = await fetch(`/api/games?${query}`)
          if (res.status === 200) {
            const { data } = await res.json()
            this.games = [...this.games, ...data]
            this.errorPage = null
          } else {
            this.errorPage = new Error(`Couldn't retrieve data from server`)
          }
        } catch (error) {
          this.errorPage = error
        }
        this.pendingPage = false
      }
    },
    submit(query) {
      this.$router.push({ name: 'search', query })
    }
  },

  // Fetch data on query change
  created() {
    this.$watch(
      () => this.$route.query,
      () => this.fetchData(),
      { immediate: true }
    )
  },

  // Use IntersectionObserver to handle infinite-scroll pattern
  mounted() {
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => entry.isIntersecting && this.loadMore())
    }, {
      rootMargin: '0px',
      threshold: 1.0
    })
    this.observer.observe(document.querySelector('#load-more'))
  },
  beforeUnmount() {
    if (this.observer !== null) this.observer.disconnect()
  }
})
</script>

<template>
  <div id="search-page">
    <SearchForm :initial-data="$route.query" @submit="submit" />
    <Spinner v-if="pending" />
    <Error v-else-if="error" :error="error" />
    <div class="results" v-else>
      <GameResult v-for="game in games" :key="game.id" :data="game" />
    </div>
    <Spinner v-if="pendingPage" />
    <Error v-else-if="errorPage" :error="errorPage" />
    <div id="load-more" />
  </div>
</template>

<style>
#search-page,
#search-page .results {
  display: grid;
}
#search-page .spinner {
  justify-self: center;
  margin-block: 1em;
}
#search-page .results .game-result {
  min-height: 10.5em;
}
@media (max-width: 639px) {
  #search-page .results .game-result:nth-of-type(2n) {
    background-color: var(--bg-shade-1);
  }
}
@media (min-width: 640px) {
  #search-page .results {
    grid-template-columns: 1fr 1fr;
  }
  #search-page .results .game-result:nth-of-type(4n),
  #search-page .results .game-result:nth-of-type(4n-1) {
    background-color: var(--bg-shade-1);
  }
}
</style>