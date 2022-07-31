<template>
  <div>
    <van-nav-bar title="标题" />
    <van-form ref="loginForm" @submit="onSubmit" class="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="手机号"
        :rules="mobileRules"
      >
        <template #label>
          <span class="toutiao toutiao-shouji1"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        name="code"
        placeholder="验证码"
        :rules="codeRules"
      >
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <template #button>
          <van-button
            class="code-btn"
            round
            size="mini"
            v-if="isShowCode"
            native-type="button"
            style="width: 92px; height: 28px; font-size: 12px"
            @click="sendCode"
          >
            发送验证码</van-button
          >
          <van-count-down
            :time="60 * 1000"
            format="ss秒"
            @finish="isShowCode = true"
            v-else
          />
        </template>
      </van-field>
      <div style="margin: 0.42rem">
        <van-button round block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { codeRules, mobileRules } from './rules.js'
import { login, getCodeAPI } from '@/api/user'
export default {
  name: 'Login',
  data() {
    return {
      mobile: '',
      code: '',
      codeRules,
      mobileRules,
      isShowCode: true
    }
  },

  methods: {
    loading() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
    },
    async onSubmit() {
      // this.$toast.loading({
      //   message: '登录中....',
      //   forbidClick: true, // 禁用背景点击
      //   duration: 5000 // 持续时间
      // })

      try {
        this.loading()
        const {
          data: { data: token }
        } = await login(this.mobile, this.code)
        this.$router.push('./profile')
        this.$toast.success('登陆成功')
        this.$store.commit('SET_TOKEN', token)
        // console.log(res)
      } catch (error) {
        const status = error.response.status
        let message = '请重新登录'
        if (status === 400) {
          message = error.response.data.message
        }
        this.$toast.fail(message)
      }
    },
    sendCode() {
      this.$refs.loginForm.validate('mobile').then(async () => {
        this.loading()
        try {
          await getCodeAPI(this.mobile)
          this.$toast.success('获取验证码成功')
          this.isShowCode = false

          this.isShowCode = false
        } catch (e) {
          // console.log(e)
          const status = e.response.status
          let message = '手机号不正确'
          if (status === 429) {
            message = e.response.data.message
          }
          this.$toast.fail(message)
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.van-nav-bar {
  background-color: #3096fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
}
.toutiao {
  font-size: 40px;
}
:deep(.form) {
  .van-field__label {
    flex: 1;
  }
  .van-field__value {
    flex: 20;
  }
}
</style>
