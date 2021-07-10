<template>
  <div>
    <template v-if="status === 'LOADING'" />
    <template v-else-if="status === '404'">
      <Error404/>
    </template>
    <template v-else>
      <nav>
        <ul>
          <li :class="{ active: view === 0 }" @click="view = 0">Server</li>
          <li :class="{ active: view === 1 }" @click="view = 1">CPU</li>
          <li :class="{ active: view === 2 }" @click="view = 2">Memory</li>
          <li :class="{ active: view === 3 }" @click="view = 3">Configs</li>
        </ul>
      </nav>
      <template v-if="view === 0">
        <div class="boxes">
          <div class="box">
            <h1>System</h1>
            <div class="sub-box">
              <h2>CPU</h2>
              <b>Model:</b> {{profile.info.system.cpu.model}}
              <br/>
              <b>Cores/Threads:</b> {{profile.info.system.cpu.cores}}/{{profile.info.system.cpu.threads}}
              <br/>
              <b>Frequency:</b> {{(1e-9 * profile.info.system.cpu.frequency).toFixed(2)}}GHz
            </div>
            <div class="sub-box">
              <h2>Memory</h2>
              <b>Physical:</b> {{bytesToSize(profile.info.system.memory.physical)}}
              <br/>
              <b>Swap:</b> {{bytesToSize(profile.info.system.memory.swap)}}
              <br/>
              <b>Virtual:</b> {{bytesToSize(profile.info.system.memory.virtual)}}
              <br/>
              <b>Total: </b> {{bytesToSize(profile.info.system.memory.physical + profile.info.system.memory.swap)}}
            </div>
            <div class="sub-box">
              <h2>Operating System</h2>
              {{profile.info.system.os.manufacturer}} {{profile.info.system.os.family}}
              <br/>
              {{profile.info.system.os.version}} ({{profile.info.system.os.bitness}} bit)
            </div>
          </div>
          <div class="box">
            <h1>Server Info</h1>
            <p>
              <b>Uptime:</b> {{formatTime(profile.info.server.uptime)}}
              <br/>
              <b>Version:</b> {{profile.info.server.version}}
              <br/>
              <b>Online Mode:</b> {{onlineModeText(profile.info.server.online_mode)}}
              <GC v-for="gc in profile.info.server.gcs" :name="gc.name" :total="gc.total" :time="gc.time" :frequency="gc.frequency"/>
            </p>
          </div>
          <div class="box">
            <h1>Java</h1>
            <p>
              <b>Version:</b> {{profile.info.java.version}}
              <br/>
              <b>Vendor:</b> {{profile.info.java.vendor}}
              <br/>
              <b>VM:</b> {{profile.info.java.vm}}
              <br/>
              <b>Runtime Name:</b> {{profile.info.java.runtime_name}}
              <br/>
              <b>Runtime Version:</b> {{profile.info.java.runtime_version}}
              <br/>
              <br/>
            </p>
            <b>Flags:</b>
            <p class="text-box">{{profile.info.java.flags.join(' ')}}</p>
          </div>
        </div>
      </template>
      <template v-else-if="view === 1">
        {{profile}}
      </template>
      <template v-else-if="view === 2">
        <div v-if="!profile.profiler.memory.debug_symbols" class="page">
          <br/>
          <h1>Memory Profile Disabled</h1>
          <p>This profile did capture memory information, are debug symbols installed?</p>
        </div>
        <div v-else>
          todo: memory profile
        </div>
      </template>
      <template class="configs" v-else-if="view === 3">
        <Config v-for="config in profile.info.server.configs" :filename="config.file" :content="config.content"/>
      </template>
    </template>
  </div>
</template>

<script>
import Pbf from 'pbf'
import { Profile } from '../proto'

import Config from './viewer/Config'
import GC from './viewer/GC'
import Error404 from '../views/error/Error404'

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
    },
    bytesToSize(bytes) {
      if (bytes === 0) return '0B';
      const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
      const i = Math.floor(Math.log(bytes) / Math.log(1024));
      return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + sizes[i];
    },
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
    GC,
    Error404
  }
}
</script>
