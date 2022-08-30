<script>
import { ref, onMounted, reactive, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { setToken } from '@/utils/token'
import { blur } from 'tqr'
import ajax from '@/request'
import { useDetail, useSearch } from '@/hooks'
export default {
  name: 'info',
  setup(props) {
    const formRef = ref(null)
    const router = useRouter()

    const store = useStore()

    const form = reactive({
      username: '',
      password: ''
    })
    const rules = ref({
      username: blur,
      password: blur
    })

    const handleLogin = () => {
      ajax({
        url: '/login',
        method: 'post',
        data: form
      }).then(({ data }) => {
        const { token } = data
        setToken(token).then(data => {
          router.push('/article/list')
        })
      })
    }
    // 注册一个管理员账号
    const { handleDetail, submit } = useDetail('/user')

    const handleRegister = () => {
      submit({
        username: 'admin',
        password: 'admin123',
        name: '系统管理员',
        type: [],
        avatar: ''
      }).then(data => {
        r(data)
      })
    }

    return {
      formRef,
      form,
      rules,
      handleLogin,
      handleRegister
    }
  }
}
</script>

<template>
  <div class="login">
    <el-form
      :model="form"
      ref="formRef"
      :rules="rules"
      label-width="60px"
    >
      <el-form-item label="欢迎登录" />
      <el-form-item label="用户名">
        <el-input
          v-model="form.username"
          placeholder="请输入"
          clearable
        />
      </el-form-item>
      <el-form-item label="密码">
        <el-input
          v-model="form.password"
          placeholder="请输入"
          clearable
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="handleLogin"
          style="width: 100%"
        >
          登录
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button
          @click="handleRegister"
          style="width: 100%"
        >
          注册
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
.login {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-image: url('../../assets/login.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  .el-form {
    width: 400px;
    background-color: rgba(255, 255, 255, 1);
    padding: 28px 28px 10px;
    border-radius: 4px;
    margin-top: -160px;
  }
}
</style>