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
            <popover title="Types explained" placement="right">
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
      <div class="row">
          <div class="col-sm-12">
            <h2 class="h3">Entry information</h2>
            <p>These messages are displayed to the user immediately after entering the competition. The failure message is only displayed on the instant win competitions, since the user's of the shop to win competition aren't informed if they've won or not straight away.</p>
          </div>
          <div class="col-sm-6">
            <div class="form-group">
              <label for="">Success message</label>
              <textarea class="form-control" v-model="competition.successMessage" name="" id="" rows="3"></textarea>
            </div>
            <div class="form-group">
              <label for="">Failure message</label>
              <textarea class="form-control" v-model="competition.failureMessage" name="" id="" rows="3"></textarea>
            </div>
          </div>
          <div class="col-sm-6">
            <h3 class="h4">How do I fill this in?</h3>
            <p>Enter the text you'd like the user to see, to use dynamic things, make use of the following variables:</p>
            <ul>
              <li><strong>Competition name</strong> - <code>$$name$$</code></li>
              <li><strong>Retailer name</strong> - <code>$$retailer$$</code></li>
              <li><strong>Competition start date</strong> - <code>$$start_date$$</code></li>
              <li><strong>Competition end date</strong> - <code>$$end_date$$</code></li>
            </ul>
            <p><strong>Note:</strong> These have to be made available for you, they are not all implicitly available.</p>
            <p>For example: <code>Thank you for entering the $$name$$ competition, sponsored by $$retailer$$, make sure you shop before $$end_date$$ to be in with a chance of winning.</code></p>
          </div>

          <!-- Email name -->
          <div class="col-sm-12">
              <div class="row">
                <div class="col-sm-6">
                  <label for="">Email name</label>
                  <p>This is the email that will be emailed to users, based on the conditions listed on the right</p>
                  <input v-model="competition.emailName" type="text" class="form-control" />
                </div>
                <div class="col-sm-6">
                  <h3 class="h4">When will the email get sent?</h3>
                  <table class="table table-striped">
                    <thead>
                      <tr>
                        <th width="150">Type</th>
                        <th>When</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><strong>Simple</strong></td>
                        <td>Immediately after filling in the entry form.</td>
                      </tr>
                      <tr>
                        <td><strong>Question</strong></td>
                        <td>Immediately after filling in the entry form</td>
                      </tr>
                      <tr>
                        <td><strong>Question / Prize</strong></td>
                        <td>Immediately after finding, clicking the object <strong>AND WINNING</strong>. If the user does not win they are not emailed, instead they are shown the failure message above.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
          </div>

          <div class="col-sm-12">
            <div class="form-group">
              <p><strong>How many entries can be made to the competition?</strong></p>

              <!-- This could be some sort of picker component - so much duplication -->
              <div class="btn-group">
                <button
                  :class="{ 'btn-primary': !competition.allowsMultipleEntries}"
                  @click="competition.allowsMultipleEntries = false"
                  class="btn btn-default">One entry</button>
                <button
                  :class="{ 'btn-primary': competition.allowsMultipleEntries}"
                  @click="competition.allowsMultipleEntries = true"
                  class="btn btn-default">Multiple entries</button>
              </div>
            </div>
          </div>


      </div>
  </div>
  <!-- <div id="app">
    <div class="container">
      <div class="row">
        <div class="col-sm-12"></div>
        <div class="col-sm-6">
          <h2 class="h3">Post entry content</h2>
          <div class="form-group">
            <label for="">Success message</label>
            <p class="text-subtle">Displayed to the user after entering.</p>
            <input type="text" class="form-control" v-model="competition.successMessage" />
          </div>
          <div class="form-group">
            <label for="">Failure message</label>
            <p class="text-subtle">Displayed to the user after entering and failing to win.</p>
            <input v-model="competition.failureMessage" class="form-control" type="text" />
          </div>
        </div>
        <div class="col-sm-12">
          <div class="pull-right">
            <button class="btn btn-default">Cancel</button>
            <button class="btn btn-primary">Next step</button>
          </div>
        </div>
      </div>
    </div>
    <modal v-model="modalOpen" title="Modal 1">
      <p>This is a simple modal.</p>
    </modal>
  </div> -->
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

