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
                  <el-upload
                    class="avatar-uploader"
                    action="http://localhost:3000/"
                    :show-file-list="false"
                    :on-success="handleImageSuccess"
                    :before-upload="beforeImageUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
              </el-col>
              <el-col :lg="24">
                <el-form-item prop="imageId">
                  <el-input size="large" v-model="editDocument.imageId" auto-complete="off" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="24">
                <el-form-item prop="owner">
                  <el-input size="large" v-model="editDocument.owner" auto-complete="off" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
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
  import { Session } from 'meteor/session';
  import AdminSidebar from '../../../components/Admin/AdminSidebar.vue'
  import AdminContent from '../../../components/Admin/AdminContent.vue'
  import BackButton from '../../../components/BackButton/BackButton.vue'
  import Documents from '../../../../api/Documents/documents'
  import Images from '../../../../api/Images/images'
  export default {
    name: 'admin-documents-edit',
    data: () => ({
      documents: [],
      users: [],
      imageUrl: '',
      imageFile: '',
      editDocument: {
        owner: '',
        title: '',
        body: '',
        imageId: ''
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
    mounted () {
      Session.setDefault('imageId', '')
    },
    watch: {
      'documents': function(doc) {
        this.$nextTick(function() {
          this.editDocument = {
            owner: doc[0].owner || '',
            title: doc[0].title || '',
            body: doc[0].body || '',
            imageId: doc[0].imageId || ''
          }
        })
      }
    },
    methods: {
      handleSubmitForm (formName) {

        let self = this

        // Create upload instance
        let uploadInstance = Images.insert({
          file: self.imageFile.raw, // Get the raw file
          streams: 'dynamic',
          chunkSize: 'dynamic'
        }, false)

        // When upload status 'end' 
        uploadInstance.on('end', function(error, fileObj) {

          // Check image upload
          if (error) {
            console.log('Error during upload: ' + error.reason)
          } else {
            Session.set('imageId', fileObj._id)
            console.log('File "' + fileObj.name + '" successfully uploaded')
          }

          // Form Update
          self.$refs[formName].validate((valid) => {
            try {
              if (valid) {
                let dataForm = self.editDocument
                let document = self.documents[0]
                let user = self.users[0]

                // Send updated data
                Meteor.callPromise('Documents.methods.update', {
                  _id: document._id,
                  owner: user._id,
                  title: dataForm.title,
                  body: dataForm.body,
                  imageId: Session.get('imageId'),
                  updatedAt: new Date()
                })
                self.$message({
                  type: 'info',
                  message: `Document update with success!`
                })
                self.$refs[formName].resetFields()
                self.$router.push({ name: 'admin-documents' })
              }
            } catch (error) {
              self.$message({
                type: 'error',
                message: error.reason
              })
            }
          })
        })

        uploadInstance.start()

      },
      handleImageSuccess(res, file) {
        this.imageFile = file
        this.imageUrl = URL.createObjectURL(file.raw)
      },
      beforeImageUpload(file) {
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
          this.$message.error('Image must be JPG format!')
        }
        if (!isLt2M) {
          this.$message.error('Image size can not exceed 2MB!')
        }
        return isJPG && isLt2M
      }
    },
    meteor: {
      $subscribe: {
        'documents.owner': []
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

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    float: left;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>