<template>
  <div class="about">
    <header>回收站</header>
    <el-table
      :header-cell-style="{ 'text-align': 'center;', color: '#333' }"
      border
      height="350px"
      :data="data.tableData"
      style="width: 100%"
    >
      <el-table-column width="50" label="#" align="center" type="index" />
      <el-table-column
        align="center"
        sortable
        prop="zh"
        label="商品名称"
        width="180"
      />

      <el-table-column align="center" prop="level" label="商品热度">
        <template v-slot="scope">
          <span
            v-if="scope.row.level === 1"
            style="display: flex; justify-content: center; align-items: center"
          >
            <svg
              style="color: red"
              class="icon"
              width="20"
              height="15"
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
              data-v-042ca774=""
            >
              <path
                fill="currentColor"
                d="M512 64h64v192h-64V64zm0 576h64v192h-64V640zM160 480v-64h192v64H160zm576 0v-64h192v64H736zM249.856 199.04l45.248-45.184L430.848 289.6 385.6 334.848 249.856 199.104zM657.152 606.4l45.248-45.248 135.744 135.744-45.248 45.248L657.152 606.4zM114.048 923.2L68.8 877.952l316.8-316.8 45.248 45.248-316.8 316.8zM702.4 334.848L657.152 289.6l135.744-135.744 45.248 45.248L702.4 334.848z"
              ></path>
            </svg>
            {{ hot(scope.row.level) }}</span
          >
          <span v-else>{{ hot(scope.row.level) }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="sort" label="好评">
        <template v-slot="scope">
          {{ scope.row.sort }} <slot>%</slot>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="query_use" label="热销">
        <template v-slot="scope">
          {{ scope.row.query_use === 1 ? '是' : '否' }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="status" label="状态">
        <template v-slot="scope">
          {{ scope.row.query_use === 1 ? '可售' : '不可售' }}
        </template>
      </el-table-column>
      <el-table-column sortable align="center" prop="weight" label="商品重量">
        <template v-slot="scoped">
          <span>{{ scoped.row.weight !== null ? scoped.row.weight : 0 }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template v-slot="scope">
          <el-tooltip
            class="box-item"
            effect="dark"
            content="恢复"
            placement="bottom"
          >
            <el-icon class="cursor" @click="() => scope"><Sell /></el-icon>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { reactive, onMounted, computed } from 'vue';
import { Sell } from '@element-plus/icons-vue';
import axios from 'axios';
const data = reactive({
  tableData: [],
});
onMounted(() => {
  recover().then((res) => {
    // data.tableData = res.data;
    data.tableData = res.data;
  });
});
const recover = () => {
  return axios({
    url: '/api/shopping/shoppingRecover',
  });
};
const hot = computed(() => (num) => {
  if (num === 1) {
    return '火爆';
  } else if (num === 2) {
    return '一般';
  } else {
    return '较差';
  }
});
</script>

<style scoped>
.cursor {
  cursor: pointer;
}
header {
  font-size: 20px;
  font-weight: 800;
  margin-bottom: 20px;
}
</style>
