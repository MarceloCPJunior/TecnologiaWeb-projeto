const API_KEY = "a81c3cb2e8b78a97806f76f4f60f684b";

export default {
    fetchTrending: {
        title: "Trending",
        url: `/trending/all/week?api_key=${API_KEY}&language=pt-BR`,
    },
    fetchTopRated: {
        title: "Rated",
        url: `/movie/top_rated?api_key=${API_KEY}&language=pt-BR`,
    },
    fetchActionMovies: {
        title: "Ação",
        url: `/discover/movie?api_key=${API_KEY}&with_genres=28&language=pt-BR`,
    },
    fetchComedyMovies: {
        title: "Comédia",
        url: `/discover/movie?api_key=${API_KEY}&with_genres=35&language=pt-BR`,
    },
    fetchHorrorMovies: {
        title: "Terror",
        url: `/discover/movie?api_key=${API_KEY}&with_genres=27&language=pt-BR`,
    },
    fetchRomanceMovies: {
        title: "Romance",
        url: `/discover/movie?api_key=${API_KEY}&with_genres=10749&language=pt-BR`,
    },
    fetchMystery: {
        title: "Mistério",
        url: `/discover/movie?api_key=${API_KEY}&with_genres=9648&language=pt-BR`,
    },
    fetchSciFi: {
        title: "Sci-Fi",
        url: `/discover/movie?api_key=${API_KEY}&with_genres=878&language=pt-BR`,
    },
    fetchWestern: {
        title: "Velho Oeste",
        url: `/discover/movie?api_key=${API_KEY}&with_genres=37&language=pt-BR`,
    },
    fetchAnimation: {
        title: "Animação",
        url: `/discover/movie?api_key=${API_KEY}&with_genres=16&language=pt-BR`,
    },
    fetchTV: {
        title: "Filmes TV",
        url: `/discover/movie?api_key=${API_KEY}&with_genres=10770&language=pt-BR`,
    }
}