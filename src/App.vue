<template>
  <header class="header">
    <img :src="headerAnime.trailer.images.maximum_image_url" :alt="headerAnime.title">
    <div class="headerAnimeInfo">
      <h3>{{ headerAnime.title }}</h3>
      <p>{{ headerAnime.synopsis }}</p>
      <div class="headTags">
        <h3>{{ headerAnime.type }}</h3>
        <h3>{{ headerAnime.source }}</h3>
        <h3>{{ headerAnime.year }}</h3>
        <router-link :to="headerAnime.trailer.url">trailer</router-link>
      </div>
    </div>
  </header>


  <router-view/>
</template>

<script>


import { ref, onBeforeMount } from "vue";

export default {
  name: 'HomeView',
  setup() {
    const headerAnime = ref([])

    onBeforeMount(() => {
      fetch(`https://api.jikan.moe/v4/top/anime`)
      .then(resp => resp.json())
      .then(data => {
        headerAnime.value = data.data[0]
        console.log(headerAnime.value)
      })
    })
    return {
      headerAnime
    }
  }
}
</script>

<style>

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'poppins', sans-serif;
}

header {
  top: 0;
  width: 100%;
  max-height: 60vh;
  position: relative;
}

header img {
  width: 100%;
  height: 60vh;
  object-fit: cover;
  object-position: center;
}

.headerAnimeInfo {
  position: absolute;
  top: 0;
  left: 0;
}


</style>
