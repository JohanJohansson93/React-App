import React, {Component} from 'react';
import $ from 'jquery';

class Movie extends Component {

    componentDidUpdate() {
            let bgimg;
            bgimg = 'https://image.tmdb.org/t/p/w1000' + this.props.data.bgimg;
            $('.bgimg').css('background-image', 'url("' + bgimg + '")');
    }

    render() {

        let movieData = this.props.data;

        //Declares the data for every variable.


        let poster = 'https://image.tmdb.org/t/p/w500' + movieData.poster,
            title = movieData.originalTitle,
            overview = movieData.overview,
            runtime = movieData.runtime,
            vote = movieData.vote,
            language = movieData.lang,
            budget = movieData.budget,
            release = movieData.release,
            noVoteData = '-';

        if(movieData.vote === 'undefined' || movieData.vote === 0){
            movieData.vote = noVoteData;
        }else{
            vote = movieData.vote + ' / 10';
        }


        return (
            <div className="contentarea">
                <div className="rightMainDiv">
                    <h1>{title}</h1>
                    <span>
                    <p>{overview}</p>
                    <p className="lang">Original Language: {language}</p>
                    <p className="release">Release Date: {release}</p>
                    <p className="runtime">Runtime: {runtime} min</p>
                        <p className="budget">Budget: ${budget}</p>
                    <p className="votes">Votes: {vote}</p>
                </span>
                </div>
                <div className="leftMainDiv">
                    <div className="poster">
                        <img alt="" className="posterimg" src={poster}/>
                    </div>
                </div>
            </div>
        )

    }

}

export default Movie;