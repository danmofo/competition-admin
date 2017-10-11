<template>
  <div class="step-one">

    <h2 class="h3">Basic information</h2>

    <div class="row">
      <div class="col-sm-6">
        <!-- Name -->
        <div class="form-group">
          <label for="">Name</label>
          <p class="text-subtle">When mentioned on the website, this is what will be displayed.</p>
          <input v-model="competition.name" type="text" class="form-control" />
        </div>
      </div>
      <div class="col-sm-6">
        <div class="form-group">
          <label for="">Website URI</label>
          <p v-if="competition.name">We suggest: <strong>{{ suggestedCompetitionUri }}</strong> <a class="pseudo-link" @click="useSuggestedUri()" href="#">Use this</a></p>

          <div class="input-group">
            <input
              v-model="competition.uri"
              type="text"
              class="form-control"
              @focus="onFocusUriInput()" />
            <span class="input-group-btn">
                <button
                  @click="onCheckUriAvailability(competition.uri)"
                  class="btn btn-default"
                  type="button">Check availability</button>
            </span>
          </div>

          <div class="alert alert-danger" v-if="competitionUriAvailable">
              That URI is not available, try using another. <strong>Tip:</strong> Include the year if it's a seasonal event.
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-3">
        <div class="form-group">
          <label for="type">Type of competition
            <popover title="Explanation of types" placement="right">
              <a class="psuedo-link" data-role="trigger">(wtf?)</a>
              <div slot="popover">
                <ul>
                  <li><strong>Simple</strong>, example: Father's Day, Home and Garden</li>
                  <li><strong>Question</strong>, example: Easter, contains find the object on the retailer pages</li>
                  <li><strong>Question with prizes</strong>, as above, but the entry and winning process is instant</li>
                </ul>
              </div>
            </popover>
          </label>

          <select class="form-control" v-model="competition.type">
            <option v-for="type in competitionTypes" :value="type">{{ type }}</option>
          </select>
        </div>
      </div>
      <div class="col-sm-offset-3 col-sm-3">
        <div class="form-group">
          <label for="">Starts @ <span class="text-subtle"> 00:00</span></label>

          <datepicker
            v-model="competition.startDate"
            name="competition.startDate"
            format="dsu MMMM yyyy"
            :bootstrapStyling="true"
            :full-month-name="true"
            :clear-button="true"
            clear-button-icon="fa fa-times"
            ></datepicker>
          </div>
      </div>
        <div class="col-sm-3">
          <div class="form-group">
            <label for="">Ends @ <span class="text-subtle"> 23:59</span></label>

            <datepicker
              v-model="competition.endDate"
              name="competition.endDate"
              format="dsu MMMM yyyy"
              :bootstrapStyling="true"
              :full-month-name="true"
              :clear-button="true"
              clear-button-icon="fa fa-times"
              ></datepicker>
          </div>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-6">
        <div class="form-group" v-if="competition.type === 'SIMPLE'">
          <label for="">Content</label>
          <p class="text-suble">This text is displayed on the competition entry page. The following variables are available: <strong>list variables here</strong>.</p>
          <textarea class="form-control" v-model="competition.text" name="" id="" rows="5"></textarea>
        </div>
      </div>
    </div>

      <!-- Entry information -->

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
  name: 'competition-builder-step-one',
  components: {
    'datepicker': Datepicker,
    'popover': Popover,
    'modal': Modal
  },
  props: ['competition'],
  data () {
    return {
      competitionTypes: COMPETITION_TYPES,
      competitionUriAvailable: null
    }
  },
  methods: {
    useSuggestedUri() {
      this.competition.uri = this.suggestedCompetitionUri;
    },
    onCheckUriAvailability(uri) {
      this.competitionUriAvailable = isCompetitionUriAvailable(uri);
    },
    onFocusUriInput () {
      // Reset the state if the URI is actually invalid
      if(this.competitionUriAvailable !== null) {
        this.competition.uri = '';
        this.competitionUriAvailable = null;
      }
    }
  },
  computed: {
    'suggestedCompetitionUri': function() {
        return slugify(this.competition.name);
    }
  }
}

function slugify(name) {
  var re = /[^a-zA-Z_\-]/gi;

  return name.toLowerCase().replace(re, '-');
}

function isCompetitionUriAvailable(uri) {
  return true;
}

</script>

<style lang="scss"></style>

