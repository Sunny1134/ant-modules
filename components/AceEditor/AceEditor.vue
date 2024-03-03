<template>
  <v-ace-editor
    v-model:value="editorValue"
    :lang="options.mode || 'javascript'"
    :theme="options.theme || 'monokai'"
    :style="`height:${options.height || '200px'}`"
    :wrap="true"
    @change="change"
    @input="input"
  />
</template>

<script lang="ts" setup>
import {
  computed,
  defineProps,
  PropType,
  onMounted,
  defineEmits,
  ref,
  watch,
} from 'vue';
import { AceEditorOptions } from './typing';
import { VAceEditor } from 'vue3-ace-editor';
import 'brace/mode/javascript';
import 'brace/mode/markdown';
import 'brace/mode/text';
import 'brace/mode/json';
import 'brace/mode/html';

import 'brace/theme/monokai';
import 'brace/theme/github';
import 'brace/theme/chrome';
import 'brace/theme/eclipse';
import 'brace/theme/sqlserver';
import 'brace/theme/twilight';
const emit = defineEmits(['update:value']);

const props = defineProps({
  value: {
    type: String,
    required: true,
  },
  options: {
    type: Object as PropType<AceEditorOptions>,
    default: () => {
      return {
        mode: 'javascript',
        theme: 'monokai',
        height: '200px',
      };
    },
  },
  disabled: {
    type: Boolean,
  },
  placeholder: {
    type: String,
  },
});
const editorValue = ref(props.value);
watch(
  () => editorValue.value,
  (val) => {
    emit('update:value', val);
  }
);
watch(
  () => props.value,
  (val) => {
    if (val !== editorValue.value) {
      editorValue.value = val;
    }
  }
);
</script>

<style scoped></style>
