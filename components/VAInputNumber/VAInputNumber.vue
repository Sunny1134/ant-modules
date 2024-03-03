<template>
  <a-input-number
    :value="value"
    :disabled="disabled"
    :placeholder="placeholder"
    @change="change"
    style="width: 100%"
    :addon-after="addonAfter"
    :addon-before="addonBefore"
  />
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';

const emit = defineEmits(['update:value']);

defineProps({
  value: {
    type: Number,
    required: true,
  },
  disabled: {
    type: Boolean,
  },
  placeholder: {
    type: String,
  },
  addonAfter: {
    type: String,
    default: '',
  },
  addonBefore: {
    type: String,
    default: '',
  },
});

const change = (value: number) => {
  emit('update:value', value);
};
</script>

<style scoped></style>
