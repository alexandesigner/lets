<template>
  <div class="documents">
    <Toolbar isBack />
    <div class="wrapper">
      <div v-if="documents.length > 0" class="documents-details">
        <img :src="currentDoc.image.length === undefined ? currentDoc.image.path : '/images/thumb.jpg'" :alt="currentDoc.title" />
        <h1>{{ currentDoc.title }}</h1>
        <strong>{{ currentDoc.owner }}</strong>
        <p v-html="currentDoc.body"></p>
      </div>
      <div v-else>Loading...</div>
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
    computed: {
      currentDoc: function() {
        return this.documents[0]
      }
    },
    meteor: {
      $subscribe: {
        'documents': [],
      },
      documents() {
        return Documents.find({
          _id: this.$route.params.documentId
        });
      },
    }
  }
</script>
