<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'GameplayTable',
  props: {
    type: {
      type: String,
      required: true
    },
    data: {
      type: Array,
      required: true
    }
  },
  computed: {
    columns() {
      switch (this.type) {
        case 'single':
          return ['average', 'median', 'rushed', 'leisure']
        case 'multi':
          return ['average', 'median', 'least', 'most']
        case 'dlc':
        case 'mainGame':
          return ['main', 'extended', 'completionist', 'all']
        case 'speedrun':
          return ['average', 'median', 'fastest', 'slowest']
        case 'platforms':
          return ['main', 'extended', 'completionist', 'fastest', 'longest']
        default:
          return []
      }
    }
  },
  methods: {
    icon (type) {
      switch (type) {
        case 'Main Story':
          return 'main'
        case 'Main + Extras':
          return 'extended'
        case 'Completionists':
        case '100%':
          return 'complete'
        case 'All PlayStyles':
        case 'Any%':
          return 'all'
        case 'Co-Op':
          return 'coop'
        case 'Competitive':
          return 'multi'
        default:
          return ''
      }
    },
    label (type) {
      switch (type) {
        case 'average':
          return '(avg)'
        case 'median':
          return '(med)'
        case 'Main Story':
          return 'Main'
        case 'Main + Extras':
          return 'Extended'
        case 'Completionists':
        case '100%':
          return 'Complete'
        case 'All PlayStyles':
          return 'All'
        case 'Any%':
          return 'Any'
        default:
          return type
      }
    }
  }
})
</script>

<template>
  <table class="gameplay-table" :data-type="type">
    <thead>
      <tr>
        <th data-column="type">
          <!-- type -->
        </th>
        <th data-column="polled">
          <i class="icon polled" />
          <span class="label-hint" tabindex="0">Polled</span>
        </th>
        <th v-for="column in columns" :key="column" :data-column="column">
          <i v-if="!['average', 'median'].includes(column)"
            :class="`icon ${column}`" />
          <span v-else class="no-icon">{{ label(column) }}</span>
          <span class="label-hint" tabindex="0">{{ column.charAt(0).toUpperCase() + column.slice(1) }}</span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(gameplay, index) in data" :key="index">
        <td v-if="type === 'dlc' || type === 'platforms'">
          <span>{{ gameplay.platform || gameplay.name }}</span>
          <span class="label-hint" tabindex="0">{{ gameplay.platform || gameplay.name }}</span>
        </td>
        <td v-else>
          <i :class="`icon ${icon(gameplay.type)}`"></i>
          <span class="label-hint" tabindex="0">{{ label(gameplay.type) }}</span>
        </td>
        <td>{{ gameplay.polled }}</td>
        <td v-for="column in columns" :key="column">{{ gameplay[column] || '-' }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style>
.gameplay-table {
  table-layout: fixed;
  width: 100%;
  border-spacing: .3em;
}
.gameplay-table thead th {
  vertical-align: middle;
  text-align: center;
}
.gameplay-table thead th[data-column="polled"] {
  width: 5em;
}
.gameplay-table[data-type="single"] thead tr th:first-child,
.gameplay-table[data-type="multi"] thead tr th:first-child,
.gameplay-table[data-type="speedrun"] thead tr th:first-child {
  width: 2.5em;
}
.gameplay-table .label-hint {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  top: 0;
  height: 100%;
  min-width: 100%;
  border-radius: .3em;
  background-color: var(--fg-color);
  color: var(--bg-color);
  cursor: pointer;
  opacity: 0;
  padding: 0 1em;
  padding-inline: 1em;
  z-index: 1;
  transition: opacity .1s ease;
}
.gameplay-table .label-hint:hover,
.gameplay-table .label-hint:focus {
  opacity: 1;
  outline: none;
}
.gameplay-table thead th .no-icon {
  font-size: .9em;
}
.gameplay-table tbody tr td:not(:first-child) {
  background-color: var(--bg-shade-1);
  border-radius: .3em;
  text-align: center;
  transition: background-color .1s ease;
}
.gameplay-table tbody tr:hover td:not(:first-child) {
  background-color: var(--accent-color);
}
.gameplay-table tr > td > *:not(.label-hint) {
  text-overflow: ellipsis;
  overflow: hidden;
  display: block;
}
.gameplay-table tbody tr td:first-child .label-hint {
  justify-content: start;
  margin-left: -1em;
}
.gameplay-table tr > * {
  white-space: nowrap;
  position: relative;
  display: none;
  height: 1.8em;
}
.gameplay-table tr > :nth-child(1),
.gameplay-table tr > :nth-child(2),
.gameplay-table tr > :nth-child(3) {
  display: table-cell;
}
@media (min-width: 560px) {
  .gameplay-table tr > :nth-child(4) {
    display: table-cell;
  }
}
@media (min-width: 600px) {
  .gameplay-table tr > :nth-child(5) {
    display: table-cell;
  }
}
@media (min-width: 680px) {
  .gameplay-table tr > :nth-child(6),
  .gameplay-table tr > :nth-child(7) {
    display: table-cell;
  }
}
</style>