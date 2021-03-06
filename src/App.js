import React, {Component} from 'react';
import SearchBar from './SearchBar';
import Movie from './Movie';
import Bloodhound from '../node_modules/typeahead.js/dist/bloodhound.min';
import $ from 'jquery';
import 'typeahead.js'
import 'jquery'

/*
    A class that handles the logic from fetching the data from the api and initializing the Bloodhound effect.
 */
class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            movieID: 330459 //Intitial movieID
        }
    }
    /*
        This method is invoked if a update occur.
        It make a call to the fetchFromApi method with the url as parameter.
         It creates and initialize the Bloodhound effect.
     */
    componentDidMount() {
        let apiurl = 'https://api.themoviedb.org/3/movie/' + this.state.movieID + '';
        this.fetchFromApi(apiurl);

        let movies = new Bloodhound({
            datumTokenizer: function (datum) {
                return Bloodhound.tokenizers.whitespace(datum.value);
            },
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            remote: {
                url: 'https://api.themoviedb.org/3/search/movie?query=%QUERY&',
                wildcard: '%QUERY',
                filter: function (movies) {

                    return $.map(movies.results, function (movie) {
                        return {
                            value: movie.original_title,
                            id: movie.id
                        };
                    });
                }
            }
        });

        movies.initialize();

        /*
            JQuery starts here.
            Sets up the typeahead effect.
        */

        $('.typeahead').typeahead({
            hint: true,
            highlight: true,
            minLength: 2,
        }, {
            display: 'value',
            source: movies.ttAdapter()
        }).on('typeahead:selected', function (obj, datum) {
            this.fetchMovieID(datum.id)
        }.bind(this)).on('typeahead:close', function () {
            $(this).val("");
        });
    }

    //Fetches data from the themoviedb api.
    fetchFromApi(url) {
        fetch(url).then((res) => res.json()).then((data) => {

            this.setState({
                movieID: data.id,
                originalTitle: data.original_title,
                overview: data.overview,
                poster: data.poster_path,
                runtime: data.runtime,
                vote: data.vote_average,
                budget: data.budget,
                lang: data.original_language,
                release: data.release_date,
                bgimg: data.backdrop_path
            })
        })
    }

    //Fetches the movie.
    fetchMovieID(movieID) {
        let apiurl = 'https://api.themoviedb.org/3/movie/' + movieID + '?&';
        this.fetchFromApi(apiurl)
    }

    render() {
        return (
            <div>
                <SearchBar fetchMovieID={this.fetchMovieID.bind(this)}/>
                <Movie data={this.state}/>
            </div>
        )
    }

}

export default App;