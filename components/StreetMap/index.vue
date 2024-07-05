<script setup lang="ts">
import { ref } from 'vue'


const center = ref([40, 40])
const projection = ref('EPSG:4326')
const zoom = ref(8)
const rotation = ref(0)

</script>

<template>
  <ol-map :loadTilesWhileAnimating="true" :loadTilesWhileInteracting="true" style="width:100vw;height:400vh">
    <ol-view :center="center" :rotation="rotation" :zoom="zoom"
             :projection="projection" />
    <ol-tile-layer>
      <ol-source-osm />
    </ol-tile-layer>
  </ol-map>
</template>

<style scoped>
.container {
  width: 100vw;
  height: 100vh;
}

</style>