<template>
  <div class="register">
    <div class="auth-layout_inner">
      <el-card class="auth-layout_card card">
        <header class="auth-layout_card-header card-header">
          <h2>Create Account</h2>
        </header>
        <span class="divider"></span>
        <el-form
          :model="registerForm"
          :rules="rules"
          ref="registerForm"
          class="auth-layout_card-header card-content">
          <el-row :gutter="20" class="form-row-item">
            <el-col :span="12">
              <el-form-item
                prop="firstName"
                label="First Name">
                <el-input
                  v-model="registerForm.firstName"
                  auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                prop="lastName"
                label="Last Name">
                <el-input
                  v-model="registerForm.lastName"
                  auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="form-row-item">
            <el-col :span="12">
              <el-form-item
                prop="email"
                label="Email">
                <el-input
                  v-model="registerForm.email"
                  auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                prop="phone"
                label="Callphone">
                <el-input
                  v-model="registerForm.phone"
                  auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="0" class="form-row-item">
            <el-form-item
              prop="cpf"
              label="CPF">
              <el-input
                v-model="registerForm.cpf"
                auto-complete="off"></el-input>
            </el-form-item>
          </el-row>
          <el-row :gutter="0" class="form-row-item">
            <el-form-item
              label="Password"
              prop="password">
              <el-input
                type="password"
                v-model="registerForm.password"
                auto-complete="off"></el-input>
            </el-form-item>
          </el-row>
          <el-row :gutter="0" class="form-row-item">
            <el-form-item>
              <el-button
                class="auth-layout_submit full-width"
                size="large"
                type="primary"
                :loading="isLoading"
                @click="submitForm('registerForm')">
                Register
              </el-button>
            </el-form-item>
          </el-row>
        </el-form>
      </el-card>
      <footer class="auth-layout_footer">
        Already have a register?
        <router-link :to="{ name: 'login'}">Login</router-link>
      </footer>
    </div>

  </div>
</template>

<script>
  export default {
    data: () => ({
      isLoading: false,
      registerForm: {
        username: '',
        password: '',
        email: '',
        firstName: '',
        lastName: '',
        phone: '',
        cpf: ''
      },
      rules: {
        email: [
          { required: true, message: 'Please insert your email', trigger: 'blur' },
          { type: 'email', message: 'Please insert is valid email!', trigger: 'blur,change' }
        ],
        password: [
          { required: true, message: 'Please insert your password!', trigger: 'blur' }
        ],
        firstName: [
          { required: true, message: 'Please insert your First name!', trigger: 'blur' }
        ],
        lastName: [
          { required: true, message: 'Please insert your Last name!', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: 'Please insert your callphone!', trigger: 'blur' }
        ],
        cpf: [
          { required: true, message: 'Please insert your document ID!', trigger: 'blur' }
        ]
      }
    }),
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let dataForm = this.registerForm
            let userData = {
              createdAt: new Date(),
              password: dataForm.password,
        			email: dataForm.email,
        			profile: {
        				firstName: dataForm.firstName,
        				lastName: dataForm.lastName,
        				phone: dataForm.phone,
        				cpf: dataForm.cpf
        			}
        		}
            console.log(userData)
            Accounts.createUser(userData, (err) => {
        			if(err){
                this.$notify.error({
                  title: 'Sorry',
                  message: err.reason,
                  offset: 100
                })
        			} else {
                this.$notify.success({
                  title: 'Success!',
                  message: 'User create success!',
                  offset: 100
                })
                this.isLoading = true
                this.$router.push({ name: 'login' })
        			}
        		})
          } else {
            this.$notify.error({
              title: 'Sorry!!!',
              message: 'Problem current is cabuloso! ˆˆ',
              offset: 100
            })
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>

<style lang="stylus" scoped>
.register
  width 600px
</style>