<template>
  <div>
    <header>
      <div class="login" v-if="isLogin">登录后</div>
      <div class="logout" v-else>未登录</div>
    </header>

    <main>公共部分</main>

    <footer>
      <button v-if="isLogin" @click="logout">退出</button>
    </footer>
  </div>
</template>

<script>
export default {
  computed: {
    isLogin() {
      return !!this.$store.state.tokenObj.token
    }
  },
  methods: {
    logout() {
      this.$store.commit('SET_TOKEN', {})
      this.$router.push('./login')
    }
  }
}
</script>

<style></style>
