<script setup lang="ts">
type OptionGroupProps = {
  active: boolean;
}
const props = defineProps<OptionGroupProps>()


</script>

<template>
    <div v-if="active" class="optionGroup">
      <slot />
    </div>
</template>

<style scoped lang="less">
.optionGroup {
  position: relative;
}

</style>