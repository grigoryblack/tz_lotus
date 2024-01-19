import{ Component } from 'react';
import data from '../../constants/db.json'
import './_search.scss'

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
            searchResults: [],
        };
    }

    handleSearch = () => {
        const { searchTerm } = this.state;
        const searchTerms = searchTerm.toLowerCase().split(' ');

        const results = data.people.filter(person =>
            searchTerms.every(term =>
                person.firstName.toLowerCase().includes(term) ||
                person.lastName.toLowerCase().includes(term)
            )
        );

        this.setState({ searchResults: results });
    };

    render() {
        const { searchTerm, searchResults } = this.state;

        return (
            <div className="search-wrapper">
                <div className="search-container">
                    <h1 className="search-container__title">Поиск людей</h1>
                    <input
                        className="search-container__input"
                        type="text"
                        placeholder="Поиск по имени или фамилии"
                        value={searchTerm}
                        onChange={e => this.setState({searchTerm: e.target.value})}
                    />
                    <button className="search-container__button" onClick={this.handleSearch}>Поиск</button>
                    <div className="search-container__card-container">
                        {searchResults.length > 0 ? (
                            <ul>
                                {searchResults.map(person => (
                                    <li className="search-container__card" key={person.id}>
                                        {person.firstName} {person.lastName}, Возраст: {person.age}, Высота: {person.height},
                                        Вес: {person.weight}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="search-container__no-result">Нет совпадений</p>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default Search;