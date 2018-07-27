<template>
  <admin-content>
    <admin-sidebar></admin-sidebar>
    <div class="admin-content_main">
      <header class="admin-content_main-header is-back-button">
        <back-button></back-button>
        <h2 class="title">New Image</h2>
      </header> 
      <div class="admin-content_main-form">
        <el-card class="box-card">
          <el-form :model="newImage" ref="newImage" class="form-model">
            <el-row :gutter="10">
              <el-col :lg="24">
                  <strong class="form-label">Image</strong>
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
                <el-button size="large" type="success" @click="handleSubmitForm('newImage')" class="submit-button">Save</el-button>
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
    name: 'admin-images-new',
    data: () => ({
      users: [],
      imageUrl: null,
      imageFileUpload: '',
      image: [],
      newImage: {
        image: {
          name: '',
          type: '',
          extension: '',
          path: '',
          imageId: ''
        }
      }
    }),
    computed: {
      baseUrl () {
        return Meteor.settings.public.BASE_URL
      }
    },
    methods: {
      // Form submit
      handleSubmitForm () {
        let self = this
        let dataForm = self.newImage
        let user = self.users[0]
        if (self.imageUrl !== null) {
          // Create upload instance
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
            }
            self.$message({
              type: 'info',
              message: `Image created with success!`
            })
            self.$router.push({ name: 'admin-images' })
          })
          uploadInstance.start()
        }
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
