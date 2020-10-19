import React from 'react';
import logo from '../svg/logo.svg';
// import search from '../svg/search.svg';
import './Searchbar.css';

type State = {
  query: string
}

type Props = {
  onSearch: (query: string) => void;
  onInput?: (value: string) => void;
  error: boolean;
}

class Searchbar extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    
    this.state = {
      query: ""
    };

    this.runSearch = this.runSearch.bind(this);
    this.textController = this.textController.bind(this);
  }
  

  runSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if(this.state.query.length > 0) {
      this.props.onSearch(this.state.query);
    }
  }

  textController(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    if (this.props.onInput) this.props.onInput(event.target.value);
    this.setState({query: event.target.value});
  }

  render() {
    const { query } = this.state;
    const { error } = this.props;

    return (
      <form onSubmit={this.runSearch}>
        <div className={error ? "loki-searchbar error" : "loki-searchbar"}>
            <img src={logo} className="small-loki-logo" alt="loki-logo" />
            <input 
              type="text" 
              placeholder="Enter a .loki Domain" 
              name="query"
              autoComplete="off"
              onChange={this.textController} 
              value={query} /> 
        </div>
      </form>
    );
  }
}

export default Searchbar;
