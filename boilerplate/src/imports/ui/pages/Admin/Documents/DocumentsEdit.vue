<template>
  <admin-content>
    <admin-sidebar></admin-sidebar>
    <div class="admin-content_main">
      <header class="admin-content_main-header is-back-button">
        <back-button></back-button>
        <h2 class="title">Documents Edit <small>- {{ editDocument.title }}</small></h2>
      </header> 
      <div class="admin-content_main-form">
        <el-card class="box-card">
          <el-form :model="editDocument" :rules="rules" ref="editDocument" class="form-model">
            <el-row :gutter="10">
              <el-col :lg="24">
                <el-form-item prop="title">
                  <el-input placeholder="Please input document title" size="large" v-model="editDocument.title" auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="24">
                <el-form-item prop="body">
                  <el-input placeholder="Please input document body" size="large" v-model="editDocument.body" auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="24">
                <el-button size="large" type="success" @click="handleSubmitForm('editDocument')" class="submit-button full-width">Save</el-button>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </div>
    </div>
  </admin-content>
</template>

<script>
  import AdminSidebar from '../../../components/Admin/AdminSidebar.vue'
  import AdminContent from '../../../components/Admin/AdminContent.vue'
  import BackButton from '../../../components/BackButton/BackButton.vue'
  import Documents from '../../../../api/Documents/documents'
  export default {
    name: 'admin-documents-edit',
    data: () => ({
      documents: [],
      users: [],
      editDocument: {
        title: '',
        body: ''
      },
      rules: {
        title: [
          { required: true, message: 'Please input title', trigger: 'blur' },
        ],
        body: [
          { required: true, message: 'Please input body text', trigger: 'blur' },
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
        this.editDocument.title = this.documents[0].title
        this.editDocument.body = this.documents[0].body
      },
      handleSubmitForm (formName) {
        this.$refs[formName].validate((valid) => {
          try {
            if (valid) {
              let dataForm = this.editDocument
              let document = this.documents[0]
              let user = this.users[0]
              Meteor.callPromise('Documents.methods.update', {
                _id: document._id,
                owner: user._id,
                title: dataForm.title,
                body: dataForm.body,
                updatedAt: new Date()
              })
              this.$message({
                type: 'info',
                message: `Document update with success!`
              })
              this.$refs[formName].resetFields()
              this.$router.push({ name: 'admin-documents' })
            }
          } catch (error) {
            this.$message({
              type: 'error',
              message: error.reason
            })
          }
        })
      }
    },
    meteor: {
      $subscribe: {
        'documents.owner': [],
      },
      users() {
        return Meteor.users.find({})
      },
      documents() {
        return Documents.find({
          _id: this.$route.params.documentId
        })
      },
    },
    components: {
      AdminSidebar,
      AdminContent,
      BackButton
    }
  }
</script>
