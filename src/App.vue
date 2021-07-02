<template>
  <router-view/>
</template>

<script>
export default {
  name: 'Arc',
  mounted() {
    switch (localStorage.getItem('theme').toLowerCase()) {
      case 'light':
        for (const element of document.getElementsByTagName('*')) {
          element.setAttribute('theme', 'light')
        }
    }
  }
}
</script>
