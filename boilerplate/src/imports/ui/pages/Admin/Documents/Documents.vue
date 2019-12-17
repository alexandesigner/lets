<template>
  <admin-content>
    <admin-sidebar></admin-sidebar>
    <div class="admin-content_main">
      <header class="admin-content_main-header">
        <h2 class="title">Documents</h2>
        <div class="actions">
          <el-button 
            type="primary" 
            :plain="true"
            @click="handleNewDocument">
            <span>New document</span>
          </el-button>
        </div>
      </header>
      <div class="admin-content_table">
        <el-table
          v-loading="!$subReady['documents.owner']"
          element-loading-text="Wait a moment..."
          :data="documents"
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
              <template v-if="isImage(scope.row.image)">
                <img :src="scope.row.image.path" width="42" height="42" />
              </template>
              <template v-else>
                <img src="/images/thumb.jpg" width="42" height="42" />
              </template>
            </template>
          </el-table-column>
          <el-table-column
            label="Title">
            <template slot-scope="scope">
              <span>{{ scope.row.title }}</span>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            width="300">
            <template slot-scope="scope">
              <el-tooltip content="View document" placement="top">
                <el-button
                  size="small"
                  icon="el-icon-view"
                  @click="handleViewDetails(scope.row._id)">View</el-button>
              </el-tooltip>
              <el-tooltip content="Edit document" placement="top">
                <el-button
                  size="small"
                  type="warning"
                  icon="el-icon-edit"
                  @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
              </el-tooltip>
              <el-tooltip content="Remove document" placement="top">
                <el-button
                  size="small"
                  type="danger" 
                  icon="el-icon-delete"
                  @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
              </el-tooltip>
            </template>
          </el-table-column>
          <span slot="empty">
            You have no registered documents
          </span>
        </el-table>
      </div>
    </div>
  </admin-content>
</template>

<script>
  import AdminSidebar from '../../../components/Admin/AdminSidebar'
  import AdminContent from '../../../components/Admin/AdminContent'
  import Documents from '../../../../api/Documents/documents'
  export default {
    name: 'admin-documents',
    meteor: {
      $subscribe: {
        'documents.owner': [],
      },
      documents() {
        return Documents.find({}, { sort: { createdAt: -1}})
      },
    },
    methods: {
      isImage (obj) {
        return Object.keys(obj).length !== 0
      },
      handleEdit (index, row) {
        this.$router.push({
          name: 'admin-documents-edit',
          params: { 
            documentId: row._id, 
            documentImageId: row.imageId 
          }
        })
      },
      handleViewDetails (id) {
        this.$router.push(`/documents/${id}`)
      },
      handleNewDocument () {
        this.$router.push({name: 'admin-documents-new'})
      },
      async handleDelete (index, row) {
        try {
          await Meteor.callPromise('Documents.methods.remove', {
            _id: row._id
          })
          this.$message({
            type: 'success',
            message: 'Document removed!'
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
