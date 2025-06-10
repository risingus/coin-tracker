<script lang="ts" setup>

import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { onMounted } from 'vue';

gsap.registerPlugin(SplitText)



onMounted(() => {
  document.fonts.ready.then(() => {

    SplitText.create('.test', {
      type: 'words, lines, chars',
      linesClass: 'line',
      autoSplit: true,
      mask: 'lines',
      onSplit: (self) => {
        return gsap.from(self.lines, {
          duration: 1,
          yPercent: 100,
          opacity: 0,
          stagger: 0.15,
          ease: 'expo.inOut'
        })
      }
    })
  })


})

</script>


<template>

  <span class='test'>
    Lorem ipsum dolor sit amet <br />
    consectetur adipisicing elit. <br />
    Eveniet sit tempora reiciendis dicta voluptas! <br />
    Beatae ducimus, inventore ullam repellendus velit enim provident sint
    perferendis.<br />
    Voluptatem eius similique dolore ab blanditiis!
  </span>

</template>


<style scoped></style>