<template>
  <div class="login">
    <div class="page-auth_inner">
      <h1 class="page-auth_logo">
        <router-link :to="{ name:'login' }">
          <img src="/images/logo.svg" width="80" />
        </router-link>
      </h1>
      <el-card class="page-auth_card card">
        <header class="page-auth_card-header card-header">
          <h2>Login</h2>
        </header>
        <span class="divider"></span>
        <el-form
          :model="loginForm"
          :rules="rules"
           ref="loginForm"
           class="page-auth_card-header card-content">
          <el-form-item
            prop="email"
            label="Email">
            <el-input
              v-model="loginForm.email"
              auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item
            prop="password"
            label="Senha">
            <el-input
              type="password"
              v-model="loginForm.password"
              auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              class="page-auth_submit full-width"
              size="large"
              type="primary"
              @click="submitForm('loginForm')"
              :loading="isLoading">
              Enter
            </el-button>
          </el-form-item>
          <el-form-item class="item-forgot-password">
            <router-link :to="{ name: 'forgot-password'}">Forgot password?</router-link>
          </el-form-item>
        </el-form>
      </el-card>
      <footer class="page-auth_footer">
        No account yet?
        <router-link :to="{ name: 'register'}">Register</router-link>
      </footer>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      isLoading: false,
      loginForm: {
        email: '',
        password: ''
      },
      rules: {
        email: [
          { required: true, message: 'Please insert your email', trigger: 'blur' },
          { type: 'email', message: 'Please insert is valid email!', trigger: 'blur,change' }
        ],
        password: [
          { required: true, message: 'Please insert your password!', trigger: 'blur' },
        ],
      }
    }),
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const dataForm = this.loginForm
            const email = dataForm.email,
                  password = dataForm.password
            Meteor.loginWithPassword(email, password, (err) => {
  						if (err) {
                this.$notify.error({
                  title: 'Sorry',
                  message: err.reason,
                  offset: 100
                })
  						} else {
                this.isLoading = true
                this.$router.push({ name: 'admin' })
                this.$notify.sucess({
                  title: 'Welcome',
                  message: `Good to see you!`,
                  offset: 100
                })
  						}
  					})
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
    }
  }
</script>

<style lang="stylus" scoped>
.login
  width 300px
</style>
