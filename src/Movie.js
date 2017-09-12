import React, {Component} from 'react';
import $ from 'jquery';

class Movie extends Component {

    componentDidUpdate() {
        if(this.props.data.bgimg === null){
            let bgimg;
            bgimg = 'https://image.tmdb.org/t/p/w1000' + this.props.data.poster;
            $('.bgimg').css('background-image', 'url("' + bgimg + '")');
        }else{
            let bgimg;
            bgimg = 'https://image.tmdb.org/t/p/w1000' + this.props.data.bgimg;
            $('.bgimg').css('background-image', 'url("' + bgimg + '")');
        }
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
                        <span className="FactsTitles">
                            <h3>Original Language:</h3><p className="lang">{language}</p>
                            <h3>Release Date:</h3><p className="release">{release}</p>
                            <h3>Runtime:</h3><p className="runtime">{runtime} min</p>
                            <h3>Budget:</h3><p className="budget">${budget}</p>
                            <h3>Vote Average:</h3><p className="votes">{vote}</p>
                        </span>
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