<template>
    <div v-if="store.loading" class="container py-3">
        <div class="row row-cols-1 row-cols-md-4 row-cols-lg-5 g-3 py-1">
            <div v-for="n in 10" :key="n" class="col">
                <div class="skeleton-card"></div>
            </div>
        </div>
    </div>
    <Transition name="slide-fade">
        <div class="container py-3" v-if="array.length">
            <!-- <div v-if="!store.ListMovie.length > 0">{{ store.errormessage }}</div> -->
            <h2 class="py-1" v-if="!store.loading">{{ titolo }}</h2>
            <div class="card-row" v-if="!store.loading">
                <CardComponent v-for="item in array" :key="item.id" :item="item" />
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
    updated() {

    },
    components: { CardComponent }
}
</script>

<style lang="scss" scoped>
@use '../assets/partials/mixins' as *;
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





.skeleton-card {
    height: 350px;
    border-radius: 10px;
    @include skeleton;
}

.card-row {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    gap: 1rem;
    padding-bottom: 0.5rem;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE 10+ */
}

.card-row::-webkit-scrollbar {
    display: none;
}

.card-row > * {
    flex: 0 0 auto;
}

.slide-fade-enter-active {
    @include transition(all, $transition-slow, ease-out);
}

.slide-fade-leave-active {
    @include transition(all, $transition-slow, cubic-bezier(1, 0.5, 0.8, 1));
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateY(-100px);
    opacity: 0;
}
</style>
