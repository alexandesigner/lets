<template>
  <div class="new-password">
    <div class="auth-layout_inner">
      <el-card class="auth-layout_card card">
        <header class="auth-layout_card-header card-header">
          <h2>New Password</h2>
        </header>
        <span class="divider"></span>
        <el-form 
          :model="newPasswordForm" 
          :rules="rules" 
          ref="newPasswordForm"
          class="auth-layout_card-header card-content">
          <el-form-item label="Nova Senha" prop="new_password">
            <el-input type="password" v-model="newPasswordForm.new_password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="Repita a nova senha" prop="new_password_repeat">
            <el-input type="password" v-model="newPasswordForm.new_password_repeat" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button 
              class="auth-layout_submit full-width"
              size="large" 
              type="primary" 
              @click="submitForm('newPasswordForm')">
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
      newPasswordForm: {
        new_password: '',
        new_password_repeat: ''
      },
      rules: {
        new_password: [
          { required: true, message: 'Please insert your password', trigger: 'blur' }
        ],
        new_password_repeat: [
          { required: true, message: 'Please insert your new password', trigger: 'blur' }
        ]
      }
    }),
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let dataForm = this.newPasswordForm;
            let new_password = dataForm.new_password,
                new_password_repeat = dataForm.new_password_repeat;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>
