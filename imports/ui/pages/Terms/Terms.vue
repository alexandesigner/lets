<template>
  <static-page
    title="titulo da página"
    subtitle="subtitulo">
    <template slot="page">
      <terms-content></terms-content>
    </template>
  </static-page>
</template>

<script>
  import StaticPage from '../StaticPage/StaticPage'
  import TermsContent from './TermsContent'
  export default {
    name: 'terms',
    data () {
      return {
        currentView: TermsContent
      }
    },
    components: {
      StaticPage,
      TermsContent
    }
  }
</script>
