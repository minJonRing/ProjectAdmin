<template>
  <div class="upload">
    <el-upload
      v-if="!read"
      v-loading="loading"
      :element-loading-text="progress + '%'"
      class="avatar-uploader"
      action="#"
      :limit="limit"
      :show-file-list="false"
      :before-upload="beforeAvatarUpload"
      :http-request="handleUploadLearnSignVoucherFileChange"
      :attr-icon="'注:只能上传' + type.join()"
    >
      <el-icon class="el-upload-icon"><UploadFilled /></el-icon>
    </el-upload>
    <template v-if="!read">
      <div v-for="(i, j) in fileList" :key="j" class="item">
        <el-popconfirm
          v-if="!read"
          placement="top"
          title="确定删除？"
          @confirm="handleDelete(j)"
        >
          <template #reference>
            <el-button class="delete" type="danger" slot="reference"
              >删除</el-button
            >
          </template>
        </el-popconfirm>
        <el-image
          :src="i.filePath"
          fit="cover"
          :preview-src-list="fileList.map(({ filePath }) => filePath)"
        >
          <template #error>
            <div class="image-slot">
              <a class="tip-text" :href="i.filePath" target="_blank">
                {{ `点击下载` }}
              </a>
              <i class="el-icon-picture-outline"></i>
            </div>
          </template>
        </el-image>
      </div>
    </template>
    <template v-else>
      <div class="item">
        <el-image fit="cover">
          <div slot="error" class="image-slot">
            <a class="tip-text">未上传任何文件</a>
            <i class="el-icon-picture-outline"></i>
          </div>
        </el-image>
      </div>
    </template>
  </div>
</template>

<script>
import ajax from "@/request/index";
import { rulesT } from "tqr";
import { ElNotification } from "element-plus";
import { UploadFilled } from "@element-plus/icons-vue";
import { defineComponent } from "vue-demi";
export default defineComponent({
  name: "Upload",
  props: {
    // 文件列表
    modelValue: rulesT.Array,
    // 上传地址
    url: rulesT.String,
    // 文件类型
    type: rulesT.Array,
    // 文件大小
    size: {
      type: Number,
      default: 80,
    },
    // 是否只读
    read: rulesT.Boolean,
    // 最大文件数
    limit: {
      type: Number,
      default: 99,
    },
    // 是否是单文件
    one: rulesT.Boolean,
    // 是否值需要文件地址
    isPath: rulesT.Boolean,
    // 对返回的数据进行处理 {fileName,filePath}
    filterData: rulesT.Function,
  },
  model: {
    prop: "modelValue",
    event: "change",
  },
  components: {
    UploadFilled,
  },
  computed: {
    fileList: {
      get: function ({ modelValue }) {
        return [...modelValue];
      },
      set: function (data) {
        this.$emit("update:modelValue", data);
      },
    },
  },
  data() {
    return {
      loading: false,
      progress: 0,
    };
  },
  methods: {
    beforeAvatarUpload(file) {
      const isType = this.type.length
        ? this.type.filter((i) => {
            return (
              new RegExp(i).test(file.type) ||
              i === file.name.replace(/.+(?=\.)|\./g, "")
            );
          }).length > 0
        : true;
      const isSize = file.size / 1024 / 1024 < this.size;
      if (!isType) {
        ElNotification.error(`请上传格式正确的文件,${this.type.join(",")}!`);
      }
      if (!isSize) {
        ElNotification.error(`上传文件大小不能超过${this.size}MB!`);
      }
      return isType && isSize;
    },
    handleUploadLearnSignVoucherFileChange(files) {
      this.loading = true;
      const { file } = files;
      let formData = new FormData();
      formData.append("file", file);
      ajax({
        url: this.url,
        method: "POST",
        data: formData,
        onUploadprogresss: ({ loaded, total }) => {
          this.progress = Math.ceil((loaded / total) * 100);
        },
      })
        .then(({ data }) => {
          if (this.one) {
            this.fileList = data;
          } else {
            this.fileList.push(...data);
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleDelete(i) {
      this.fileList.splice(i, 1);
    },
    returnData() {
      return this.fileList;
    },
  },
});
</script>

<style lang="scss" scoped>
.upload {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  .avatar-uploader {
    position: relative;
    margin: 6px;
    .el-upload {
      display: block;
      .el-upload-icon {
        display: block;
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        font-size: 28px;
        color: #8c939d;
        width: 120px;
        height: 120px;
        line-height: 118px;
        text-align: center;
        transition-duration: 600ms;
        &:hover {
          border-color: #409eff;
          color: #409eff;
        }
      }
    }
    &::after {
      position: absolute;
      bottom: 3px;
      left: 0;
      content: attr(attr-icon);
      font-size: 12px;
      color: #999;
      width: 100%;
      padding: 0 3px;
      text-align: center;
      line-height: 1.5;
    }
  }
  .item {
    position: relative;
    width: 120px;
    height: 120px;
    border-radius: 6px;
    overflow: hidden;
    margin: 6px;
    .delete {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 1;
    }
    .el-image {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      border: 1px dashed #d9d9d9;

      img {
        display: block;
      }
      ::v-deep .image-slot {
        display: flex;
        width: 100%;
        padding: 0 6px;
        color: #1890ff;
        .tip-text {
          flex: 1;
          text-align: center;
          font-size: 13px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          line-height: 1;
        }
      }
    }
  }
  .item-file {
    display: flex;
    .tip-text {
      padding: 0 6px;
    }
  }
}
</style>