<template>
  <admin-content>
    <admin-sidebar></admin-sidebar>
    <div class="admin-content_main">
      <header class="admin-content_main-header is-back-button">
        <back-button></back-button>
        <h2 class="title">New Document</h2>
      </header> 
      <div class="admin-content_main-form">
        <el-card class="box-card">
          <el-form :model="newDocument" :rules="rules" ref="newDocument" class="form-model">
            <el-row :gutter="10">
              <el-col :lg="24">
                  <el-upload
                    class="image-uploader"
                    :action="baseUrl"
                    :show-file-list="false"
                    :on-success="handleImageSuccess"
                    :before-upload="beforeImageUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="image">
                    <i v-else class="el-icon-plus image-uploader-icon"></i>
                  </el-upload>
              </el-col>
              <el-col :lg="24">
                <el-form-item prop="title">
                  <el-input placeholder="Please input document title" size="large" v-model="newDocument.title" auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="24">
                <el-form-item prop="subtitle">
                  <el-input placeholder="Please input document subtitle" size="large" v-model="newDocument.subtitle" auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="24">
                <el-form-item prop="title">
                  <textarea
                    id="FormEditor"
                    name="documentBody"></textarea>
                </el-form-item>
              </el-col>
              <el-col :lg="24">
                <el-button size="large" type="success" @click="handleSubmitForm('newDocument')" class="submit-button full-width">Save</el-button>
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
  import AdminSidebar from '../../../components/Admin/AdminSidebar.vue';
  import AdminContent from '../../../components/Admin/AdminContent.vue';
  import BackButton from '../../../components/BackButton/BackButton.vue';

  // Collections
  import Images from '../../../../api/Images/images'

  export default {
    name: 'admin-documents-new',
    data: () => ({
      users: [],
      imageUrl: null,
      imageFileUpload: '',
      image: [],
      newDocument: {
        title: '',
        subtitle: '',
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
      $('#FormEditor').froalaEditor({
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

              let dataForm = self.newDocument
              let user = self.users[0]

              // Create upload instance
              if (self.imageUrl !== null) {
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

                  // Send insert data
                  Meteor.callPromise('Documents.methods.insert', {
                    createdAt: new Date(),
                    owner: user._id,
                    title: dataForm.title,
                    subtitle: dataForm.subtitle,
                    body: document.querySelector('[name="documentBody"]').value || '',
                    image: {
                      name: self.image.name,
                      type: self.image.type,
                      extension: self.image.extension,
                      path: self.image.path,
                      imageId: self.image.imageId
                    }
                  })
                  self.$message({
                    type: 'info',
                    message: `Document created with success!`
                  })
                  self.$refs[formName].resetFields()
                  self.$router.push({ name: 'admin-documents' })
                  
                })

                uploadInstance.start()
              } else {
                Meteor.callPromise('Documents.methods.insert', {
                  createdAt: new Date(),
                  owner: user._id,
                  title: dataForm.title,
                  subtitle: dataForm.subtitle,
                  body: document.querySelector('[name="documentBody"]').value || '',
                  image: {
                    name: '',
                    type: '',
                    extension: '',
                    path: '',
                    imageId: ''
                  }
                })
                self.$message({
                  type: 'info',
                  message: `Document created with success!`
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
        'users': [],
      },
      users() {
        return Meteor.users.find({})
      },
    },
    components: {
      AdminSidebar,
      AdminContent,
      BackButton
    }
  }
</script>

<style lang="stylus">
.TextInputEditor
  .fr-top
    border-top 0
    margin-bottom 10px
    box-shadow 0 0 -6px 4px rgba(0,0,0,0.08)
    border-radius 4px
  .fr-wrapper
    box-shadow 0 0 0 0!important
  .fr-toolbar,
  .fr-wrapper
    border-radius 4px
    .fr-placeholder
      font-weight 400!important
      font-size 15px
      line-height 22px
      color rgba(0, 0, 0, 0.298039)!important
  .fr-toolbar
    background #f1f1f1
    border-radius 0 0 0 0
    margin-top 10px
    max-height 38px
  .fr-element
    border 1px solid #e5e5e5
    text-align left
    transition border 0.2s ease-in-out
    box-shadow 0 0 0 0 !important
    border-radius 4px
    ol, ul
      padding-left 15px
    &:hover
      border-color #c0c4cc
    &:focus, &:active
      border-color #674CD8
      
.fr-quick-insert
  display none!important
.labelTitle
  font-size 18px
  display block
  width 100%
  color #37474F!important
  font-weight 400  
</style>