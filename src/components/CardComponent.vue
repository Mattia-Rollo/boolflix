<template>

    <div class="mycard shadow-lg position-relative" @mouseover="show = true" @mouseleave="show = false"
        @mouseover.once="getCast(item.id)">

        <!-- <video v-if="show" muted autoplay loop id="myVideo" height="175" controls>
            <source src="/RickEMorty.mp4" type="video/mp4">
        </video> -->
        <iframe v-if="show" width="280" height="175" :src="video" title="YouTube video player" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; " allowfullscreen></iframe>
        <Transition>

            <img v-if="show" :src="`https://image.tmdb.org/t/p/w780${item.backdrop_path}`" alt="" class=""
                @error="loadImageFailed">

        </Transition>
        <img v-if="!show"
            :src="item.poster_path ? `https://image.tmdb.org/t/p/w342${item.poster_path}` : 'https://via.placeholder.com/400.png?text=Image+400x400'"
            alt="" class="" @error="loadImageFailed">
        <div class="card-body">


            <h5>{{ item.title ? item.title : item.name }}</h5>
            <div class="position-relative "
                v-if="(item.original_title !== item.title) || (item.original_name !== item.name)">{{ item.original_title
                        ?
                        item.original_title :
                        item.original_name
                }}</div>
            <img class="flag" :src="store.getCountryFlag(item.original_language)" alt="">
            <!-- <div class="text-center position-relative ">{{ item.original_language }}</div> -->
            <div v-if="item.release_date">Uscita: {{ item.release_date.split('-').reverse().join('-') }}</div>

            <div class=" position-relative ">voto: {{ item.vote_average }} / 10</div>
            <div class="">
                <span v-for="n in 5"><i class="fa-star" :key="n" :data="n"
                        :class="n <= vote(item.vote_average) ? 'fa-solid' : 'fa-regular'"></i></span>
            </div>
            <!-- <button @click="apri">dettagli</button> -->
            <!-- <div :class="{ 'd-none': !show }">sono dettagli</div> -->
            <div>{{ item.overview }}</div>
            <div>Cast: {{ listaNomi.join() }}</div>
            <div v-if="listaGeneri.join()">Generi: {{ listaGeneri.join() }}</div>

        </div>
    </div>

</template>

<script>
import axios from 'axios';
import { store } from '../store';
export default {
    name: 'CardComponent',
    props: ['item', 'classe'],
    data() {
        return {
            store,
            show: false,
            listaNomi: [],
            listaGeneri: [],
            video: '',

        }
    },
    methods: {
        apri() {
            this.show = !this.show
        },
        loadImageFailed(e) {
            e.target.src = "/6324728.jpg";
        },
        vote(vote) {


            return Math.ceil(vote) / 2;
        },
        // showVideo() {
        //     const time = setTimeout(() => { this.show = true }, 1000)
        //     if (!this.show) {
        //         this.clearTimeout(time);
        //     } else {
        //     }
        // },
        // clearTimeout() {

        // }

        getCast(movieId) {
            let attori = '';
            let video = ''
            let apiUrlCast = '';
            let apiUrlVideo = '';
            if (!this.item.title) {
                apiUrlCast = `https://api.themoviedb.org/3/tv/${movieId}/credits?api_key=8ace785dd1f96b68334521629f5dadaf`;
                apiUrlVideo = `https://api.themoviedb.org/3/tv/${movieId}/videos?api_key=8ace785dd1f96b68334521629f5dadaf`
            } else {
                apiUrlCast = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=8ace785dd1f96b68334521629f5dadaf`;
                apiUrlVideo = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=8ace785dd1f96b68334521629f5dadaf`;
            }
            axios.get(apiUrlCast).then((res) => {
                attori = res.data.cast.filter((item, idx) => idx < 5);
                for (let item of attori) {
                    this.listaNomi.push(' ' + item.name + ' ');
                }
            })
            axios.get(apiUrlVideo).then((res) => {
                video = res.data.results[0];
                this.video = 'https://www.youtube.com/embed/' + video.key;
                console.log(this.video);
                // console.log(this.listaNomi.join());
                // return this.listaNomi;
            })
        },
        getGenreIds(genre_ids) {
            // console.log(genre_ids)
            // console.log(store.genres);
            for (let it of genre_ids) {
                let x = store.genres.filter((item) => item.id == it)
                for (let item of x) {
                    this.listaGeneri.push(' ' + item.name + ' ');
                }
            }
            // console.log(compareIds)

        }

    },
    beforeMount() {
        // console.log(this.$refs.index)
        // this.getCast(this.item.id)
        this.getGenreIds(this.item.genre_ids)
    },
}
</script>

<style lang="scss" scoped>
.mycard {
    // padding: 1rem;
    background-color: #141414;
    color: whitesmoke;
    height: 350px;
    overflow: hidden;
    // border-radius: 10px;
    transition: all 0.5s;
    // transition-delay: 1s;
    cursor: pointer;

    h4 {
        // padding: 0.5rem 0;
    }

    h4~div {
        color: #ffffff;
    }

    &:hover {

        transform: scale(130%);
        width: 280px;
        // height: 350px;
        border: 1px solid gray;
        border-radius: 10px;
        // margin: 40px 0;
        box-shadow: 0px 0px 15px 5px black;

        // width: 300px;
        // height: 600px;
        z-index: 1000;
    }

    &:hover img:not(.flag) {
        height: 175px;
        object-fit: cover;
        position: absolute;
        bottom: 0; // object-position: center;
        // display: none;
        // width: 300px;
        z-index: 1000;

    }

    &:hover .card-body {
        height: 175px;
        // width: 300px;

        opacity: 1;
        z-index: 1000;
    }



    // background-clip: url('https://vlp.to/Aqa4V29o');
}

img {
    width: 100%;
    height: 350px;
    object-fit: cover;
    object-position: top;
    transition: all 0.5s;
    // transition-delay: 1s;
}

.card-body {
    position: absolute;
    // display: none;
    bottom: 0;
    font-size: 0.8rem;
    overflow-y: auto;
    padding: 0.8rem;
    // justify-content: center;
    // margin: 0 auto;
    height: 175px;
    width: 100%;
    // top: 0;
    // left: 50%;
    // transform: translate(-50%, -50%);
    background-color: rgba($color: #202020, $alpha: 0.8);
    // top: 175px;
    opacity: 0;
    transition: opacity 0.5s;
    // transition-delay: 1s;
    // transition-delay: 1s;

    &:hover {
        opacity: 1;
        display: block;
        height: 100px;
    }

    * {
        padding: 0.2rem 0;
    }

}

/* ===== Scrollbar CSS ===== */
/* Firefox */
* {
    scrollbar-width: auto;
    scrollbar-color: #a81010 #ffffff00;
}

/* Chrome, Edge, and Safari */
*::-webkit-scrollbar {
    width: 5px;
}

*::-webkit-scrollbar-track {
    background: rgba($color: #212121, $alpha: 0.3);
}

*::-webkit-scrollbar-thumb {
    background-color: #800101;
    border-radius: 10px;
    border: 3px solid #ffffff00;
}

.flag {
    // display: block;
    // margin: 0 auto;
    width: 40px;
    // object-fit: fill;
    height: 35px;
    margin: .6rem 0;
}

.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease-out;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

// .slide-fade-enter-active {
//     transition: all 0.2s ease-out;
// }

// .slide-fade-leave-active {
//     transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
// }

// .slide-fade-enter-from,
// .slide-fade-leave-to {
//     // transform: translateY(-100px);
//     opacity: 0;
// }
</style>