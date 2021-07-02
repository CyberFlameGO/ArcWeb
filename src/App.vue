<template>
  <router-view/>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    if (localStorage.getItem('theme') == null) {
      localStorage.setItem('theme', 'dark')
    }

    switch (localStorage.getItem('theme').toLowerCase()) {
      case 'light':
        for (const element of document.getElementsByTagName('*')) {
          element.setAttribute('theme', 'light')
        }
    }
  }
}
</script>
