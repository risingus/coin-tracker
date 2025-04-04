<script lang='ts' setup>

</script>

<template>
  <main>
    <section>
    <div class="grid">
      <div class="cell">
        <p>Normal Sparrow</p>
        <img src="https://assets.codepen.io/2153413/sparrow-base.png" alt="Silhouette design of a sparrow sitting on a branch" width="512" class="framed">
      </div>
      <div class="cell">
        <p>Fancy Sparrow ✨</p>
        <div class="shader framed">
          <img src="https://assets.codepen.io/2153413/sparrow-base.png" alt="Silhouette design of a sparrow sitting on a branch" width="512">
          <div class="shader-layer specular gradient-sparrow">
            <img class="shader-layer mask" src="https://assets.codepen.io/2153413/sparrow-mask.png" alt="" width="300">
          </div>
        </div>
      </div>
    </div>
  </section>

  <div class="cell">
        <p>Mandala</p>
        <div class="shader framed">
          <img src="https://assets.codepen.io/2153413/mandala-base.png" alt="Mandala design which looks like a flower, made symetry patterns" width="512">
          <div class="shader-layer specular gradient-mandala">
            <img class="shader-layer mask" src="https://assets.codepen.io/2153413/mandala-mask.png" alt="" width="512">
          </div>
        </div>
      </div>
  </main>



</template>

<style scoped>
main {
  height: 300rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}


.shader {
  background-color: white;
  position: relative;
  overflow: hidden;
  backface-visibility: hidden; /* Forces GPU */
}

.shader-layer {
  background: black;
  mix-blend-mode: multiply;
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background-position: center;
}

.specular {
  mix-blend-mode: color-dodge;
  background-attachment: fixed;
}

.mask {
  mix-blend-mode: multiply;
}

.gradient-sparrow {
  background-image: linear-gradient(
    0deg,
    hsl(359, 60%, 40%),
    hsl(16, 60%, 45%),
    hsl(33, 60%, 50%),
    hsl(45, 60%, 55%),
    hsl(58, 60%, 60%),
    hsl(58, 60%, 65%),
    hsl(58, 60%, 70%),
    hsl(96, 60%, 65%),
    hsl(146, 60%, 60%),
    hsl(183, 60%, 55%),
    hsl(225, 60%, 50%),
    hsl(265, 60%, 45%),
    hsl(303, 60%, 40%)
  );
}

.gradient-mandala {
  background-image: linear-gradient(
    30deg,
    hsl(30, 80%, 20%) 0%,
    hsl(30, 80%, 80%) 10%,
    hsl(30, 80%, 20%) 20%,
    hsl(30, 80%, 80%) 30%,
    hsl(30, 80%, 20%) 35%,
    hsl(30, 80%, 80%) 50%,
    hsl(30, 80%, 20%) 65%,
    hsl(30, 80%, 80%) 70%,
    hsl(30, 80%, 20%) 80%,
    hsl(30, 80%, 80%) 90%,
    hsl(30, 80%, 20%) 100%
  );
}


</style>