<template>
  <div>
    <p>This is step two.</p>
  </div>
</template>

<script>

import {
  Competition, COMPETITION_TYPES,
  Section,
  Question,
  Prize,
  PrizeGroup
} from '../Competition'

import Datepicker from 'vuejs-datepicker';
import {
  Popover,
  Modal
} from 'uiv';

export default {
  name: 'competition-builder-step-two',
  components: {

  },
  props: ['competition'],
  data () {
    return {
      competitionTypes: COMPETITION_TYPES
    }
  },
  methods: {
  },
  computed: {
  }
}

</script>

<style lang="scss"></style>

