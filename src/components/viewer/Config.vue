<template>
  <div class="config">
    <h1 @click="shown = !shown">{{filename}}</h1>
    <pre v-if="shown">{{content}}</pre>
  </div>
</template>

<script>
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
  }
}
</script>
