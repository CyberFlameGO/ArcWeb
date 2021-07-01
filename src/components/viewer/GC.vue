<template>
  <div class="gc">
    <br/>
    <b>{{name}}:</b>
    <br/>
    {{total}} <i>total collections</i>
    <br/>
    {{formatTime(time)}} <i>every</i> {{formatTime(frequency)}}
  </div>
</template>

<script>
export default {
  name: 'GC',
  props: {
    name: String,
    total: Number,
    time: Number,
    frequency: Number
  },
  methods: {
    formatTime(num) {
      if (num <= 0) {
        return '0s'
      }

      let second = num / 1000
      const minute = second / 60
      second = second % 60

      if (minute.toString().split('.')[0] !== '0') {
        return `${Math.round(minute)}m`
      } else if (second.toString().split('.')[0] !== '0') {
        return `${Math.round(second)}s`
      } else {
        return `${num}ms`
      }
    }
  },
  data() {
    return {
      shown: false
    }
  }
}
</script>
