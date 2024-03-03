<template>
  <a-table
    class="ant-table-striped"
    :scroll="{ x: 'max-content' }"
    :row-selection="
      props.selection
        ? { selectedRowKeys: selectedRowKeys, onChange: onSelectChange }
        : null
    "
    :row-class-name="
      (_record, index) => (index % 2 === 1 ? 'table-striped' : null)
    "
    :row-key="props.rowKey"
    :columns="props.columns"
    :data-source="dataSource"
    :bordered="props.bordered"
    :loading="loading"
    :pagination="props.pagination && pagination"
    @change="handleTableChange"
    size="small"
  >
    <template #bodyCell="{ column, record }">
      <!--  自定义插槽   -->
      <slot
        v-if="column.slot"
        :name="column.slot"
        :record="record"
        :dataSource="dataSource"
      ></slot>
      <!--   增加tooltip弹出框   -->
      <a-tooltip v-else-if="column.ellipsis === true">
        <template #title>
          <div>{{ formatRecordValue(record, column) }}</div>
        </template>
        <div :style="{ width: column.width + 'px' }">
          <rest-table-item :record="record" :column="column"></rest-table-item>
        </div>
      </a-tooltip>
      <span v-else>
        <rest-table-item :record="record" :column="column"></rest-table-item>
      </span>
    </template>
    <template v-if="props.expand === true" #expandedRowRender="{ record }">
      <slot name="expandedRowRender" :record="record"> </slot>
    </template>
  </a-table>
</template>
<script setup lang="ts">
import RestTableItem from './components/VATableItem.vue';
import { defineProps, defineExpose } from 'vue';
import propsOptions from './extends/props';
import {
  useRequestPagination,
  formatRecordValue,
  useSelection,
} from './extends/hooks';
import { useRoute, useRouter } from 'vue-router';

const props = defineProps(propsOptions);
const route = useRoute();
const router = useRouter();

const to = () => {
  router.push({
    path: route.path,
    query: {
      ...route.query,
      page: pagination.value.current,
      size: pagination.value.pageSize,
    },
  });
};

const page = Number(route.query.page || 1);
const size = Number(route.query.size || 20);

const {
  loading,
  pagination,
  data: dataSource,
  handleTableChange,
  reload,
} = useRequestPagination(
  props.uri || '',
  props.defaultParams,
  page,
  size,
  to,
  props.manual,
    props.format
);

const { data: selectedRowKeys, change: onSelectChange } = useSelection();

defineExpose({ reload, selectedRowKeys, dataSource });
</script>
<style scoped></style>
