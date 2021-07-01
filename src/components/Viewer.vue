<template>
  <div>
    <template v-if="status === 'LOADING'" />
    <template v-else-if="status === '404'">
      <Error404 />
    </template>
    <template v-else>
      <div class="viewer-nav">
        <ul>
          <li :class="{ active: view === 0 }" @click="view = 0">Server</li>
          <li :class="{ active: view === 1 }" @click="view = 1">CPU</li>
          <li :class="{ active: view === 2 }" @click="view = 2">Memory</li>
          <li :class="{ active: view === 3 }" @click="view = 3">Configs</li>
        </ul>
      </div>
      <template v-if="view === 0">
        server info :O
      </template>
      <template v-else-if="view === 1">
        accurate cpu profiler!
      </template>
      <template v-else-if="view === 2">
        accurate memory viewer!
      </template>
      <template v-else-if="view === 3">
        <div v-for="config in profile.minecraft.configs">
          <Config :filename="config.file" :content="config.content"/>
        </div>
      </template>
    </template>
  </div>
</template>

<script>
import Pbf from 'pbf'
import { Profile } from '@/proto'

import Config from "@/components/viewer/Config";
import Error404 from '@/views/error/Error404'

export default {
  name: 'Viewer',
  data() {
    return {
      status: 'LOADING',
      profile: Profile,
      view: 0
    }
  },
  methods: {
    onlineModeText(num) {
      switch (num) {
        case 0:
          return 'ENABLED'
        case 1:
          return 'DISABLED'
        case 2:
          return 'BUNGEE'
        case 3:
          return 'VELOCITY'
      }
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
    Config,
    Error404
  }
}
</script>
