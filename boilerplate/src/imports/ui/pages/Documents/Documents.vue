<template>
  <div class="documents">
    <header>
    	<h4>Documents</h4>
    </header>
    <div class="documents-item" v-for="document in documents" :key="document._id" @click="handleDocumentDetails(document._id)">
    	<h2>{{ document.title }}</h2>
    	<strong>{{ document.owner }}</strong>
    	<p>{{ document.body }}</p>
    </div>
  </div>
</template>

<script>
	import Documents from '../../../api/Documents/documents'
  export default {
    name: 'documents',
    methods: {
			handleDocumentDetails (id) {
        this.$router.push({
          name: 'documents-details',
          params: { documentId: id }
        })
      },
    },
    meteor: {
      $subscribe: {
        'documents': [],
      },
      documents() {
        return Documents.find({})
      },
    }
  }
</script>

<style lang="stylus" scoped>
.documents
  padding 20px 60px
  header
  	h4
  		font-size 32px
  		margin-bottom 20px
  		display flex
  .documents-item
  	margin-bottom 20px
</style>
