<template>
  <header class="header">
    <img class="headerBack" :src="headerAnime.trailer.images.maximum_image_url" :alt="headerAnime.title">
    <div class="headerAnimeInfo">
      <img class="innerHeaderImage" :src="headerAnime.images.webp.image_url" :alt="headerAnime.title">
      <div class="infoSide">
        <h3>{{ headerAnime.title }}</h3>
        <p>{{ headerAnime.synopsis }}</p>
        <div class="headTags">
          <h3>{{ headerAnime.type }}</h3>
          <h3>{{ headerAnime.source }}</h3>
          <h3>{{ headerAnime.year }}</h3>
          <router-link class="headerT" :to="headerAnime.trailer.url">trailer</router-link>
        </div>
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
        headerAnime.value = data.data[1]
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
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'poppins', sans-serif;
}

body {
  background-color: black;
}
header {
  max-height: fit-content;
  position: relative;
  margin: 10px;
  border-radius: 15px;
  overflow: hidden;
}

header .headerBack {
  width: 100%;
  height: 400px;
  object-fit: cover;
  object-position: center;
}

.headerAnimeInfo {
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  display: flex;
  flex-direction: row;
  
}

.infoSide {
  width: 100%;
  min-width: 250px;
  max-width: 100vw;
  padding-right: 20px;
  padding-top: 10%;
}
.infoSide p {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4; /* number of lines to show */
          line-clamp: 4; 
  -webkit-box-orient: vertical;
}

.innerHeaderImage {
  margin: 40px;
  border-radius: 15px;
  width: 300px;
  height: auto;
}

.headTags {
  display: flex;
  
}
.headTags h3 {
  margin: 12px 7px;
  padding: 7px 12px;
  color: black;
  background-color: #fff;
  border-radius: 7px;
}

.headTags a {
  margin: 12px 7px;
  padding: 7px 12px;
  color: rgb(255, 255, 255);
  background-color: #000000;
  border-radius: 7px;
  text-decoration: none;
  border: 2px solid #fff;
}

</style>
