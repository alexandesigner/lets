<template>
  <div class="reset-password">
    <div class="auth-layout_inner">
      <div class="auth-layout_card">
        <PageHeader title="Reset Password" />
        <span class="divider"></span>
        <el-form 
          :model="resetPasswordForm" 
          :rules="rules" 
          ref="resetPasswordForm"
          class="auth-layout_card-content ">
          <el-form-item label="New Password" prop="new_password">
            <el-input 
              type="password" 
              v-model="resetPasswordForm.new_password" 
              v-on:keyup.enter.native="submitForm('resetPasswordForm')"
              auto-complete="off"
            >
            </el-input>
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
      </div>
    </div>
  </div>
</template>

<script>
  import PageHeader from './PageHeader'
  export default {
    name: 'auth-reset-password',
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
