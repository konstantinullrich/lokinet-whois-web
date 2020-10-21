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
import StatusSnackbar from './StatusSnackbar';
import UnvailableDialog from './dialogs/UnvailableDialog';
import AvailableDialog from './dialogs/AvailableDialog';
import InfoDialog from './dialogs/InfoDialog';
import './App.css';

type State = {
  darkTheme: boolean;
  error: boolean;
  isUnavailable: boolean;
  isAvailable: boolean;
  info: boolean;
  loading: boolean,
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
      info: false,
      loading: false
    }

    this.closeSnackbar = this.closeSnackbar.bind(this);
    this.isTyping = this.isTyping.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
    this.toggleTheme = this.toggleTheme.bind(this);
    this.toggleInfoDialog = this.toggleInfoDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
  }

  async submitSearch(query: string) {
    query = query.trim()
    this.setState({ query, loading: true });
    if (query.toLowerCase().endsWith(".loki")) {
      const requestResult = await fetch(`/api/whois?q=${query}`);
      if (requestResult.status === 200) {
        const resultData = await requestResult.json();
        this.setState( resultData);
        this.setState({ isUnavailable: true, loading: false });
      } else if (requestResult.status === 404) {
        this.setState({ isAvailable: true, loading: false });
      }
    } else {
      this.setState({ error: true });
    }
  }

  closeSnackbar() {
    this.setState({ loading: false });
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
    const {
      darkTheme, error,
      info, isAvailable,
      isUnavailable, query,
      loading, expirationHeight,
      nameHash, owner,
      txId, type,
      updateHeight, currentAddress } = this.state;

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
            Loki Whois
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
            open={info}
            onClose={this.toggleInfoDialog} />
          <AvailableDialog 
            query={query}
            open={isAvailable}
            onClose={this.closeDialog} />
          <UnvailableDialog
            query={query}
            expirationHeight={expirationHeight}
            nameHash={nameHash}
            owner={owner}
            txId={txId}
            type={type}
            updateHeight={updateHeight}
            currentAddress={currentAddress}
            open={isUnavailable}
            onClose={this.closeDialog}
            />
          <StatusSnackbar
            message='Loading...'
            onClose={this.closeSnackbar}
            variant='info'
            open={loading}
          />
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
