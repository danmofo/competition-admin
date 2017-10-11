<template>
  <div>
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
  name: 'competition-builder-step-three',
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

