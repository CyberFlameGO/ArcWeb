<template>
  <div>
    <template v-if="status === 'LOADING'" />
    <template v-else-if="status === '404'">
      <Error404 />
    </template>
    <template v-else>
      {{profile}}
    </template>
  </div>
</template>

<script>
import Pbf from 'pbf'
import { Profile } from '@/proto/proto'

import Error404 from '../views/error/Error404'

export default {
  name: 'Viewer',
  data() {
    return {
      status: 'LOADING',
      profile: ''
    }
  },
  beforeMount() {
    (async () => {
      this.request = await fetch(`https://bytebin.lucko.me/${this.$route.params.id}`)
      this.status = (this.request.ok && this.request.headers.get('content-type') === 'application/x-arc-profiler') ? 'FOUND' : '404'

      const buf = await this.request.arrayBuffer()
      this.profile = Profile.read(new Pbf(new Uint8Array(buf)))
    })()
  },
  components: {
    Error404
  }
}
</script>
