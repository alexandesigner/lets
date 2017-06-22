<template>
  <div class="reset-password">
    <div class="auth-layout_inner">
      <el-card class="auth-layout_card card">
        <header class="auth-layout_card-header card-header">
          <img class="logo" src="/images/logo.svg" width="60" height="60" alt="Logo" />
          <h2>Reset Password</h2>
        </header>
        <span class="divider"></span>
        <el-form 
          :model="resetPasswordForm" 
          :rules="rules" 
          ref="resetPasswordForm"
          class="auth-layout_card-content card-content">
          <el-form-item label="New Password" prop="new_password">
            <el-input type="password" v-model="resetPasswordForm.new_password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button 
              class="auth-layout_submit full-width"
              size="large" 
              type="primary" 
              @click="submitForm('resetPasswordForm')"
              :loading="isLoading">
              Confirm
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      isLoading: false,
      resetPasswordForm: {
        new_password: ''
      },
      rules: {
        new_password: [
          { required: true, message: 'Please insert your new password', trigger: 'blur' }
        ]
      }
    }),
    methods: {
      submitForm(formName) {
        this.isLoading = true
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const dataForm = this.resetPasswordForm;
            const new_password = dataForm.new_password;
            const token = this.$route.params.token
            Accounts.resetPassword(token, new_password, (err) => {
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
                  message: 'Password reset with success!',
                  offset: 100
                })
                this.$router.push({name: 'login'})
              }
            })
          } else {
            this.$notify.error({
              title: 'Sorry!',
              message: 'All fields are required',
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
