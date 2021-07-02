<template>
  <div class="config">
    <h1 @click="shown = !shown"><font-awesome-icon :class="{ rotate: shown }" :icon="['fas', 'angle-right']"/> {{filename}}</h1>
    <highlight v-if="shown" :code="content"/>
  </div>
</template>

<script>
import Highlight from '@highlightjs/vue-plugin'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

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
    highlight: Highlight.component,
    FontAwesomeIcon
  }
}
</script>
