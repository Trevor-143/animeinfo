<template>
    <div class="ytrailer">
        <LazyYoutube src="https://www.youtube.com/watch?v=TcMBFSGVi1c" />
    </div>
</template>

<script>
import LazyYoutube from 'vue-lazytube'

export default {
    name: 'YoutubeTrailer',
    components: {
        LazyYoutube,
    },
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    position: fixed;
    top: 20%;
    left: auto;
    right: auto;
    
}
</style>