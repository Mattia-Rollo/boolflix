<template>
  <HeaderComponent />
  <ListComponent :array="filteredMovie" :titolo="titoloMovie" />
  <ListComponent :array="filteredSeries" :titolo="titoloSeries" />
  <ListComponent :array="store.popularTV" :titolo="populartv" />

</template>

<script>
import { store } from './store';
import HeaderComponent from './components/HeaderComponent.vue';
import ListComponent from './components/ListComponent.vue';

export default {
  components: { HeaderComponent, ListComponent },
  data() {
    return {
      store,
      titoloSeries: 'SeriesTV',
      titoloMovie: 'Movie',
      populartv: 'Trend Movies',


    }
  },
  computed: {
    filteredMovie() {
      store.series = false;
      // console.log(store.categorySelected)
      // console.log(store.ListMovie[0].genre_ids)
      // console.log(store.ListMovie[0])


      return store.categorySelected
        ? store.ListMovie.filter((item) => {
          return item.genre_ids.includes(store.categorySelected);
        })
        : store.ListMovie;

    },
    filteredSeries() {

      // console.log(store.categorySelected)
      // console.log(store.ListMovie[0].genre_ids)
      // console.log(store.ListMovie[0])
      store.series = true;
      return store.categorySelected
        ? store.ListSeries.filter((item) => {
          return item.genre_ids.includes(store.categorySelected);
        })
        : store.ListSeries;

    }
  },
  created() {
    store.getPopular();
    store.getGenres();

    // store.getCharacters();
    //this.getCharacters()
  },
  mounted() {
    // const a = store.ListMovie.filter((item) => {
    //   item.genre_ids.includes(store.categorySelected);
    // })
    // console.log(store.ListMovie);
  },
  updated() {

    // console.log(store.genres);
    // console.log(this.genresApp);
    // console.log(this.movieApp);
  }
}
</script>

<style lang="scss" scoped>

</style>