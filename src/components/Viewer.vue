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
              <b>Model:</b> {{profile.system.cpu.model}}
              <br/>
              <b>Cores/Threads:</b> {{profile.system.cpu.cores}}/{{profile.system.cpu.threads}}
              <br/>
              <b>Frequency:</b> {{(1e-9 * profile.system.cpu.frequency).toFixed(2)}}GHz
            </div>
            <div class="sub-box">
              <h2>Memory</h2>
              <b>Physical:</b> {{bytesToSize(profile.system.memory.physical)}}
              <br/>
              <b>Swap:</b> {{bytesToSize(profile.system.memory.swap)}}
              <br/>
              <b>Virtual:</b> {{bytesToSize(profile.system.memory.virtual)}}
              <br/>
              <b>Total: </b> {{bytesToSize(profile.system.memory.physical + profile.system.memory.swap)}}
            </div>
            <div class="sub-box">
              <h2>Operating System</h2>
              {{profile.system.os.manufacturer}} {{profile.system.os.family}} {{profile.system.os.version}} ({{profile.system.os.bitness}} bit)
            </div>
          </div>
          <div class="box">
            <h1>Server Info</h1>
            <p>
              <b>Version:</b> {{profile.minecraft.version}}
              <br/>
              <b>Online Mode:</b> {{onlineModeText(profile.minecraft.online_mode)}}
              <GC v-for="gc in profile.gcs" :name="gc.name" :total="gc.total" :time="gc.time" :frequency="gc.frequency"/>
            </p>
          </div>
          <div class="box">
            <h1>Virtual Machine</h1>
            <p>
              <b>Version:</b> {{profile.system.vm.version}}
              <br/>
              <b>Vendor:</b> {{profile.system.vm.vendor}}
              <br/>
              <b>VM:</b> {{profile.system.vm.vm}}
              <br/>
              <b>Runtime Name:</b> {{profile.system.vm.runtime_name}}
              <br/>
              <b>Runtime Version:</b> {{profile.system.vm.runtime_version}}
              <br/>
              <br/>
            </p>
            <b>Flags:</b>
            <p class="text-box">{{profile.system.vm.flags.join(' ')}}</p>
          </div>
        </div>
      </template>
      <template v-else-if="view === 1">
        todo: cpu profiler
      </template>
      <template v-else-if="view === 2">
        <div v-if="!profile.system.memory.debug_symbols" class="page">
          <br/>
          <h1>Memory Profile Disabled</h1>
          <p>This profile did capture memory information, are debug symbols installed?</p>
        </div>
        <div v-else>
          todo: memory profiler
        </div>
      </template>
      <template class="configs" v-else-if="view === 3">
        <Config v-for="config in profile.minecraft.configs" :filename="config.file" :content="config.content"/>
      </template>
    </template>
  </div>
</template>

<script>
import Pbf from 'pbf'
import { Profile } from '@/proto'

import Config from '@/components/viewer/Config'
import GC from '@/components/viewer/GC'
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
    },
    bytesToSize(bytes) {
      if (bytes === 0) return '0B';
      const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
      const i = Math.floor(Math.log(bytes) / Math.log(1024));
      return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + sizes[i];
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
