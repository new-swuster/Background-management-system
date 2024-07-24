<template>
  <div class="user-header">
    <el-button type="primary" @click="handleAdd()">+新增</el-button>
    <el-form :inline="true">
      <el-form-item label="请输入">
        <!-- v-model="formInline.keyword"  -->
        <el-input placeholder="请输入就诊编码" clearable />
      </el-form-item>

      <el-form-item>
        <el-button type="primary">搜索</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="inner" style="overflow: auto; height: 400px">
    <el-table :data="UserData" class="table" style="width: 100%">
      <el-table-column prop="id" label="就诊编码" width="200" />
      <el-table-column prop="time" label="报告时间" width="150" />
      <el-table-column prop="check" label="检验明细项" width="200" />
      <el-table-column prop="val" label="检查值" width="120" />
      <el-table-column prop="mal" label="参考范围" width="120" />
      <el-table-column prop="unit" label="单位" width="80" />
      <el-table-column prop="resut" label="检查细项结果" width="120" />
      <el-table-column fixed="right" label="操作" min-width="120">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row)" type="warning"
            >编辑</el-button
          >
          <el-button type="danger" size="small" @click="handleDelete()"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
  <el-dialog
    v-model="dialogVisible"
    :title="action == 'add' ? '新增用户' : '编辑用户'"
    width="600"
    :before-close="handleClose"
  >
    <el-form :inline="true" :model="formUser" ref="ruleFormRef">
      <el-row>
        <el-col :span="9">
          <el-form-item
            label="姓名:"
            :rules="[{ required: true, message: '请输入姓名' }]"
            prop="name"
          >
            <el-input v-model="formUser.name" placeholder="请输入用户姓名" />
          </el-form-item>
        </el-col>

        <el-col span="12">
          <el-form-item
            label="年龄:"
            prop="age"
            :rules="[
              { required: true, message: '请输入年龄' },
              { type: 'number', message: '年龄必须是数字' },
            ]"
          >
            <el-input
              v-model.number="formUser.age"
              placeholder="请输入用户年龄"
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="7">
          <el-form-item
            label="性别:"
            prop="sex"
            :rules="[{ required: true, message: '请选择性别' }]"
          >
            <el-select v-model="formUser.sex" placeholder="请选择用户性别">
              <el-option label="♂男" value="0"></el-option>
              <el-option label="♀女" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col span="12">
          <el-form-item
            label="出生日期:"
            prop="date"
            :rules="[{ required: true, message: '请选择出生日期' }]"
          >
            <el-date-picker
              v-model="formUser.date"
              type="出生日期"
              placeholder="请输入用户出生日期"
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-form-item
          label="城市:"
          prop="city"
          :rules="[{ required: true, message: '请输入城市' }]"
        >
          <el-input
            v-model="formUser.city"
            placeholder="请输入用户所在城市"
            clearable
          />
        </el-form-item>
      </el-row>

      <el-row style="justify-content: flex-end">
        <el-form-item>
          <el-button type="info" @click="resetForm(ruleFormRef)"
            >取消</el-button
          >
          <el-button type="success" @click="handleSure()">确定</el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </el-dialog>
  <br /><br />
  <el-pagination
    size="small"
    background
    layout="prev, pager, next"
    :total="200"
    class="mt-4"
  />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, reactive } from "vue";
import axios from "axios";
import { ElMessageBox } from "element-plus";
import type { FormInstance } from "element-plus";
import { ElMessage } from "element-plus";
export default defineComponent({
  setup() {
    let UserData = ref([]);
    const getUserData = async () => {
      await axios.get("/User/getUserData").then((res) => {
        UserData.value = res.data.data.UserData;
      });
    };
    const handleClick = () => {
      // handle click logic here
    };
    // 控制模态框的显示和隐藏
    const dialogVisible = ref(false);
    onMounted(() => {
      getUserData();
    });
    const handleClose = (done) => {
      ElMessageBox.confirm("确定取消本窗口吗?")
        .then(() => {
          done();
    
        })
    };
    // 添加用户的from数据:
    const formUser = reactive({
      name: "", //添加用户名
      age: "",
      sex: "",
      date: "",
      city: "",
    });
    const ruleFormRef = ref<FormInstance>();
    const resetForm = (formEl: FormInstance | undefined) => {
      dialogVisible.value = false;
      if (!formEl) return;
      formEl.resetFields();
    };
    // 编辑
    const action = ref("add");
    const handleEdit = (row) => {
      dialogVisible.value = true;
      action.value = "edit";
      // 浅拷贝
      Object.assign(formUser, row);
    };
    // 新增
    const handleAdd = () => {
      dialogVisible.value = true;
      action.value = "add";
    };
    // 删除
    const handleDelete = () => {
      ElMessageBox.confirm("确定删除此条数据吗?").then(() => {
        ElMessage({
          message: "删除成功",
          type: "success",
        });
      });
    };
    const handleSure =()=>{
      ElMessage({
    message: '新增成功',
    type: 'success',
  });
  dialogVisible.value = false;
  resetForm
    };
    return {
      UserData,
      handleClick,
      dialogVisible,
      handleClose,
      formUser,
      ruleFormRef,
      resetForm,
      action,
      handleEdit,
      handleAdd,
      handleDelete,
      handleSure,
    };
  },
});
</script>

<style>
.table {
  margin-top: 5px;
}
/* .inner {
  overflow: auto;
  width: 100%;
}
.scrollbar-wrap {
  height: 300px;
} */
.user-header {
  display: flex;
  justify-content: space-between;
}
</style>
