<script>
import { reactive, ref, onMounted } from 'vue'
import { rulesT } from 'tqr'
import { blur, change } from 'tqr'
import { useDetail } from '@/hooks'
import { useRoute, useRouter } from 'vue-router'
import global from '@/global'
import ajax from '@/request'
import { ElNotification } from 'element-plus'
import Question from './zQuestion.vue'
export default {
  name: 'info',
  props: {
    db: rulesT.Object,
    read: rulesT.Boolean
  },
  components: {
    Question
  },
  setup(props) {
    const { db } = props
    const { personnelList, personnel } = db
    const { handleDetail, submit } = useDetail('/project/item')

    const route = useRoute()

    const router = useRouter()

    const { id } = route.query
    // 树形数据
    const tree = ref([{ label: 1 }])
    // // 新增、编辑、删除数据
    const itemRef = ref(null)
    const show = ref(false)

    const form = ref({
      projectId: id,
      parentId: 0,
      name: '',
      personnel: []
    })

    const rules = ref({
      name: blur,
      personnel: change
    })

    const handleShow = () => {
      form.value = {
        ...form.value,
        parentId: 0,
        name: '',
        personnel: []
      }
      show.value = true
    }

    const getDetail = () => {
      handleDetail(id).then(data => {
        const { list } = data
        tree.value = toTreeData(list, {
          id: 'id',
          parent: 'parentId',
          name: 'name',
          root: 0
        })
      })
    }

    const handleRe = () => {
      getDetail()
    }

    const handleItemReAdd = data => {
      form.value = {
        ...form.value,
        parentId: data.id,
        name: '',
        personnel: []
      }
      show.value = true
    }

    const handleItemEdit = data => {
      form.value = {
        ...data,
        personnel: data.personnel.map(({ _id }) => _id)
      }
      show.value = true
    }

    const handleItemDelete = data => {
      const { id } = data
      global.loading = true
      ajax({
        url: `/project/item/${id}`,
        method: 'delete'
      })
        .then(() => {
          ElNotification.success('删除成功')
        })
        .finally(() => {
          global.loading = false
        })
    }

    const handleItemAdd = () => {
      itemRef.value.validate((valid, fields) => {
        if (valid) {
          submit({
            ...form.value
          }).then(data => {
            show.value = false
          })
        } else {
          console.log('表单验证失败!', fields)
          j('表单验证失败!')
        }
      })
    }
    // 生成树状函数
    const toTreeData = (data, attr) => {
      let tree = []
      let resData = data
      // 生成第一层数据
      for (let i = 0; i < resData.length; i++) {
        if (resData[i][attr.parent] === attr.root) {
          let obj = {
            ...resData[i],
            id: resData[i][attr.id],
            label: resData[i][attr.name],
            children: []
          }
          tree.push(obj)
          resData.splice(i, 1)
          i--
        }
      }
      // 递归
      var run = function(treeArr) {
        if (resData.length > 0) {
          for (let i = 0; i < treeArr.length; i++) {
            for (let j = 0; j < resData.length; j++) {
              if (treeArr[i].id === resData[j][attr.parent]) {
                let obj = {
                  ...resData[j],
                  id: resData[j][attr.id],
                  label: resData[j][attr.name],
                  children: []
                }
                treeArr[i].children.push(obj)
                resData.splice(j, 1)
                j--
              }
            }
            run(treeArr[i].children)
          }
        }
      }
      run(tree)
      // 返回数据
      return tree
    }

    // 问题
    const question = ref(false)
    const questionIds = ref({
      itemId: '',
      projectId: ''
    })
    const handleAddQuestion = data => {
      const { id, projectId } = data
      questionIds.value = {
        itemId: id,
        projectId
      }
      question.value = true
    }
    // 挂载完成
    onMounted(() => {
      id && getDetail()
    })
    // 添加项目

    return {
      personnelList,
      personnel,
      show,
      handleShow,
      tree,
      form,
      rules,
      itemRef,
      handleRe,
      handleItemAdd,
      handleItemReAdd,
      handleItemEdit,
      handleItemDelete,
      question,
      handleAddQuestion,
      questionIds
    }
  }
}
</script>

<template>
  <div class="project-right">
    <div>
      <el-button
        type="primary"
        @click="handleShow"
      >添加目录</el-button>
      <el-button @click="handleRe">刷新</el-button>
    </div>
    <el-tree :data="tree">
      <template #default="{ node, data }">
        <span class="custom-tree-node">
          <div class="tree-info">
            <span>{{ node.label }}</span>
          </div>
          <div
            class="tree-edit"
            @click.stop
          >
            <div class="personnel-list">
              <!-- <div style="font-size: 13px">参与人员:</div> -->
              <el-card
                v-for="(i, j) in data.personnel"
                :key="j"
                shadow="always"
                :body-style="{ padding: '0' }"
              >
                <el-tooltip
                  class="box-item"
                  :content="i.name"
                  placement="top-start"
                  effect="light"
                >
                  <el-image
                    style="width: 20px; height: 20px"
                    :src="i.avatar || ''"
                    fit="cover"
                  />
                </el-tooltip>
              </el-card>
            </div>
            <el-button
              type="primary"
              plain
              @click.stop="handleAddQuestion(data)"
            >
              问题：22/31
            </el-button>
            <el-button
              type="primary"
              @click.stop="handleItemReAdd(data)"
            >
              添加
            </el-button>
            <el-button @click.stop="handleItemEdit(data)"> 编辑 </el-button>
            <el-popconfirm
              title="Are you sure to delete this?"
              @confirm="handleItemDelete(data)"
            >
              <template #reference>
                <el-button type="danger"> 删除 </el-button>
              </template>
            </el-popconfirm>
          </div>
        </span>
      </template>
    </el-tree>
    <!-- 添加目录 -->
    <el-dialog
      v-model="show"
      title="目录"
      width="400px"
    >
      <el-form
        :model="form"
        ref="itemRef"
        :rules="rules"
      >
        <el-form-item
          label="目录名称"
          prop="name"
        >
          <el-input
            v-model="form.name"
            placeholder="请输入"
            clearable
          />
        </el-form-item>
        <el-form-item label="负责人员">
          <el-select
            v-model="form.personnel"
            placeholder="请选择"
            clearable
            filterable
            multiple
          >
            <el-option
              v-for="item in personnelList"
              :key="item._id"
              :label="item.name"
              :value="item._id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="show = false">取消</el-button>
          <el-button
            type="primary"
            @click="handleItemAdd"
          >确认</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 添加问题 -->
    <el-dialog
      title="问题"
      v-model="question"
      width="1200px"
    >
      <Question :questionIds="questionIds" />
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.project-right {
  .el-tree {
    margin-top: 18px;
    .custom-tree-node {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .tree-info {
        display: flex;
        align-items: center;
      }
      .tree-edit {
        display: flex;
        align-items: center;
        .personnel-list {
          display: flex;
          align-items: center;
          padding-right: 12px;
          .el-card {
            margin-left: 6px;
            .el-image {
              display: block;
            }
          }
        }
      }
    }
  }
  :deep(.el-dialog) {
    .el-dialog__header {
      padding: 10px 20px;
      .el-dialog__headerbtn {
        top: 0;
      }
    }
    .el-dialog__body {
      padding: 18px 20px 0;
      border-top: 1px #ddd solid;
      border-bottom: 1px #ddd solid;
    }
    .el-dialog__footer {
      padding: 10px 20px;
    }
  }
}
</style>