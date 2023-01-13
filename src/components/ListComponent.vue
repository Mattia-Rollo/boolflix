<template>

    <div class="bg-loading" v-if="store.loading">
        <div class="ring">Loading
            <span></span>
        </div>
    </div>
    <Transition name="slide-fade">
        <div class="container py-3" v-if="array.length">
            <!-- <div v-if="!store.ListMovie.length > 0">{{ store.errormessage }}</div> -->
            <h2 class="py-1" v-if="!store.loading">{{ titolo }}</h2>
            <div v-if="!store.loading" class="row row-cols-1 row-cols-md-4 row-cols-lg-5 g-3 py-1">
                <div v-for="(item, index) in array" class="col" :key="index">
                    <CardComponent :item="item" />
                </div>
            </div>
        </div>
    </Transition>
</template>

<script>
import axios from 'axios';
import { store } from '../store';
import CardComponent from './CardComponent.vue';

export default {
    name: "ListComponent",
    props: ["array", "titolo"],
    data() {
        return {
            store,
            apiUrlFlag: "https://countryflagsapi.com/png/br"
        };
    },

    methods: {


    },
    update() {

    },
    components: { CardComponent }
}
</script>

<style lang="scss" scoped>
@use '../assets/partials/variables' as *;

h2 {
    color: aliceblue;
}

// .container {
//     padding-top: 100px;
// }

// .bg-loading {
//     background: #262626;
//     height: 100vh;
//     width: 100%;
//     position: absolute;


// }




.ring {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 150px;
    height: 150px;
    background: transparent;
    border: 3px solid #3c3c3c;
    border-radius: 50%;
    text-align: center;
    line-height: 147px;
    font-family: sans-serif;
    font-size: 20px;
    color: #ff0000;
    letter-spacing: 4px;
    text-transform: uppercase;
    text-shadow: 0 0 10px #000000;
    box-shadow: 0 0 20px rgba(0, 0, 0, .5);
}

.ring:before {
    // content: '';
    position: absolute;
    top: -3px;
    left: -3px;
    width: 100%;
    height: 100%;
    border: 3px solid transparent;
    border-top: 3px solid #ff0000;
    border-right: 3px solid #ff0000;
    border-radius: 50%;
    animation: animateC 2s linear infinite;
}

span {

    display: block;
    position: absolute;
    top: calc(50% - 2px);
    left: 50%;
    width: 50%;
    height: 4px;
    background: transparent;
    transform-origin: left;
    animation: animate 2s linear infinite;
}

span:before {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #ff0000;
    top: -6px;
    right: -8px;
    box-shadow: 0 0 20px #ff0000;
}

@keyframes animateC {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

@keyframes animate {
    0% {
        transform: rotate(45deg);
    }

    100% {
        transform: rotate(405deg);
    }
}

.slide-fade-enter-active {
    transition: all 0.8s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateY(-100px);
    opacity: 0;
}
</style>