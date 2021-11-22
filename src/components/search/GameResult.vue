<script>
import { defineComponent } from 'vue'
import ProgressBar from '../ProgressBar.vue'


export default defineComponent({
  name: 'GameResult',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  components: { ProgressBar },
  computed: {
    gameplays() {
      const max = Math.max.apply(null, [
        this.data.gameplayMain || 0,
        this.data.gameplayExtended || 0,
        this.data.gameplayCompletionist || 0,
        this.data.gameplayMulti || 0
      ])
      return [
        { label: 'Main', field: 'gameplayMain', icon: 'main' },
        { label: 'Extended', field: 'gameplayExtended', icon: 'extended' },
        { label: 'Complete', field: 'gameplayCompletionist', icon: 'complete' },
        { label: 'Multiplayer', field: 'gameplayMulti', icon: 'multi' },
      ].map(
        ({ label, field, icon }) => ({
          label,
          icon,
          value: this.data[field] ? (this.data[field].toFixed(1)) : 0,
          percent: (this.data[field] || 0) * 100 / max
        })
      ).filter(g => g.value)
    }
  }
})
</script>

<template>
  <div class="game-result">
    <div class="media">
      <router-link :to="{ name: 'game', params: { id: data.id } }">
        <img class="cover" :src="data.imageUrl" :alt="data.name" />
      </router-link>
    </div>
    <div class="metadata">
      <h3>
        <router-link :to="{ name: 'game', params: { id: data.id } }">{{ data.name }}</router-link>
      </h3>
      <ul>
        <li v-for="(gameplay, index) in gameplays" :key="index">
          <i :class="`icon ${gameplay.icon}`" :aria-label="gameplay.label" />
          <span class="label" aria-hidden="true">{{ gameplay.label }}</span>
          <span class="value" aria-hidden="true">{{ gameplay.value }}h</span>
          <ProgressBar
            :value="gameplay.percent"
            :label="`${gameplay.value}h`"
            :help-text="gameplay.label"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
.game-result {
  display: flex;
  gap: 1em;
  padding-block: 1em;
  padding-inline: 1em;
}
.game-result .media {
  max-width: 6em;
  width: 100%;
  flex-shrink: 0;
}
.game-result .media .cover {
  width: 100%;
  overflow: hidden;
  border-radius: 0.5em;
}
.game-result .metadata {
  display: table;
  table-layout: fixed;
  width: 100%;
}
.game-result .metadata h3 {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 0.5em;
}
.game-result .metadata ul {
  display: flex;
  flex-direction: column;
  gap: 0.3em;
}
.game-result .metadata ul li {
  display: flex;
  gap: 0.5em;
}
.game-result .metadata ul li .icon {
  flex-grow: 0;
  flex-shrink: 0;
}
.game-result .metadata ul li .progress-bar {
  height: 1.5em;
}
.game-result .metadata ul li:nth-of-type(1) .progress-bar .fill-bar {
  background-color: var(--accent-color);
}
.game-result .metadata ul li:nth-of-type(2) .progress-bar .fill-bar {
  background-color: var(--bg-shade-2);
}
.game-result .metadata ul li:nth-of-type(3) .progress-bar .fill-bar {
  background-color: var(--bg-shade-3);
}
</style>