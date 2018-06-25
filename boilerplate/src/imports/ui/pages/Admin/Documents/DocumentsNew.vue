<template>
  <admin-content>
    <admin-sidebar></admin-sidebar>
    <div class="admin-content_main">
      <header class="admin-content_main-header is-back-button">
        <back-button></back-button>
        <h2 class="title">Documents New <small>- {{ newDocument.title }}</small></h2>
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
                <el-form-item prop="body">
                  <el-input placeholder="Please input document body" size="large" v-model="newDocument.body" auto-complete="off"></el-input>
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
        ],
        body: [
          { required: true, message: 'Please input body text', trigger: 'blur' },
        ]
      },
    }),
    computed: {
      baseUrl () {
        return Meteor.settings.public.BASE_URL
      }
    },
    methods: {
      // Form submit
      handleSubmitForm (formName) {

        let self = this

        // Check if upload image
        if (self.imageUrl !== null) {

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
              this.image = {
                name: fileObj.name,
                type: 'document',
                extension: fileObj.extension,
                path: `${Meteor.settings.public.BASE_URL}${fileObj._downloadRoute}/Images/${fileObj._id}/original/${fileObj._id}${fileObj.extensionWithDot}`,
                imageId: fileObj._id
              }
              console.log('File "' + fileObj.name + '" successfully uploaded')
            }

            // Form Update
            self.$refs[formName].validate((valid) => {
              try {
                if (valid) {
                  let dataForm = self.newDocument
                  let user = self.users[0]
                  let image = this.image

                  // Send insert data
                  Meteor.callPromise('Documents.methods.insert', {
                    createdAt: new Date(),
                    owner: user._id,
                    title: dataForm.title,
                    body: dataForm.body,
                    image: {
                      name: image.name,
                      type: image.type,
                      extension: image.extension,
                      path: image.path,
                      imageId: image.imageId
                    }
                  })
                  self.$message({
                    type: 'info',
                    message: `Document created with success!`
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

        } else {
          // Form Created
          self.$refs[formName].validate((valid) => {
            try {
              if (valid) {
                let dataForm = self.newDocument
                let user = self.users[0]

                // Send insert data
                Meteor.callPromise('Documents.methods.insert', {
                  createdAt: new Date(),
                  owner: user._id,
                  title: dataForm.title,
                  body: dataForm.body,
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
            } catch (error) {
              self.$message({
                type: 'error',
                message: error.reason
              })
            }
          })
        }
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
