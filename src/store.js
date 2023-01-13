import { reactive } from "vue";
import axios from "axios";
export const store = reactive({
  activeIndex: null,
  count: 0,
  loading: true,
  search: {
    query: "",
    language: "it-IT",
    include_adult: false,
    page: 10,
  },
  apiURL: "https://api.themoviedb.org/3/",
  searchEndPoint: "search/",
  endPointMovie: "movie",
  endPointTv: "tv",
  popular: "popular/",
  key_ath: "?api_key=8ace785dd1f96b68334521629f5dadaf",
  errormessage: "",
  ListMovie: [],
  ListSeries: [],
  params: {},
  getMovie() {
    // this.ListMovie = [];
    // this.ListSeries = [];

    this.popularTV = [];
    // this.loading = true;
    const params = { ...this.search };
    axios
      .get(
        this.apiURL + this.searchEndPoint + this.endPointMovie + this.key_ath,
        { params }
      )
      .then((res) => {
        this.ListMovie = res.data.results;
        setTimeout(() => {
          this.loading = false;
        }, 1500);
        // this.series = true;
        // console.log(this.params);
      })
      .catch((error) => {
        this.ListMovie.length = 0;
        this.errormessage = error.message;
      });

    axios
      .get(this.apiURL + this.searchEndPoint + this.endPointTv + this.key_ath, {
        params,
      })
      .then((res) => {
        this.ListSeries = res.data.results;
      })
      .catch((error) => {
        this.ListMovie.length = 0;
        this.loading = false;
        this.errormessage = error.message;
      });
  },
  flagApiUrl: "https://www.countryflagicons.com/FLAT/64/",
  getCountryFlag(country) {
    country == "uk" ? (country = "gb") : "";
    country == "en" ? (country = "us") : "";
    country == "ja" ? (country = "jp") : "";
    country == "cs" ? (country = "cz") : "";
    country == "ko" ? (country = "kr") : "";
    country == "hi" ? (country = "in") : "";
    country == "el" ? (country = "gr") : "";

    const flagApi = this.flagApiUrl + country.toUpperCase() + ".png";
    return flagApi;
  },
  paramsPopular: {},
  popularTV: [],
  getPopular() {
    this.loading = true;
    axios
      .get(this.apiURL + "/trending/movie/week" + this.key_ath, {
        params: {
          language: "it-IT",
        },
      })
      .then((res) => {
        this.popularTV = res.data.results;
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      });
  },

  categorySelected: "",
  genres: [],
  getGenres() {
    axios
      .get(this.apiURL + "genre/movie/list" + this.key_ath)
      .then((res) => {
        this.genres = res.data.genres;
        // console.log(this.genres);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  cast: [],
  series: true,
});
