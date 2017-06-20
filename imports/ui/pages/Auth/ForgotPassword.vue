<template>
  <div class="new-password">
    <div class="page-auth_inner">
      <h1 class="page-auth_logo">
        <router-link :to="{ name:'login' }">
          <img src="/images/logo.svg" width="80" />
        </router-link>
      </h1>
      <el-card class="page-auth_card card">
        <header class="page-auth_card-header card-header">
          <h2>Recovery password</h2>
        </header>
        <span class="divider"></span>
        <el-form
          :model="forgotPasswordForm"
          :rules="rules"
           ref="forgotPasswordForm"
           class="page-auth_card-header card-content">
          <el-form-item
            prop="email"
            label="Email">
            <el-input
              v-model="forgotPasswordForm.email"
              auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              class="page-auth_submit full-width"
              size="large"
              type="primary"
              @click="submitForm('forgotPasswordForm')">
              Send email
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>
      <footer class="page-auth_footer">
        <router-link :to="{ name: 'login'}">Back</router-link>
      </footer>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
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
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let dataForm = this.forgotPasswordForm
            let email = dataForm.email
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>
