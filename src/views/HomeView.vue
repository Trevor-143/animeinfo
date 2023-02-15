<template>
  <div class="home">
    <h1>This is Vue</h1>
  </div>
</template>


<script>
import { ref, onBeforeMount } from "vue";

export default {
  name: 'HomeView',
  setup() {
    const topAnime = ref([])

    onBeforeMount(() => {
      fetch(`https://api.jikan.moe/v4/top/anime`)
      .then(resp => resp.json())
      .then(data => {
        topAnime.value = data.data
        // console.log(topAnime.value)
      })
    })
    return {
      topAnime
    }
  }
}
</script>
