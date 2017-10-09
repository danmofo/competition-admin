<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <h1 class="h2">Create a competition</h1>

          <h2 class="h3">Before starting</h2>
          <p>Make sure you have the following to hand, it will make things quicker</p>
          <ul>
            <li>The start and end date(s) of the competition.</li>
            <li>The images you're going to be using. <a href="" class="psuedo-link">What sizes?</a></li>
            <li>If the competitions has prizes, <a href="">add them here first</a>. If they are digital prizes, you should redeem them.</li>
          </ul>

          <step-one :competition="competition" v-if="navigation.current === 1"></step-one>
          <step-two :competition="competition" v-if="navigation.current === 2"></step-two>

          <div class="pull-right">
            <button class="btn btn-default" @click="advanceToPreviousStep()">Cancel</button>
            <button class="btn btn-primary" @click="advanceToNextStep()">Next step</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {
  Competition, COMPETITION_TYPES,
  Section,
  Question,
  Prize,
  PrizeGroup
} from './Competition'

import CompetitionBuilderStepOne from './components/CompetitionBuilderStepOne.vue';
import CompetitionBuilderStepTwo from './components/CompetitionBuilderStepTwo.vue';

export default {
  name: 'app',
  components: {
    'step-one' : CompetitionBuilderStepOne,
    'step-two' : CompetitionBuilderStepTwo
  },
  data () {
    return {
      competition: new Competition(),
      // Some primitive navigation variables to keep track of the state of the active / completed steps
      navigation: {
        max: 2,
        current: 1
      }
    }
  },
  methods: {
    advanceToPreviousStep() {
      var prev = this.navigation.current - 1;

      if(prev >= 1) {
        this.navigation.current = prev;
      }
    },
    advanceToNextStep () {
      var next = this.navigation.current + 1;

      if(next <= this.navigation.max) {
        this.navigation.current = next;
      }
    },
    gotoStepTwo () {
      this.navigation.current = 2;
    },
    gotoStepThree () {
      this.navigation.current = 3;
    }
  },
  computed: {}
}

</script>

<style lang="scss">
  .vdp-datepicker {
    margin-bottom: 15px;
  }

  .vdp-datepicker .input-group {
    width: 100%;
  }

  .pseudo-link {
    text-decoration: underline;
  }

  .text-subtle {
    color: #454545;
    font-weight: normal;
  }
</style>

