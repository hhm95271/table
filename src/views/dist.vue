<template>
  <div class="dist">
    <h2>dist</h2>
    <span class="cell">X：{{ point.x }}</span
    ><span class="cell">Y：{{ point.y }}</span>
  </div>
</template>

<script setup>
import useMousePosition from '../hooks/point';
let point = useMousePosition();
</script>

<style lang="scss" scoped>
.cell {
  color: rgba(255, 11, 235, 0.945);
  margin-right: 10vh;
}
</style>
