<template>
  <div class="logo">
    <router-link to="/">
      <span>Play</span>
      <span>Time</span>
    </router-link>
  </div>
</template>

<style>
.logo span:first-child {
  font-weight: 400;
  color: var(--accent-color);
}
.logo span:last-child {
  font-weight: 600;
}
.logo a:focus {
  outline: none;
}
</style>