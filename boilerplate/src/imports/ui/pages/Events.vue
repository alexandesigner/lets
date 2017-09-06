<template>
  <div class="events">
    <input v-model="newEvent" placeholder="Add a event" @keyup.enter="addEvent" />
    <div class="events">
      <div class="event" v-for="item in events" :class="{ many: events.length > 1 }">
        <div class="text">{{ item.name }}</div>
        <div class="actions">
          <button @click="event => removeEvent(item)">Delete event</button>
          <span class="date">{{ item.created | date }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { use } from 'vue-supply'
import { mapGetters } from 'vuex'

export default {
  mixins: [
    use('Events'),
  ],
  data () {
    return {
      newEvent: '',
      limit: 5
    }
  },
  methods: {
    async addEvent () {
      if (this.newEvent) {
        try {
          await Meteor.callPromise('events.add', {
            name: this.newEvent,
          })
          this.newEvent = ''
        } catch (e) {
          console.error(e)
        }
      }
    },
    async removeEvent (item) {
      try {
        await Meteor.callPromise('events.remove', {
          _id: item._id,
        })
      } catch (e) {
        console.error(e)
      }
    },
  },
  computed: {
    ...mapGetters({
      count: 'events/count',
      events: 'events/all-events'
    })
  }
}
</script>

<style lang="stylus" scoped>
.event
  padding 32px 0

  &:not(:last-child)
    border-bottom solid 1px fade(black, 10%)

  .text
    margin-bottom 12px

  .date
    margin-left 16px
    color lighten(black, 70%)

input
  display block
  width 100%
</style>
