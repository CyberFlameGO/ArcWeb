<template>
  <div class="config">
    <h1 @click="shown = !shown"><font-awesome-icon :icon="['fas', 'angle-right']"/> {{filename}}</h1>
    <pre v-if="shown">{{content}}</pre>
  </div>
</template>

<script>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

export default {
  name: 'Config',
  props: {
    filename: String,
    content: String
  },
  data() {
    return {
      shown: false
    }
  },
  components: {
    FontAwesomeIcon
  }
}
</script>
