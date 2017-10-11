<template>
  <div id="app">
    <div class="container">
      <pre>{{ competition }}</pre>
      <div class="row">
        <div class="col-sm-12">
          <h1 class="h2">Create a competition</h1>

          <p class="h4">Step {{ navigation.current }} of {{ navigation.max }}</p>

          <step-one
            :competition="competition"
            v-show="navigation.current === 1"></step-one>
          <step-two
            :competition="competition"
            v-show="navigation.current === 2"></step-two>
          <step-three
            :competition="competition"
            v-show="navigation.current === 3"></step-three>

          <div class="pull-right">
            <button class="btn btn-default" v-if="navigation.current > 1" @click="advanceToPreviousStep()">Back</button>
            <button class="btn btn-primary" @click="advanceToNextStep()">Next step</button>
          </div>

          <modal @hide="onModalHide" v-model="showStartingModal" title="Before you start..." ok-text="OK, I understand">
            <p>Make sure you have the following to hand, it will make things quicker</p>
            <ul>
              <li>The start and end date(s) of the competition.</li>
              <li>The images you're going to be using. <a href="" class="psuedo-link">What sizes?</a></li>
              <li>If the competitions has prizes, <a href="">add them here first</a>. If they are digital prizes, you should redeem them.</li>
            </ul>
          </modal>
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

import { Modal } from 'uiv';

import CompetitionBuilderStepOne from './components/CompetitionBuilderStepOne.vue';
import CompetitionBuilderStepTwo from './components/CompetitionBuilderStepTwo.vue';
import CompetitionBuilderStepThree from './components/CompetitionBuilderStepThree.vue';

export default {
  name: 'app',
  components: {
    'step-one' : CompetitionBuilderStepOne,
    'step-two' : CompetitionBuilderStepTwo,
    'step-three' : CompetitionBuilderStepThree,
    Modal
  },
  data () {
    return {
      competition: new Competition(),
      // Some primitive navigation variables to keep track of the state of the active / completed steps
      navigation: {
        max: 3,
        current: 1
      },
      showStartingModal: false
    }
  },
  methods: {
    onModalHide () {
      console.log('Hiding the modal.');
    },
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

