<template>
    <form class="d-flex align-content-center flex-wrap"
        @submit.prevent="store.search.query ? store.getMovie() : store.getPopular()">

        <div class=" col-auto">
            <Transition>
                <input @blur="show = !show" v-if="show" type="text" class="h-100" id="Search" placeholder="Search"
                    v-model.trim="store.search.query" ref="focusMe">
            </Transition>
        </div>

        <div class="col-auto">
            <button @click="show = !show" type="submit" class="btn"><i
                    class="fa-solid fa-magnifying-glass text-light"></i></button>
        </div>
    </form>
</template>

<script>
// import axios from 'axios';
import { store } from '../store';
export default {
    name: 'SearchComponent',
    data() {
        return {
            show: false,
            store,
            // search: {
            //     query: 'a',
            //     language: 'it-IT'
            // }
        }
    },
    watch: {
        'store.search.query'(newVal, OldVal) {
            // console.log(newVal, OldVal);
            if (newVal == '') {
                // store.series = true;
                store.ListMovie = [];
                store.ListSeries = [];
                store.getPopular();
            } else {
                // store.series = false;
                store.ListMovie = [];
                store.ListSeries = [];
                store.getMovie();
            }
        }
    },
    methods: {
        // focus() {
        //     if (this.$refs.focusMe) {
        //         return this.$nextTick(() => this.$refs.focusMe.focus())
        //     } else {
        //         return
        //     }


        // searchMovie() {
        //     // store.params = { ...this.search };
        //     //facciamo una copia di this.earch per non cancellarne le proprietà
        //     const search = { ...this.search }
        //     //cicliamo sull'array delle chiavi dell'oggetto e se il valore è vuoto cancelliamo la proprietà
        //     Object.keys(search).forEach((val) => {
        //         if (!search[val]) delete search[val]
        //     })
        //     //cloniamo in params l'oggetto con le proprietà valorizzate
        //     console.log(this.search)
        //     store.params = { ...this.search };

        //     // console.log(store.params)
        //     store.getMovie()
        //     //this.$emit('filterchar');
        // },

        // resetSearch() {
        //     this.search.status = '';
        //     this.search.name = '';
        //     store.params = {};
        //     store.getCharacters()
        //     // store.search.status = '';
        //     // store.search.name = '';
        //     //this.$emit('filterchar')
        // }
    },
    mounted() {
        // console.log(this.$refs.focusMe)
        // this.$nextTick(() => {
        //     if (!this.$refs.focusMe) {
        //         return this.$refs.focusMe.focus();
        //     }
        // }
        // )
        this.$nextTick(() => this.show ? console.log(this.$refs.focusMe) : console.log('ciao'))
    },
    updated() {
    },

}
</script>

<style lang="scss" scoped>
form {
    gap: 5px;
}

.myform-select {
    height: 100%;
    padding: 0 0.5rem;
}

.v-enter-active,
.v-leave-active {
    transition: width 0.3s ease;
    width: 200px;
}

.v-enter-from,
.v-leave-to {
    // opacity: 0;
    width: 0;
}
</style>