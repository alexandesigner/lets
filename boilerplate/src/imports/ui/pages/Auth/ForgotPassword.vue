<template>
  <div class="new-password">
    <div class="auth-layout_inner">
      <div class="auth-layout_card">
        <PageHeader title="Forgot Password" />
        <span class="divider"></span>
        <el-form
          :model="forgotPasswordForm"
          :rules="rules"
           ref="forgotPasswordForm"
           class="auth-layout_card-content">
          <el-form-item
            prop="email"
            label="Email">
            <el-input
              v-model="forgotPasswordForm.email"
              v-on:keyup.enter.native="submitForm('forgotPasswordForm')"
              auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              class="auth-layout_submit full-width"
              size="large"
              type="primary"
              @click.prevent="submitForm('forgotPasswordForm')"
              :loading="isLoading">
              Send
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <footer class="auth-layout_footer">
        <router-link :to="{ name: 'login'}">Back</router-link>
      </footer>
    </div>
  </div>
</template>

<script>
import PageHeader from './PageHeader'
  export default {
    components: {
      PageHeader
    },
    name: 'auth-forgot-password',
    data: () => ({
      isLoading: false,
      forgotPasswordForm: {
        email: ''
      },
      rules: {
        email: [
          { required: true, message: 'Please insert your email!', trigger: 'blur' },
          { type: 'email', message: 'Please insert is valid email!', trigger: 'blur,change' }
        ]
      }
    }),
    methods: {
      submitForm(formName) {
        this.isLoading = true
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let dataForm = this.forgotPasswordForm
            let email = dataForm.email
            Accounts.forgotPassword({ email }, (err) => {
              if (err) {
                this.$notify.error({
                  title: 'Sorry!',
                  message: err.reason,
                  offset: 100
                })
                this.isLoading = false
              } else {
                this.$notify.success({
                  title: 'Success',
                  message: 'A link has been sent to your email!',
                  offset: 100
                })
                this.$router.push({name: 'login'})
              }
            })
          } else {
            this.$notify.error({
              title: 'Sorry!',
              message: 'Email field is required',
              offset: 100
            })
            this.isLoading = false
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>
