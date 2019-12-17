<template>
  <admin-content>
    <admin-sidebar></admin-sidebar>
    <div class="admin-content_main">
      <header class="admin-content_main-header">
      	<h2 class="title">Users</h2>
      </header>
      <div class="admin-content_table">
        <el-table
          v-loading="!$subReady.users"
          element-loading-text="Wait a moment..."
          :data="users"
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
            label="Name">
            <template slot-scope="scope">
              <span>{{ scope.row.profile.firstName }} {{ scope.row.profile.lastName }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="Phone"
            width="220">
            <template slot-scope="scope">
              <i class="el-icon-mobile-phone"></i>
              <span>{{ scope.row.profile.phone }}</span>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            width="240">
            <template slot-scope="scope">
              <el-tooltip content="Edit user" placement="top">
                <el-button
                  size="small"
                  type="warning"
                  icon="el-icon-edit"
                  @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
              </el-tooltip>
              <el-tooltip content="Delete user" placement="top">
                <el-button
                  size="small"
                  type="danger" 
                  icon="el-icon-delete"
                  @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
              </el-tooltip>
            </template>
          </el-table-column>
          <span slot="empty">
            You have no registered user
          </span>
        </el-table>
      </div>
    </div>
  </admin-content>
</template>

<script>
  import AdminContent from '../../../components/Admin/AdminContent.vue'
  import AdminSidebar from '../../../components/Admin/AdminSidebar.vue'
  export default {
    name: 'admin-users',
  	meteor: {
      $subscribe: {
        'users': [],
      },
      users() {
        return Meteor.users.find({})
      },
    },
    methods: {
    	 handleEdit (index, row) {
        this.$router.push({
          name: 'admin-users-edit',
          params: { userId: row._id }
        })
      },
      async handleDelete (index, row) {
        try {
          await Meteor.callPromise('Users.methods.remove', {
            _id: row._id
          })
          this.$message({
            type: 'success',
            message: 'User removed!'
          })
        } catch (error) {
          this.$message({
            type: 'error',
            message: error
          })
        }
      },
    },
    components: {
      AdminContent,
      AdminSidebar
    }
  }
</script>
