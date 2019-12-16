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
                  <strong class="form-label">Image Featured</strong>
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
                  <strong class="form-label">Title</strong>
                  <el-input placeholder="Please input document title" size="large" v-model="newDocument.title" auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="24">
                <el-form-item prop="subtitle">
                  <strong class="form-label">Subtitle</strong>
                  <el-input placeholder="Please input document subtitle" size="large" v-model="newDocument.subtitle" auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="24">
                <el-form-item prop="title">
                  <strong class="form-label">Content</strong>
                  <textarea
                    id="DocNew"
                    name="documentBody"></textarea>
                </el-form-item>
              </el-col>
              <el-col :lg="24">
                <el-button size="large" type="success" @click="handleSubmitForm('newDocument')" class="submit-button">Save</el-button>
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
  import AdminSidebar from '../../../components/Admin/AdminSidebar';
  import AdminContent from '../../../components/Admin/AdminContent';
  import BackButton from '../../../components/BackButton/BackButton';

  // Collections
  import Images from '../../../../api/Images/images'

  export default {
    name: 'admin-documents-new',
    data: () => ({
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
      $('#DocNew').froalaEditor({
        editorClass: 'TextInputEditor',
        height: 380,
        placeholderText: 'Start typing something...',
        toolbarButtons: [
          'bold',
          'italic',
          'underline',
          'insertLink',
          'insertImage',
          'embedly',
          'formatBlock',
          'quote',
          'align',
          'formatOL',
          'formatUL',
          'insertHR',
          'html'
        ],
        fileUploadParam: 'file_name',
        imageMaxSize: 5 * 1024 * 1024,
        imageAllowedTypes: ['jpeg', 'jpg', 'png']
      }).on('froalaEditor.image.beforeUpload', function (e, editor, files) {
        if (files.length) {
          let reader = new FileReader()
          reader.onload = function (e) {
            let result = e.target.result
            editor.image.insert(result, null, null, editor.image.get())
          }
          reader.readAsDataURL(files[0])
        }
        editor.popups.hideAll()
        return false
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
                  file: self.imageFileUpload.raw, // Get the raw file
                  streams: 'dynamic',
                  chunkSize: 'dynamic',
                  fileName: self.imageFileUpload.name
                }, false)

                // When upload status 'end' 
                uploadInstance.on('end', function(error, fileObj) {

                  // Check image upload
                  if (error) {
                    console.log('Error during upload: ' + error.reason)
                  } else {
                    // Get image path
                    let imagePath = Images.link(fileObj)
                    self.image = {
                      name: fileObj.name,
                      type: 'document',
                      extension: fileObj.extension,
                      path: imagePath,
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
              message: error.error
            })
          }
        })
      },
      handleImageSuccess(res, file) {
        this.imageFileUpload = file
        this.imageUrl = URL.createObjectURL(file.raw)
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
        'users': []
      },
      users() {
        return Meteor.users.find({},)
      },
    },
    components: {
      AdminSidebar,
      AdminContent,
      BackButton
    }
  }
</script>
