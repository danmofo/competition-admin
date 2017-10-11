<template>
  <div>
    <h2 class="h3">Images</h2>
    <p>The images that will be displayed on site. <strong>Note:</strong> by default, each section in the competition will use this. This lets you have one banner for the whole thing, or different banners on different days if you need it.</p>

    <div>
      <h4 class="h4">Hero images
        <popover title="Why so many images?" placement="right">
          <a class="pseudo-link" data-role="trigger">Why so many images?</a>
          <div slot="popover">
            To ensure the competition looks great on all devices, we use different images at different screen sizes. These are generally specifically designed with that device in mind.
          </div>
        </popover>
      </h4>
      <div>
        <image-picker
          @changed="onImageSelected"
          competitionKey="heroImageUrlLarge"
          :storageKey="competition.heroImageUrlLarge" label="Large (desktops / tablets)" />
        <image-picker
          @changed="onImageSelected"
          competitionKey="heroImageUrlSmall"
          :storageKey="competition.heroImageUrlSmall" label="Small (mobiles)" />
      </div>
    </div>

    <div>
      <h4 class="h4">Banner Images</h4>
      <div>
        <image-picker
          @changed="onImageSelected"
          competitionKey="bannerImageUrlLarge"
          :storageKey="competition.bannerImageUrlLarge" label="Large (desktop)" />
          <image-picker
            @changed="onImageSelected"
            competitionKey="bannerImageUrlMedium"
            :storageKey="competition.bannerImageUrlMedium" label="Medium (tablets)" />
        <image-picker
          @changed="onImageSelected"
          competitionKey="bannerImageUrlSmall"
          :storageKey="competition.bannerImageUrlSmall" label="Small (mobile)" />
      </div>
    </div>
  </div>
</template>

<script>

import ImagePicker from './ImagePicker.vue';

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
    'image-picker': ImagePicker,
    'popover': Popover
  },
  props: ['competition'],
  data () {
    return {
      competitionTypes: COMPETITION_TYPES
    }
  },
  methods: {
    onImageSelected: function() {
      console.log('OnImageSelected:', arguments);
      var payload = arguments[0];

      console.log('On image selected ', payload.key, payload.newImage);

      this.competition[payload.key] = payload.newImage;
    }
  },
  computed: {
  }
}

</script>

<style lang="scss"></style>

