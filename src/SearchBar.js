import React, {Component} from 'react';

class SearchBar extends Component {

    handleSearch(event) {
        event.target.select();
    }

    render() {
        return (
                <div className="searchDiv">
                    <form className="searchBar">
                        <input onClick={this.handleSearch} className="typeahead form-control" type="text"
                               placeholder="Search for a movie title.."/>
                    </form>

                </div>

        )
    }
}

export default SearchBar;