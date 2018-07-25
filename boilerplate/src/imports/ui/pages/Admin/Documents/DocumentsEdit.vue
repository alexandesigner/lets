<template>
  <admin-content>
    <admin-sidebar></admin-sidebar>
    <div class="admin-content_main">
      <header class="admin-content_main-header is-back-button">
        <back-button></back-button>
        <h2 class="title">Edit Document</h2>
      </header> 
      <div class="admin-content_main-form">
        <el-card class="box-card">
          <el-form :model="editDocument" :rules="rules" ref="editDocument" class="form-model">
            <el-row :gutter="10">
              <el-col :lg="24">
                  <el-upload
                    class="image-uploader"
                    :action="baseUrl"
                    :show-file-list="false"
                    :on-success="handleImageSuccess"
                    :before-upload="beforeImageUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="image">
                    <img v-else src="/images/thumb.jpg" width="230" />
                  </el-upload>
              </el-col>
              <el-col :lg="24">
                <el-form-item prop="fullName">
                  <el-input size="large" v-model="this.fullName" auto-complete="off" :disabled="true"></el-input>
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
                <el-form-item prop="subtitle">
                  <el-input placeholder="Please input document subtitle" size="large" v-model="editDocument.subtitle" auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="24">
                <el-form-item prop="title">
                  <textarea
                    id="DocEditor"
                    name="documentBody"
                    :value="editDocument.body"></textarea>
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
  
  // Components
  import AdminSidebar from '../../../components/Admin/AdminSidebar.vue'
  import AdminContent from '../../../components/Admin/AdminContent.vue'
  import BackButton from '../../../components/BackButton/BackButton.vue'
  // Collections
  import Documents from '../../../../api/Documents/documents'
  import Images from '../../../../api/Images/images'

  export default {
    name: 'admin-documents-edit',
    data: () => ({
      fullName: '',
      documents: [],
      users: [],
      imageUrl: null,
      imageFileUpload: null,
      image: [],
      editDocument: {
        owner: '',
        title: '',
        subtitle: '',
        body: '',
        image: {
          name: '',
          type: '',
          extension: '',
          path: '',
          imageId: ''
        }
      },
      rules: {
        title: [
          { required: true, message: 'Please input title', trigger: 'blur' },
        ]
      },
    }),
    mounted () {
      $('#DocEditor').froalaEditor({
        editorClass: 'TextInputEditor',
        height: 180,
        placeholderText: 'Start typing something...',
        toolbarButtons: [
          'bold',
          'italic',
          'underline',
          'insertLink',
          'insertImage',
          'formatBlock',
          'align',
          'formatOL',
          'formatUL',
          'insertHR'
        ],
        quickInsertButtons: []
      });
    },
    watch: {
      'users': function (user) {
        user.map(name => {
          const fullName = name.profile.firstName + name.profile.lastName
          return this.fullName = fullName
        })
      },
      'documents': function(doc) {
        $('#DocEditor').froalaEditor('html.set', doc[0].body)
        this.$nextTick(function() {
          this.imageUrl = doc[0].image.path
          this.editDocument = {
            owner: doc[0].owner || '',
            title: doc[0].title || '',
            subtitle: doc[0].subtitle || '',
            body: doc[0].body || '',
            image: {
              name: doc[0].image.name || '',
              type: doc[0].image.type || '',
              extension: doc[0].image.extension || '',
              path: doc[0].image.path || '',
              imageId: doc[0].image.imageId || ''
            }
          }
        })
      }
    },
    computed: {
      baseUrl () {
        return Meteor.settings.public.BASE_URL
      }
    },
    methods: {
      // Form submit
      handleSubmitForm (formName) {

        let self = this

        self.$refs[formName].validate((valid) => {
          try {
            if (valid) {

              let dataForm = self.editDocument
              let doc = self.documents[0]
              let user = self.users[0]
              let checkImage = Object.keys(doc.image).length === 0 && doc.image.constructor === Object 
              let checkUpload = self.imageFileUpload !== null

              if (checkUpload) {
                // Create upload instance
                let uploadInstance = Images.insert({
                  file: self.imageUrl, // Get the raw file
                  streams: 'dynamic',
                  chunkSize: 'dynamic',
                  isBase64: true,
                  fileName: self.imageFileUpload.name
                }, false)

                // When upload status 'end' 
                uploadInstance.on('end', function(error, fileObj) {
                  
                  // Check image upload
                  if (error) {
                    console.log('Error during upload: ' + error.reason)
                  } else {
                    self.image = {
                      name: fileObj.name,
                      type: 'document',
                      extension: fileObj.extension,
                      path: `${Meteor.settings.public.BASE_URL}${fileObj._downloadRoute}/Images/${fileObj._id}/original/${fileObj._id}${fileObj.extensionWithDot}`,
                      imageId: fileObj._id
                    }
                    console.log('File "' + fileObj.name + '" successfully uploaded')
                  }

                  // Send updated data
                  Meteor.callPromise('Documents.methods.update', {
                    _id: doc._id,
                    owner: user._id,
                    title: dataForm.title,
                    subtitle: dataForm.subtitle || '',
                    body: $('#DocEditor').froalaEditor('html.get') || '',
                    image: {
                      name: self.image.name,
                      type: self.image.type,
                      extension: self.image.extension,
                      path: self.image.path,
                      imageId: self.image.imageId
                    },
                    updatedAt: new Date()
                  })
                  self.$message({
                    type: 'info',
                    message: `Document update with success!`
                  })
                  self.$refs[formName].resetFields()
                  self.$router.push({ name: 'admin-documents' })
                })
                
                uploadInstance.start()

              } else if (checkImage) {
                Meteor.callPromise('Documents.methods.update', {
                  _id: doc._id,
                  updatedAt: new Date(),
                  owner: user._id,
                  title: dataForm.title,
                  subtitle: dataForm.subtitle,
                  body: $('#DocEditor').froalaEditor('html.get') || '',
                  image: {
                    name: doc.name,
                    type: doc.type,
                    extension: doc.extension,
                    path: doc.path,
                    imageId: doc.imageId
                  }
                })
                self.$message({
                  type: 'info',
                  message: `Document update with success!`
                })
                self.$refs[formName].resetFields()
                self.$router.push({ name: 'admin-documents' })
              } else {
                // Send updated data
                Meteor.callPromise('Documents.methods.update', {
                  _id: doc._id,
                  owner: user._id,
                  title: dataForm.title,
                  subtitle: dataForm.subtitle || '',
                  body: $('#DocEditor').froalaEditor('html.get') || '',
                  updatedAt: new Date()
                })
                self.$message({
                  type: 'info',
                  message: `Document update with success!`
                })
                self.$refs[formName].resetFields()
                self.$router.push({ name: 'admin-documents' })
              }
            }
          } catch (error) {
            self.$message({
              type: 'error',
              message: error.reason
            })
          }
        })
      },
      handleImageSuccess(res, file) {
        this.imageFileUpload = file
        let reader = new FileReader()
        reader.readAsDataURL(file.raw)
        reader.onload = () => {
          this.imageUrl = reader.result
        }
      },
      beforeImageUpload(file) {
        const isJPG = file.type === 'image/jpeg'
        const isPNG = file.type === 'image/png'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG && !isPNG) {
          this.$message.error('Image must be JPG or PNG format!')
        }
        if (!isLt2M) {
          this.$message.error('Image size can not exceed 2MB!')
        }
        return isJPG || isPNG && isLt2M
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
      }
    },
    components: {
      AdminSidebar,
      AdminContent,
      BackButton
    }
  }
</script>

<style lang="stylus">
@import '../../../../startup/client/styles/base/custom-properties'
.image-uploader 
  .el-upload
    border 1px dashed #d9d9d9
    border-radius 6px
    cursor pointer
    position relative
    overflow hidden
    float left
    transition border 0.2s ease-in-out
  &:hover
    border-color var(--color-primary)
  small
    position absolute
    bottom 0
    left 0
    right 0
    font-size 12px
    background #f5f7fa
    padding 8px 0
  .image-uploader-icon
    font-size 28px
    color #8c939d
    min-width 180px
    height 180px
    line-height 180px
    text-align center
  .image
    min-width 180px
    height 180px
    display block
</style>