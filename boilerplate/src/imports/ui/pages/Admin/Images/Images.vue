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
      <div class="admin-content_table">
        <el-table
          v-loading="!$subReady['files.images.all']"
          element-loading-text="Wait a moment..."
          :data="images"
          height="480"
          :default-sort = "{prop: 'created_at', order: 'descending'}"
          class="admin-content_main-table full-width">
          <el-table-column
            sortable
            prop="create_at"
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
            fixed="right"
            width="240">
            <template slot-scope="scope">
              <el-tooltip content="View image" placement="top">
                <el-button
                  size="small"
                  icon="el-icon-view"
                  @click="handleViewDetails(scope.row._id)">View</el-button>
              </el-tooltip>
              <el-tooltip content="Delete image" placement="top">
                <el-button
                  size="small"
                  type="danger" 
                  icon="el-icon-delete"
                  @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
              </el-tooltip>
            </template>
          </el-table-column>
          <span slot="empty">
            You have no registered image
          </span>
        </el-table>
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
        return Images.find({}, { sort: { createdAt: -1}}).fetch()
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
