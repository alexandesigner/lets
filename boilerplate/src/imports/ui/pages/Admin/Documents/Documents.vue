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
      <el-table
        :data="documents"
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
          label="Title">
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="Body">
          <template slot-scope="scope">
            <span>{{ scope.row.body }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="Actions">
          <template slot-scope="scope">
            <el-button
              size="small"
              @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </admin-content>
</template>

<script>
  import AdminSidebar from '../../../components/Admin/AdminSidebar'
  import AdminContent from '../../../components/Admin/AdminContent'
  import Documents from '../../../../api/Documents/documents'
  export default {
    name: 'admin-documents',
    data: () => ({
      documents: []
    }),
    meteor: {
      $subscribe: {
        'documents.owner': [],
      },
      documents() {
        return Documents.find({})
      },
    },
    methods: {
      handleEdit (index, row) {
        this.$router.push({
          name: 'admin-documents-edit',
          params: { 
            documentId: row._id, 
            documentImageId: row.imageId 
          }
        })
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
            type: 'info',
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
