<template>
<div class="image-picker">
  <div class="row">
    <div class="col-sm-12">
      <div class="image-picker-selection">
        <strong>{{ label }}</strong>
        <div v-if="hasKey">
          <span class="text-subtle">{{ storageKey }}</span> -
          <span class="btn-group">
            <button class="btn btn-sm btn-danger" @click="onRemoveImage">Remove</button>
            <button class="btn btn-sm btn-default" @click="onPreviewImage">Preview</button>
            <button class="btn btn-sm btn-default" @click="onChangeImage">Change</button>
          </span>
        </div>
        <div v-else>
          <span class="text-subtle">No image selected</span> -
          <button class="btn btn-sm btn-primary" @click="onSelectImage">Select one</button>
        </div>
      </div>
      <div class="image-picker-image-list" v-if="isSelecting">
        <h4 class="h4">Select an image from the list below:</h4>
        <p>These are images you've uploaded so far...</p>
        <div class="image-list">
          <div class="image-list__item"
               v-for="image in availableImages">
                {{ image.key }} -
                <button class="btn btn-sm btn-default" @click="selectImage(image.key)">Select</button>
          </div>
          <p>Can't see your image?</p>
          <div class="dropzone">
              Drag and drop images here to upload.
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'image-picker',
  props: ['competitionKey', 'label', 'storageKey'],
  data () {
    return {
      isSelecting: false,
      availableImages: []
    }
  },
  methods: {
    onSelectImage () {
      this.isSelecting = true;
      this.availableImages = ImageService.list();
    },
    onRemoveImage () {
      this.$emit('changed', {
        key: this.competitionKey,
        newImage: null
      });
    },
    onChangeImage () {
      this.isSelecting = true;
    },
    onPreviewImage () {
      console.log('Should show previous thing here...');
    },
    selectImage (newImage) {
      this.$emit('changed', {
        key: this.competitionKey,
        newImage: newImage
      });

      this.isSelecting = false;
    }
  },
  computed: {
    hasKey: function() {
      return !!this.storageKey;
    }
  }
}

class Image {
  constructor(key) {
    this.key = key;
  }
}

class ImageService {
  constructor() {
    this.cache = [];
  }

  static list(folder = '/misc/', forceReload = false) {
    if(forceReload || !this.cache) {
      console.log('Fetching images from client cache for folder ' + folder + '' + ', forceReload=' + forceReload);
      this.cache = [
        new Image("Images/mycoolimage/12345.jpg"),
        new Image("Images/mycoolimage/foobar.jpg"),
        new Image("Images/mycoolimage/this-is-awesome-1234.jpg"),
        new Image("Images/mycoolimage/this-is-stupid.png"),
        new Image("Images/mycoolimage/blasttothepast.png"),
      ]
    }

    return this.cache;
  }
}

</script>

<style lang="scss">
  .image-picker-image-list {
    background-color: rgba(204, 204, 204, 0.36);
    padding: 20px 25px;
    border-radius: 5px;
  }

  .dropzone {
    border: 3px solid #CCC;
    border-style: dashed;
    padding: 20px 25px;
  }

  .image-list__item {
    padding-top: 5px;
    padding-bottom: 5px;
    border-bottom: 1px solid #CCC;
  }

  .image-list__item--selected {
    background-color: #44b4e4;
    color: #FFF;
  }
</style>
