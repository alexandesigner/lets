<template>
  <admin-content>
    <admin-sidebar></admin-sidebar>
    <div class="admin-content_main">
      <div class="wrapper p2">
        <div class="col">
          <div class="item">
            <strong>Users</strong>
            <span>{{ users.length }}</span>
          </div>
        </div>
        <div class="col">
          <div class="item">
            <strong>Documents</strong>
            <span>{{ documents.length }}</span>
          </div>
        </div>
        <div class="col">
          <div class="item">
            <strong>Images</strong>
            <span>{{ images.length }}</span>
          </div>
        </div>
      </div>
    </div>
  </admin-content>
</template>

<script>
  import AdminSidebar from '../../../components/Admin/AdminSidebar'
  import AdminContent from '../../../components/Admin/AdminContent'
  import Images from '../../../../api/Images/images'
  import Documents from '../../../../api/Documents/documents'

  export default {
    name: 'admin-dashboard',
    meteor: {
      $subscribe: {
        'users': [],
        'documents.owner': [],
        'files.images.all': [],
      },
      users() {
        return Meteor.users.find({})
      },
      documents() {
        return Documents.find({})
      },
      images() {
        return Images.find({})
      }
    },
    components: {
      AdminSidebar,
      AdminContent
    }
  }
</script>

<style lang="stylus">
@import '../../../../startup/client/styles/base/custom-properties.styl'
.wrapper
  width 100%
  .item
    background #fff
    padding 15px
    margin 5px
    display flex
    flex-direction column
    align-items center
    justify-content center
    height 120px
    box-shadow var(--base-shadow)
    strong
      font-size 22px
      margin-bottom 10px
    span 
      font-size 32px
</style>