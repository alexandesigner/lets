<template>
  <admin-content>
    <admin-sidebar></admin-sidebar>
    <div class="admin-content_main">
      <header class="admin-content_main-header">
        <h2 class="title">Images</h2>
        <div class="actions">
          <el-button 
            type="primary" 
            :plain="true"
            @click="handleNewImage">
            <span>New image</span>
          </el-button>
        </div>
      </header> 
      <el-table
        v-if="images.length > 0"
        :data="images"
        border
        style="width: 100%"
        class="admin-content_main-table">
        <el-table-column
          label="Created At"
          width="140">
          <template slot-scope="scope">
            <el-icon class="icon" name="time"></el-icon>
            <span>{{ scope.row.createdAt | date("L, LT") }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="Image"
          width="70">
          <template slot-scope="scope">
            <img :src="renderImages(scope.row)" width="42" height="42" />
          </template>
        </el-table-column>
        <el-table-column
          label="Name">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="Type"
          width="140">
          <template slot-scope="scope">
            <span>{{ scope.row.type }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="Actions"
          width="180">
          <template slot-scope="scope">
            <el-button
              size="small"
              @click="handleViewDetails(scope.row._id)">View</el-button>
            <el-button
              size="small"
              type="danger" 
              @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div v-else class="not-found">
        <h3>Not Found</h3>
      </div>
    </div>
  </admin-content>
</template>

<script>
  import AdminSidebar from '../../../components/Admin/AdminSidebar'
  import AdminContent from '../../../components/Admin/AdminContent'
  import Images from '../../../../api/Images/images'
  export default {
    name: 'admin-images',
    meteor: {
      $subscribe: {
        'files.images.all': [],
      },
      images() {
        return Images.find({})
      },
    },
    methods: {
      renderImages (fileObj) {
        return `${Meteor.settings.public.BASE_URL}${fileObj._downloadRoute}/Images/${fileObj._id}/original/${fileObj._id}${fileObj.extensionWithDot}`
      },
      isImage (obj) {
        return Object.keys(obj).length !== 0
      },
      handleEdit (index, row) {
        this.$router.push({
          name: 'admin-images-edit',
          params: { 
            imageId: row._id, 
            docImageId: row.imageId 
          }
        })
      },
      handleViewDetails (id) {
        // this.$router.push(`/images/${id}`)
      },
      handleNewImage () {
        this.$router.push({name: 'admin-images-new'})
      },
      async handleDelete (index, row) {
        try {
          await Meteor.callPromise('Images.methods.remove', {
            _id: row._id
          })
        } catch (error) {
          this.$message({
            type: 'error',
            message: error.reason
          })
        }
      }
    },
    components: {
      AdminSidebar,
      AdminContent
    }
  }
</script>
