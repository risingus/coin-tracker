<template>
  <div class="h">
    <!-- <h1>Purple Haze</h1>
    <h2>CSS only smoke effect</h2> -->
    <div
      v-for="i in 60"
      :key="i"
      class="c"
      :style="getCircleStyle(i)"
    ></div>
  </div>
</template>

<script setup>
const getCircleStyle = (i) => {
  const width = `${i * 0.8}vmin`;
  const height = `${i * 0.2}vmin`;
  const right = `${i * 1.5}vmin`;
  const bottom = `${i * 1.5}vmin`;
  const blur = `${i / 3 + 8}px`;
  const transformOrigin = `${i * 0.6}vmin ${i * 0.3}vmin`;
  const delay = `${i / 10}s`;
  const r = 90 + i * 3;
  const g = 33 + i;
  const b = 205;
  const a = 1 - i / 80;
  const background = `rgba(${r}, ${g}, ${b}, ${a})`;

  return {
    width,
    height,
    right,
    bottom,
    filter: `blur(${blur})`,
    transformOrigin,
    animationDelay: delay,
    background,
  };
};
</script>

<style scoped>
/* @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400&display=swap'); */

body {
  margin: 0;
  font-family: 'Lato', sans-serif;
}

.h {
  position: relative;
  width: 98vw;
  height: 95vh;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}



.c {
  position: absolute;
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  margin: auto;
  animation: spin 3s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
