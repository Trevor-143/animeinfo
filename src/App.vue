<template>
  <div class="mainTop">
    <h3 class="logo">AnINfo</h3>
    <form class="searchForm" @submit.prevent="animeFinder">
      <input type="text" class="searchText" v-model="searchText" placeholder="find an anime"/>
      <input type="submit" value="search"/>
    </form>
  </div>
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
          <router-link class="headerT" @click="nowPlaying" >trailer</router-link>
        </div>
      </div>
    </div>
  </header>
  <main class="searcher">
    <h3><span class="foundHead">{{heading}}</span>
      <div class="scrollBtns">
        <fa class="fa" icon="circle-left" @click="scroll_left" />
        <fa class="fa" icon="circle-right" @click="scroll_right" />
      </div>
    </h3>
    <ul class="foundAnime">
      <li v-for="anime in searchedAnime" :key="anime.mal_id">
        <img :src="anime.images.webp.image_url" :alt="anime.title" />
        <div class="foundAnimeInfo">
          <h4>{{ anime.title }}</h4>
          <h4 class="inner">{{ anime.source }}</h4>
          <h4 class="inner">{{ anime.type }}</h4>
        </div>
      </li>
    </ul>
  </main>

  <router-view/>
</template>

<script>
import { ref, onBeforeMount } from "vue";
import YoutubeTrailer from '@/components/YoutubeTrailer'

export default {

  components: {
    YoutubeTrailer
  },
  data() {
    return {
      show: false
    }
  },
  methods: {
    nowPlaying() {
      this.show = true
    }
  },
  
  setup() {
    const headerAnime = ref([])
    const randomAnime = ref([])
    const searchText = ref('')
    const searchedAnime = ref([])
    const heading = ref('')

    const scroll_left = () => {
      let content = document.querySelector(".foundAnime");
      content.scrollLeft -= 500;
    }
    const scroll_right = () => {
      let content = document.querySelector(".foundAnime");
      content.scrollLeft += 400;
    }


    onBeforeMount(() => {
      fetch(`https://api.jikan.moe/v4/top/anime`)
      .then(resp => resp.json())
      .then(data => {
        randomAnime.value = Math.floor(Math.random() * data.data.length)
        headerAnime.value = data.data[randomAnime.value]
        // console.log(headerAnime.value)
      })
    })

    const animeFinder = () => {
      fetch(`https://api.jikan.moe/v4/anime?q=${searchText.value}`)
      .then(response => response.json())
      .then(data => {
        searchedAnime.value = data.data
        heading.value = searchText.value
        searchText.value = ''
      })
    }

    return {
      randomAnime,
      headerAnime,
      searchText,
      searchedAnime,
      animeFinder,
      scroll_left,
      scroll_right,
      heading,
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
.logo {
  padding: 7px 14px;
  border: 2px solid #fff;
  color: #fff;
  background-color: #000;
  border-top-left-radius: 20px;
  border-bottom-right-radius: 20px;
}
header {
  max-height: fit-content;
  position: relative;
  margin: 10px;
  border-radius: 25px;
  overflow: hidden;
}

header .headerBack {
  width: 100%;
  height: 400px;
  object-fit: cover;
  object-position: center;
  border-radius: 25px;

}

.headerAnimeInfo {
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  display: flex;
  flex-direction: row;
  background-position: inherit;
  background-size: cover;
  height: 100%;
  width: 100%;
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
  font-size: 15px;
  color: #cacaca;
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

/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0); 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #ffffff; 
  border-radius: 20px;
  margin: 10px;
  border: 1px solid rgba(255, 255, 255, 0);
  transition: 0.4s;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #000000; 
  border: 1px solid rgba(255, 255, 255, 1);
}

main {
  margin: 10px;
}
main h3 {
  margin-left: 10px;
  display: flex;
  flex-direction: row;
}
.searcher {
  margin: 10px;
}
.searcher h3 {
  margin-left: 10px;
  display: flex;
  flex-direction: row;
  color: #fff;
}
.foundAnime {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow-x: auto;
  scroll-behavior: smooth;
}
.foundAnime::-webkit-scrollbar {
  display: none;
}
.foundAnime li {
  margin: 5px;
  border-radius: 10px;
  list-style-type: none;
  position: relative;
}
.foundAnime li img {
  border-radius: 10px;
  object-fit: cover;
  max-height: 250px;
  max-width: 200px;
  height: auto;

}
.foundAnimeInfo {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px;
  display: none;
  background-image: linear-gradient(to top, #000000, rgba(0, 0, 0, 0.5));
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  transition: all 0.4s ease-in-out;
  transform: translateY(100px);
  color: #ffffff;
  font-size: 15px;
}
.inner {
  color: #d8d8d8;
  font-size: 12px;
}
.foundAnime li:hover .foundAnimeInfo {
  display: block;
  transform: translateY(0px);
}
.scrollBtns {
  margin-left: 10px;
}
.scrollBtns .fa {
  margin: 5px;
  cursor: pointer;
}
.mainTop {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 10px;
}
.mainTop form {
  display: flex;
  flex-direction: row;
}
.mainTop form input[type=text] {
  max-width:500px;
  width: 100%;
  border-radius: 15px;
  margin: 5px;
  border: none;
  padding-left: 20px;
}
.mainTop form input[type=text]:focus {
  outline: none;

}
.mainTop form input[type=submit] {
  cursor: pointer;
  color: #fff;
  background-color: #000000;
  padding: 10px;
  border: none;
  background-color: #fff;
  color: #000;
  border-radius: 15px;
  margin: 5px;
}

</style>
