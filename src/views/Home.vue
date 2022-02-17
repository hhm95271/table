<template>
  <div class="search">
    <el-input
      v-model="input"
      @keydown.enter="searchInputVal(input)"
      class="w-50 m-2"
      clearable
      placeholder="请输入需要查询的商品名称"
      :prefix-icon="Search"
    />
  </div>
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
      <template v-slot="scope"> {{ scope.row.sort }} <slot>%</slot> </template>
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
      <template v-slot="scope">
        <span v-show="!scope.row.change"
          ><svg
            @click="changeInputVal(scope.row)"
            style="margin-right: 15px"
            t="1639990532110"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="12171"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="12"
            height="12"
            data-v-042ca774=""
          >
            <path
              d="M199.04 672.64l193.984 112 224-387.968-193.92-112-224 388.032z m-23.872 60.16l32.896 148.288 144.896-45.696-177.792-102.592zM455.04 229.248l193.92 112 56.704-98.112-193.984-112-56.64 98.112zM104.32 708.8l384-665.024 304.768 175.936-383.936 665.088h0.064l-248.448 78.336-56.448-254.336z m384 254.272v-64h448v64h-448z"
              p-id="12172"
            ></path></svg
          >{{ scope.row.weight === null ? 0 : scope.row.weight }}
          <slot>kg</slot></span
        >
        <el-input
          autofocus="true"
          @input="InputVal(scope.row.weight)"
          @keydown.enter="preserveVal(scope.row)"
          v-show="scope.row.change"
          style="width: 70%"
          v-model="scope.row.weight"
        >
          <template #suffix>
            <span style="margin-right: 10px">kg</span>
            <svg
              @click="blurInput(scope.row)"
              style="margin-top: 8px"
              class="icon"
              width="20"
              height="18"
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
              data-v-042ca774=""
            >
              <path
                fill="currentColor"
                d="M195.2 195.2a64 64 0 0190.496 0L512 421.504 738.304 195.2a64 64 0 0190.496 90.496L602.496 512 828.8 738.304a64 64 0 01-90.496 90.496L512 602.496 285.696 828.8a64 64 0 01-90.496-90.496L421.504 512 195.2 285.696a64 64 0 010-90.496z"
              ></path>
            </svg>
          </template>
        </el-input>
      </template>
    </el-table-column>
    <el-table-column align="center" label="操作">
      <template v-slot="scope">
        <div
          style="
            margin: auto;
            width: 50%;
            display: flex;
            justify-content: space-between;
          "
        >
          <svg
            @click="
              () => {
                dialogVisible = true;
                scope;
              }
            "
            class="icon"
            style=""
            width="20"
            height="20"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
            data-v-042ca774=""
          >
            <path
              fill="currentColor"
              d="M512 64a448 448 0 110 896 448 448 0 010-896zm-38.4 409.6H326.4a38.4 38.4 0 100 76.8h147.2v147.2a38.4 38.4 0 0076.8 0V550.4h147.2a38.4 38.4 0 000-76.8H550.4V326.4a38.4 38.4 0 10-76.8 0v147.2z"
            ></path>
          </svg>
          <svg
            @click="deleteView(scope.row)"
            class="icon"
            width="20"
            height="20"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
            data-v-042ca774=""
          >
            <path
              fill="currentColor"
              d="M352 192V95.936a32 32 0 0132-32h256a32 32 0 0132 32V192h256a32 32 0 110 64H96a32 32 0 010-64h256zm64 0h192v-64H416v64zM192 960a32 32 0 01-32-32V256h704v672a32 32 0 01-32 32H192zm224-192a32 32 0 0032-32V416a32 32 0 00-64 0v320a32 32 0 0032 32zm192 0a32 32 0 0032-32V416a32 32 0 00-64 0v320a32 32 0 0032 32z"
            ></path>
          </svg>
        </div>
      </template>
    </el-table-column>
  </el-table>
  <div style="float: right" class="demo-pagination-block">
    <el-pagination
      v-model:currentPage="pageIndex"
      v-model:page-size="pageSize"
      :page-sizes="[20, 50, 100, 200]"
      :small="small"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
  <el-dialog v-model="dialogVisible" title="新增商品" width="40%" draggable>
    <el-form
      :rules="rules"
      :inline="true"
      label-position="left"
      class="demo-form-inline"
      label-width="auto"
      :model="formLabelAlign"
      style="max-width: 460px"
    >
      <el-form-item label="商品名称" prop="name">
        <el-input style="width: 125px" v-model="formLabelAlign.name"></el-input>
      </el-form-item>
      <el-form-item label="商品热度" prop="hot">
        <el-select
          style="width: 125px"
          v-model="formLabelAlign.hot"
          placeholder="请选择商品热度"
        >
          <el-option label="火爆" :value="1"></el-option>
          <el-option label="一般" :value="2"></el-option>
          <el-option label="较差" :value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="好评" prop="highOpinion">
        <el-input
          style="width: 125px"
          v-model="formLabelAlign.highOpinion"
        ></el-input>
      </el-form-item>
      <el-form-item label="热销" prop="likeCakes">
        <el-select
          style="width: 125px"
          v-model="formLabelAlign.likeCakes"
          placeholder="请选择商品热销"
        >
          <el-option label="是" :value="1"></el-option>
          <el-option label="否" :value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="state">
        <el-select
          style="width: 125px"
          v-model="formLabelAlign.state"
          placeholder="请选择状态"
        >
          <el-option label="可售" :value="1"></el-option>
          <el-option label="不可售" :value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品重量" prop="weight">
        <el-input
          style="width: 125px"
          v-model="formLabelAlign.weight"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确认</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import axios from 'axios';
