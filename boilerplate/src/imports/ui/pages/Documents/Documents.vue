<template>
  <div class="documents">
    <Toolbar />
    <div class="wrapper">
      <div class="col" v-for="document in documents" :key="document._id" @click="handleDocumentDetails(document._id)">
        <div class="documents-item">
          <h2>{{ document.title }}</h2>
          <strong>{{ document.owner }}</strong>
          <p v-html="document.body"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Toolbar from '../../components/Toolbar'
	import Documents from '../../../api/Documents/documents'
  export default {
    name: 'documents',
    components: {
      Toolbar
    },
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
        return Documents.find({}, { sort: { createdAt: -1}}).fetch()
      },
    }
  }
</script>

<style lang="stylus" src="../../../startup/client/styles/pages/documents.styl" />
