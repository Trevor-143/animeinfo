<template>
  <div class="home">
    <div class="topAnime">
      <h3>top Anime 
        <div class="scrollBtns">
          <fa class="fa" icon="circle-left" @click="scroll_back"/>
          <fa class="fa" icon="circle-right" @click="scroll_forward"/>
        </div> 
      </h3>
      <ul class="topAnimeList animeList">
        <li v-for="anime in topAnime" :key="anime.mal_id">
          <img :src="anime.images.webp.image_url" :alt="anime.title" />
          <div class="topAnimeListInfo">
            <h4>{{ anime.title }}</h4>
            <h4 class="inner">{{ anime.source }}</h4>
            <h4 class="inner">{{ anime.type }}</h4>
          </div>
        </li>
      </ul>
    </div>
  </div>
  
</template>


<script>
import { ref, onBeforeMount} from "vue";


export default {
  name: 'HomeView',
  
  setup() {
    const topAnime = ref([])


    const scroll_back = () => {
      let content = document.querySelector(".animeList");
      content.scrollLeft -= 500;
    }
    const scroll_forward = () => {
      let content = document.querySelector(".animeList");
      content.scrollLeft += 400;
    }

    onBeforeMount(() => {
      fetch(`https://api.jikan.moe/v4/top/anime`)
      .then(resp => resp.json())
      .then(data => {
        topAnime.value = data.data
        // console.log(topAnime.value)
      })
    })
    return {
      topAnime,
      scroll_back,
      scroll_forward
    }
  }
}
</script>

<style scoped>


.topAnime {
  margin: 10px;
}
.topAnime h3 {
  margin-left: 10px;
  display: flex;
  flex-direction: row;
  color: #fff;
}
.topAnimeList {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow-x: auto;
  scroll-behavior: smooth;
}
.topAnimeList::-webkit-scrollbar {
  display: none;
}
.topAnimeList li {
  margin: 5px;
  border-radius: 10px;
  list-style-type: none;
  position: relative;
}
.topAnimeList li img {
  border-radius: 10px;
  object-fit: cover;
  max-height: 250px;
  max-width: 200px;
  height: auto;

}
.topAnimeListInfo {
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
  color: #fff;
  font-size: 15px;
}
.topAnimeList li:hover .topAnimeListInfo {
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
.inner {
  color: #d8d8d8;
  font-size: 12px;
}
</style>
