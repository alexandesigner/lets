<template>
  <admin-dashboard>
    <admin-sidebar></admin-sidebar>
    <div class="admin-dashboard_content">
      <header class="admin-dashboard_content-header">
      	<h2>Users</h2>
      </header>	
      <el-table
		    :data="users"
		    border
		    style="width: 100%"
		    class="admin-dashboard_content-table">
		    <el-table-column
		      label="Date"
		      width="220">
		      <template scope="scope">
		        <el-icon class="icon" name="time"></el-icon>
		        <span>{{ scope.row.createdAt | moment("L, LT") }}</span>
		      </template>
		    </el-table-column>
		    <el-table-column
		      label="Name">
		      <template scope="scope">
		        <el-popover trigger="hover" placement="top">
		          <p>Email: {{ scope.row.emails[0].address }}</p>
		          <p>Verified: {{ scope.row.emails[0].verified }}</p>
		          <div slot="reference" class="name-wrapper">
		            <el-tag>{{ scope.row.profile.firstName }} {{ scope.row.profile.lastName }}</el-tag>
		          </div>
		        </el-popover>
		      </template>
		    </el-table-column>
		    <el-table-column
		      label="Phone"
		      width="220">
		      <template scope="scope">
		        <svg class="icon">
	            <use xlink:href="#mobile" />
	          </svg>
		        <span>{{ scope.row.profile.phone }}</span>
		      </template>
		    </el-table-column>
		    <el-table-column
		      label="Actions">
		      <template scope="scope">
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
  </admin-dashboard>
</template>

<script>
  import AdminSidebar from '../../../components/Admin/AdminSidebar.vue'
  import AdminDashboard from '../../../components/Admin/AdminDashboard.vue'
  export default {
  	name: 'Users',
  	data: () => ({
      users: []
    }),
  	meteor: {
      subscribe: {
        'users': [],
      },
      users() {
        return Meteor.users.find({})
      },
    },
    methods: {
    	 handleEdit(index, row) {
        this.$router.push({
          name: 'admin-users-edit',
          params: { userId: row._id }
        })
      },
      handleDelete(index, row) {
        const userDataId = {
          _id: row._id
        };
        Meteor.call('Users.methods.remove', userDataId, (error, response) => {
          if (error) {
            // this.$message({
            //   type: 'danger',
            //   message: `Sorry.. Problem!`
            // });
            console.log(error.reason);
          } else {
            this.$message({
              type: 'info',
              message: `User removed with success!`
            });
          }
        });
      },
    },
    components: {
      AdminSidebar,
      AdminDashboard
    }
  }
</script>
