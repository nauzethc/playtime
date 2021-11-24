<script>
import { defineComponent } from 'vue'
import Spinner from '../components/Spinner.vue'
import Error from '../components/Error.vue'
import GameplayTable from '../components/game/GameplayTable.vue'
import GameplayChart from '../components/game/GameplayChart.vue'

export default defineComponent({
  name: 'Game',
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  components: {
    Spinner,
    Error,
    GameplayTable,
    GameplayChart
  },
  data() {
    return {
      game: {},
      error: null,
      pending: false,
      collapsed: true
    }
  },
  computed: {
    stats() {
      if (this.game.stats) {
        return [
          { label: 'Playing', value: this.game.stats.playing },
          { label: 'Beat', value: this.game.stats.beat },
          { label: 'Backlogs', value: this.game.stats.backlogs },
          { label: 'Rating', value: `${(this.game.stats.rating || 0) * 100}%` },
          { label: 'Retired', value: `${(this.game.stats.retired || 0) * 100}%` },
          { label: 'Replays', value: this.game.stats.replays }
        ]
      }
      return []
    },
    developers() {
      return this.game.developers
        ? this.game.developers.join(', ')
        : 'Unknown developer'
    }
  },
  methods: {
    tableTitle(type) {
      switch (type) {
        case 'single':
          return 'Single-player'
        case 'multi':
          return 'Multi-player'
        case 'dlc':
          return 'DLC'
        default:
          return type.charAt(0).toUpperCase() + type.slice(1)
      }
    },
    async fetchData() {
      this.pending = true
      try {
        const res = await this.$fetch(`${API_BASE_URL}/games/${this.id}`)
        if (res.status === 200) {
          this.game = await res.json()
          this.error = null
        } else {
          this.error = new Error(`Couldn't retrieve data from server`)
        }
      } catch (error) {
        this.error = error
      }
      this.pending = false
    }
  },

  // Fetch data on params (ID) change
  created() {
    this.$watch(
      () => this.$route.params,
      () => this.fetchData(),
      { immediate: true }
    )
  }
})
</script>

<template>
  <Spinner v-if="pending" />
  <Error v-else-if="error" :error="error" />
  <div id="game-page" v-else-if="game">
    <!-- Header -->
    <div class="header" :style="{ backgroundImage: `url(${game.imageUrl})` }">
      <div class="media">
        <img class="cover" :src="game.imageUrl" :alt="game.name" />
      </div>
      <div class="metadata">
        <h2 class="title">{{ game.name }}</h2>
        <h3 class="developers">{{ developers }}</h3>
        <ul class="genres">
          <li v-for="genre in game.genres" :key="genre">{{ genre }}</li>
        </ul>
      </div>
      <div class="stats">
        <ul>
          <li v-for="({ label, value }) in stats" :key="label">
            <span class="label">{{ label }}</span>
            <span class="value">{{ value }}</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- Additional metdata -->
    <div
      class="additional-data"
      :class="{ collapsed }"
      :style="{ backgroundImage: `url(${game.imageUrl})` }"
    >
      <p>{{ game.description }}</p>
    </div>
    <button id="expand-button" @click.prevent="collapsed = !collapsed">
      <i v-if="collapsed" class="icon down" />
      <i v-else class="icon up" />
    </button>

    <!-- Gameplays -->
    <div class="gameplays">
      <div class="section" v-for="(data, gameplay) in game.gameplays" :key="gameplay">
        <h3>{{ tableTitle(gameplay) }}</h3>
        <hr />
        <GameplayTable :data="data" :type="gameplay" />
      </div>
      <div class="chart" v-if="game.gameplays.platforms">
        <GameplayChart :data="game.gameplays.platforms" />
      </div>
    </div>
  </div>
</template>

<style>
.spinner {
  align-self: center;
  margin-block: 1em;
}
#game-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}
#game-page .header {
  background-size: 1px 1px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding-block: 2em;
  padding-inline: 1em;
  gap: 1.5em;
  text-shadow: 0 1px hsl(0 0% 50% / 0.7);
}
#game-page .media {
  flex-shrink: 0;
  max-width: 5em;
}
#game-page .media .cover {
  display: block;
  width: 100%;
  overflow: hidden;
  border-radius: 0.5em;
}
#game-page .metadata {
  display: flex;
  min-width: 30%;
  flex-direction: column;
  gap: 0.5em;
}
#game-page .metadata .title {
  font-weight: 500;
}
#game-page .metadata .developers {
  font-weight: 300;
  font-size: 1em;
}
#game-page .metadata .genres li {
  display: inline;
}
#game-page .metadata .genres li:not(:last-child)::after {
  content: ", ";
}
#game-page .stats {
  flex-grow: 1;
}
#game-page .stats ul {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5em;
}
#game-page .stats li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5em;
  border-radius: 0.5em;
  padding-block: 0.3em;
  padding-inline: 0.8em;
  background-color: hsl(0 0% 100% / 0.1);
}
#game-page .stats li .value {
  font-weight: 500;
}
#game-page .additional-data {
  padding-block: 2em;
  padding-inline: 1em;
  background-size: 1px 1px;
  background-color: var(--bg-color);
  background-blend-mode: screen;
  text-shadow: 0 1px hsl(0 0% 50% / 0.7);
}
#game-page .additional-data.collapsed {
  display: none;
}
#game-page #expand-button {
  cursor: pointer;
  border: 0;
  border-radius: 50%;
  width: 2.5em;
  height: 2.5em;
  display: grid;
  place-content: center;
  margin-top: -1.25em;
  margin-right: 1em;
  align-self: flex-end;
  background-color: var(--bg-shade-1);
  color: var(--fg-color);
  transition: background-color 0.3s ease;
}
#game-page #expand-button:hover,
#game-page #expand-button:focus {
  outline: none;
  background-color: var(--bg-shade-2);
}
#game-page .gameplays {
  display: flex;
  flex-direction: column;
  padding-block: 2em;
  padding-inline: 1em;
  gap: 2em;
}
#game-page .gameplays .chart {
  padding-block: 2em;
  padding-inline: 1em;
}
@media (min-width: 640px) {
  #game-page .stats ul {
    grid-template-columns: 1fr;
  }
}
@media (min-width: 768px) {
  #game-page .stats ul {
    grid-template-columns: 1fr 1fr;
  }
  #game-page .media {
    max-width: 8em;
  }
}
</style>