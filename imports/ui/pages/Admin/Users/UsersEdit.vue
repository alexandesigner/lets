<template>
  <admin-dashboard>
    <admin-sidebar></admin-sidebar>
    <div class="admin-dashboard_content">
      <header class="admin-dashboard_content-header is-back-button">
        <back-button></back-button>
        <h2>User Edit <small>- {{ editUser.firstName }} {{ editUser.lastName }}</small></h2>
      </header> 
      <div class="admin-dashboard_content-form">
        <el-card class="box-card">
          <el-form :model="editUser" :rules="rules" ref="editUser" class="form-model">
            <el-row :gutter="10">
              <el-col :lg="12">
                <el-form-item prop="email">
                  <el-input placeholder="Your first email" size="large" v-model="editUser.email" auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="12">
                <el-form-item prop="firstName">
                  <el-input placeholder="Your first name" size="large" v-model="editUser.firstName" auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="12">
                <el-form-item prop="lastName">
                  <el-input placeholder="Your last name" size="large" v-model="editUser.lastName" auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="24">
                <el-button size="large" type="success" @click="submitForm('editUser')" class="submit-button full-width">Save</el-button>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </div>
    </div>
  </admin-dashboard>
</template>

<script>
  import AdminSidebar from '../../../components/Admin/AdminSidebar.vue';
  import AdminDashboard from '../../../components/Admin/AdminDashboard.vue';
  import BackButton from '../../../components/BackButton/BackButton.vue';
  export default {
    name: 'UsersEdit',
    data: () => ({
      users: [],
      editUser: {
        firstName: '',
        lastName: '',
        email: '',
        verifyEmail: false
      },
      rules: {
        firstName: [
          { required: true, message: 'Please input first name', trigger: 'blur' },
        ],
        lastName: [
          { required: true, message: 'Please input last name', trigger: 'blur' },
        ],
        email: [
          { required: true, message: 'Please input last email', trigger: 'blur' },
        ]
      },
    }),
    mounted () {
      this.editUser.firstName = this.users[0].profile.firstName;
      this.editUser.lastName = this.users[0].profile.lastName;
      this.editUser.email = this.users[0].emails[0].address;
      this.editUser.verifyEmail = this.users[0].emails[0].verified;
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const dataForm = this.editUser
            const user = this.users[0]
            const userData = {
              _id: user._id,
              services: {
                password: user.services.password
              },
              profile: {
                firstName: dataForm.firstName,
                lastName: dataForm.lastName,
                phone: user.profile.phone
              },
              emails: [{
                address: dataForm.email,
                verified: this.editUser.verifyEmail
              }],
              roles: [user.roles[0]],
              updatedAt: new Date()
            }
            console.log(userData)
            Meteor.call('Users.methods.update', userData, (error, response) => {
              if (error) {
                alert(error.reason)
              } else {
                this.$message({
                  type: 'info',
                  message: `Usuário alterado com sucesso!`
                })
                this.$refs[formName].resetFields()
                this.$router.push({ name: 'admin-users' })
              }
            })
          }
        })
      }
    },
    meteor: {
      subscribe: {
        'users': [],
      },
      users() {
        return Meteor.users.find({
          _id: this.$route.params.userId
        });
      },
    },
    components: {
      AdminSidebar,
      AdminDashboard,
      BackButton
    }
  }
</script>
