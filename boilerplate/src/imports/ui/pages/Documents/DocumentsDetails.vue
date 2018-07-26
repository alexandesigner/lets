<template>
  <div class="documents">
    <Toolbar :isBack="true" />
    <div class="wrapper">
      <div class="documents-details">
        <template v-if="isImage(documents[0].image)">
          <img  :src="documents[0].image.path" :alt="documents[0].title" />
        </template>
        <template v-else />
        <h1>{{ documents[0].title }}</h1>
        <strong>{{ documents[0].owner }}</strong>
        <p v-html="documents[0].body"></p>
      </div>
    </div>
  </div>
</template>

<script>
  import Toolbar from '../../components/Toolbar'
	import Documents from '../../../api/Documents/documents'
  export default {
    name: 'documents-details',
    components: {
      Toolbar
    },
    data: () => ({
    	users: [],
    	documents: []
    }),
    methods: {
      isImage (obj) {
        return Object.keys(obj).length !== 0
      }
    },
    meteor: {
      $subscribe: {
        'documents': [],
      },
      users() {
        return Meteor.users.find({})
      },
      documents() {
        return Documents.find({
          _id: this.$route.params.documentId
        });
      },
    }
  }
</script>
