import React from 'react';
import { 
  createMuiTheme,
  Fab,
  ThemeProvider,
  Typography
} from '@material-ui/core';
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh'
import BrightnessLowIcon from '@material-ui/icons/BrightnessLow'
import InfoIcon from '@material-ui/icons/Info'
import Searchbar from './Searchbar';
import './App.css';
import UnvailableDialog from './dialogs/UnvailableDialog';
import AvailableDialog from './dialogs/AvailableDialog';
import InfoDialog from './dialogs/InfoDialog';

type State = { 
  darkTheme: boolean;
  error: boolean;
  isUnavailable: boolean;
  isAvailable: boolean;
  info: boolean;
  query?: string,
  expirationHeight?: number;
  nameHash?: string;
  owner?: string;
  txId?: string;
  type?: number;
  updateHeight?: number;
  currentAddress?: string;
}
type Props = {}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      error: false,
      darkTheme: true,
      isUnavailable: false,
      isAvailable: false,
      info: false
    }

    this.isTyping = this.isTyping.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
    this.toggleTheme = this.toggleTheme.bind(this);
    this.toggleInfoDialog = this.toggleInfoDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
  }

  async submitSearch(query: string) {
    query = query.trim()
    this.setState({ query });
    if (query.toLowerCase().endsWith(".loki")) {
      const requestResult = await fetch(`http://localhost:8080/api/whois?q=${query}`);
      if (requestResult.status === 200) {
        const resultData = await requestResult.json();
        this.setState( resultData);
        this.setState({ isUnavailable: true });
      } else if (requestResult.status === 404) {
        this.setState({ isAvailable: true });
      }
      
    } else {
      this.setState({ error: true });
    }
  }

  isTyping(value: string) {
    this.setState({ error: false })
  }

  toggleTheme() {
    this.setState({ darkTheme: !this.state.darkTheme });
  }

  toggleInfoDialog() {
    this.setState({ info: !this.state.info });
  }

  closeDialog() {
    this.setState({
      query: undefined,
      expirationHeight: undefined,
      nameHash: undefined,
      owner: undefined,
      txId: undefined,
      type: undefined,
      updateHeight: undefined,
      currentAddress: undefined,
      isUnavailable: false,
      isAvailable: false
    });
  }

  render() {
    const { darkTheme, error } = this.state;

    const theme = createMuiTheme({
      palette: {
        primary: { main: '#dfe1e5' },
        type: darkTheme ? 'dark' : 'light'
      }
    })

    return (
      <ThemeProvider theme={theme}>
        <div className={darkTheme ? "App dark-theme" : "App"}>
          <Typography variant="h1" align="center" gutterBottom>
            Loki WhoIs
          </Typography>
          <Searchbar onInput={this.isTyping} onSearch={this.submitSearch} error={error} />
          <div className="spacer" />
          <Fab 
            className="left-fab" 
            color="primary" 
            size="small" 
            aria-label="change-theme" 
            onClick={this.toggleTheme}>
            { darkTheme ? <BrightnessHighIcon /> : <BrightnessLowIcon /> }
          </Fab>
          <Fab 
            className="right-fab" 
            color="primary" 
            size="small" 
            aria-label="info" 
            onClick={this.toggleInfoDialog}>
            <InfoIcon />
          </Fab>
          <InfoDialog
            open={this.state.info} 
            onClose={this.toggleInfoDialog} />
          <AvailableDialog 
            query={this.state.query}
            open={this.state.isAvailable} 
            onClose={this.closeDialog} />
          <UnvailableDialog
            query={this.state.query}
            expirationHeight={this.state.expirationHeight}
            nameHash={this.state.nameHash}
            owner={this.state.owner}
            txId={this.state.txId}
            type={this.state.type}
            updateHeight={this.state.updateHeight}
            currentAddress={this.state.currentAddress}
            open={this.state.isUnavailable}
            onClose={this.closeDialog}
            />
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
