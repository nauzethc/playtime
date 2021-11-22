<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ProgressBar',
  props: {
    value: {
      type: Number,
      default: 0
    },
    label: {
      type: String,
      default: ''
    },
    helpText: {
      type: String,
      default: ''
    }
  }
})
</script>

<template>
  <div class="progress-bar" :class="{ 'has-help': !!helpText }">
    <div class="fill-bar" :style="{ maxWidth: `${value}%` }" />
    <span class="help-text" tabindex="0" :style="{ maxWidth: `${value}%` }">{{ helpText }}</span>
    <span class="label">{{ label }}</span>
  </div>
</template>

<style>
.progress-bar {
  width: 100%;
  height: 1em;
  border-radius: 0.3em;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  padding-inline: 0.5em;
}
.progress-bar .fill-bar {
  position: absolute;
  left: 0;
  bottom: 0;
  top: 0;
  min-width: fit-content;
  border-radius: 0.3em;
  background-color: currentColor;
  display: flex;
  align-items: center;
  padding-inline: 0.5em;
  animation: fill-bar 1s ease forwards;
  transition: background-color 0.3s ease;
}
.progress-bar .help-text {
  display: none;
  position: absolute;
  left: 0;
  bottom: 0;
  top: 0;
  border-radius: 0.3em;
  background-color: var(--fg-color);
  color: var(--bg-color);
  width: 100%;
  min-width: fit-content;
  align-items: center;
  padding-inline: 0.5em;
  z-index: 2;
  cursor: pointer;
  transition: opacity 0.3s ease;
}
.progress-bar.has-help .help-text {
  display: block;
  opacity: 0;
}
.progress-bar.has-help .help-text:focus,
.progress-bar.has-help .help-text:hover {
  opacity: 1;
  outline: none;
}
.progress-bar .label {
  z-index: 1;
  transition: opacity 0.3s ease;
}

@keyframes fill-bar {
  from {
    width: 0%;
    opacity: 0;
  }
  to {
    width: 100%;
    opacity: 1;
  }
}
</style>