<template>
  <admin-content>
    <admin-sidebar></admin-sidebar>
    <div class="admin-content_main">
      <header class="admin-content_main-header is-back-button">
        <back-button></back-button>
        <h2 class="title">User Edit <small>- {{ editUser.firstName }} {{ editUser.lastName }}</small></h2>
      </header> 
      <div class="admin-content_main-form">
        <el-card class="box-card">
          <el-form :model="editUser" :rules="rules" ref="editUser" class="form-model">
            <el-row :gutter="10">
              <el-col :lg="12">
                <el-form-item prop="email">
                  <strong class="form-label">Email</strong>
                  <el-input placeholder="Your first email" size="large" v-model="editUser.email" auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="6">
                <el-form-item prop="firstName">
                  <strong class="form-label">First Name</strong>
                  <el-input placeholder="Your first name" size="large" v-model="editUser.firstName" auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="6">
                <el-form-item prop="lastName">
                  <strong class="form-label">Last Name</strong>
                  <el-input placeholder="Your last name" size="large" v-model="editUser.lastName" auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="24">
                <el-button size="large" type="success" @click="handleSubmitForm('editUser')" class="submit-button">Save</el-button>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </div>
    </div>
  </admin-content>
</template>

<script>
  import AdminSidebar from '../../../components/Admin/AdminSidebar.vue';
  import AdminContent from '../../../components/Admin/AdminContent.vue';
  import BackButton from '../../../components/BackButton/BackButton.vue';
  export default {
    name: 'admin-users-edit',
    data: () => ({
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
    async mounted () {
      this.$nextTick(() => {
        this.renderData()
      })
    },
    methods: {
      renderData () {
        this.editUser.firstName = this.users[0].profile.firstName
        this.editUser.lastName = this.users[0].profile.lastName
        this.editUser.email = this.users[0].emails[0].address
        this.editUser.verifyEmail = this.users[0].emails[0].verified
      },
      handleSubmitForm (formName) {
        this.$refs[formName].validate((valid) => {
          try {
            if (valid) {
              let dataForm = this.editUser
              let user = this.users[0]
              Meteor.callPromise('Users.methods.update', {
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
              })
              this.$message({
                type: 'info',
                message: `User update with success!`,
                duration: 9999
              })
              this.$refs[formName].resetFields()
              this.$router.push({ name: 'admin-users' })
            }
          } catch (error) {
            this.$message({
              type: 'error',
              message: error
            })
          }
        })
      }
    },
    meteor: {
      $subscribe: {
        'users': [],
      },
      users() {
        return Meteor.users.find({
          _id: this.$route.params.userId
        }).fetch()
      },
    },
    components: {
      AdminSidebar,
      AdminContent,
      BackButton
    }
  }
</script>
