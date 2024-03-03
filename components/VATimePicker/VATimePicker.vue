<template>
  <a-time-picker :value="value" value-format="HH:mm:ss" @change="onChange"/>
</template>

<script setup lang="ts">
import {defineProps} from "vue";

const emit = defineEmits(['update:value'])
const props = defineProps({
  value: String
})

const onChange = (time: string) =>{
  emit("update:value", time)
}

</script>

<style scoped>

</style>
