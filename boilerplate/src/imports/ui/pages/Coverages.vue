<template>
  <div class="coverages">
    <h1>{{ count }} coverage(s)</h1>
    <input v-model="newCoverage" placeholder="Add a coverage" @keyup.enter="addCoverage" />
    <div v-for="coverage of coverages">
      {{ coverage.name }}
    </div>
  </div>
</template>

<script>
import { use } from 'vue-supply'
import { mapGetters } from 'vuex'

export default {
  mixins: [
    use('Coverages')
  ],
  data () {
    return {
      newCoverage: ''
    }
  },
  methods: {
    async addCoverage () {
      if (this.newCoverage) {
        try {
          await Meteor.callPromise('coverages.add', {
            name: this.newCoverage
          })
          console.log(this.newCoverage)
          this.newCoverage = ''
        } catch (e) {
          console.error(e)
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      count: 'coverages/count',
      coverages: 'coverages/all-coverages'
    })
  }
}
</script>