import { nextTick, onMounted, ref, reactive, computed } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { Search } from '@element-plus/icons-vue';
let pageIndex = ref(1);
let pageSize = ref(20);
let input = ref('');
let dialogVisible = ref(false);
const small = ref(false);
const rules = reactive({
  name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
  hot: [{ required: true, message: '请选择商品热度', trigger: 'blur' }],
  highOpinion: [],
  likeCakes: [{ required: true, message: '请选择商品热销', trigger: 'change' }],
  state: [{ required: true, message: '请选择商品状态', trigger: 'change' }],
  weight: [
    { required: true, message: '请输入商品重量', trigger: 'blur' },
    { min: 1, max: 3, message: '商品重量不可超出 999 Kg' },
  ],
});
const formLabelAlign = reactive({
  name: '',
  hot: '',
  highOpinion: '',
  likeCakes: '',
  state: '',
  weight: '',
});
let data = reactive({
  tableData: [],
});
let total = ref(400);
// 搜索
const searchInputVal = (val) => {
  if (!val) {
    getData();
    return;
  }
  input.value = val;
  serachInputVals({
    value: input.value,
    pageSize: pageSize.value,
    pageIndex: pageIndex.value,
  }).then((res) => {
    console.log(res);
    data.tableData = res.data.data;
    total.value = res.data.total;
  });
};
const handleSizeChange = (val) => {
  pageSize.value = val;
  getData();
};

const handleCurrentChange = (val) => {
  pageIndex.value = val;
  getData();
};

let weight;
function InputVal(val) {
  if (val > 100) {
    ElMessage({
      type: 'warning',
      message: '商品重量不可大于100！',
    });
    return;
  } else if (val === '' || !val) {
    ElMessage({
      type: 'warning',
      message: '请选择商品重量',
    });
    return;
  }
}
function changeInputVal(row) {
  row.change = true;
  weight = row.weight;
}
function blurInput(row) {
  nextTick(() => {
    row.change = false;
    row.weight = weight;
  });
}
const deleteView = (row) => {
  ElMessageBox.confirm('是否删除此条数据？', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      deleteShopping(row)
        .then((res) => {
          if (res.data.state === 'success') {
            ElMessage({
              type: 'success',
              message: `删除成功`,
            });
            getData();
          } else {
            ElMessage({
              type: 'warning',
              message: '服务器内部错误',
            });
          }
        })
        .catch(() => {
          ElMessage({
            type: 'warning',
            message: '删除失败',
          });
        });
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消删除',
      });
    });
};
const open = (row) => {
  if (row.weight > 100 || !row.weight) {
    return;
  }
  ElMessageBox.confirm('是否更新改值?', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'info',
  })
    .then(() => {
      let res = setShoppingWeight(row);
      res.then((res) => {
        console.log(res);
        ElMessage({
          type: 'success',
          message: '更新成功',
        });
      });
      row.change = false;
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消',
      });
      blurInput(row);
    });
};
function preserveVal(row) {
  InputVal(row.weight);
  open(row);
}
onMounted(() => {
  getData();
});
function getData() {
  let params = {
    value: input.value,
    pageIndex: pageIndex.value,
    pageSize: pageSize.value,
  };
  data.tableData = [];
  let fetch = shoppingTableData(params);
  fetch.then((res) => {
    console.log(res);
    data.tableData = res.data.data;
    total.value = res.data.total;
    data.tableData.forEach((e) => {
      e.change = false;
    });
  });
}
function deleteShopping(data) {
  return axios({
    url: '/api/shopping/deleteShopping',
    method: 'POST',
    data,
  });
}
function serachInputVals(data) {
  return axios({
    url: '/api/shopping/serachShopping',
    method: 'POST',
    data,
  });
}
function shoppingTableData(data) {
  return axios({
    method: 'POST',
    url: '/api/shopping/selectAllShopping',
    data,
  });
}
function setShoppingWeight(data) {
  return axios({
    method: 'POST',
    data,
    url: '/api/shopping/setShoppingWeight',
  });
}
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
svg {
  cursor: pointer;
}
.search {
  width: 40%;
  margin-bottom: 10px;
}
</style>
