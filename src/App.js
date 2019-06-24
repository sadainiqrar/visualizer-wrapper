import React from 'react';
import './App.css';


const LOCAL_HOST = "http://localhost:2999";

function getIframeSrc() {
  return `http://localhost:3000?dev=true&origin=${LOCAL_HOST}&id=1`;
}

function sendConfigToIframe(iframeEl, config) {
  const iframeWindow = iframeEl.contentWindow;
  iframeWindow.postMessage(config, "*");
}


class App extends React.Component {
  state = {
    height: window.innerHeight - 4,
    width: window.innerWidth,
  }

  iframeEl = null;
  
  componentDidMount() {
    window.addEventListener('resize', this.calculateSize, true)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.calculateSize)
  }

  calculateSize = () => {
    const height = window.innerHeight - 4
    const width = window.innerWidth
    this.setState(() => ({ height, width }))
  }

  onLoad = () => {
    sendConfigToIframe(this.iframeEl, {
      action: "init",
      data: { message: "Hey BRO" }
    });
  };

  render() {
    const {height, width} = this.state
    return (
      <div className="App">
        <div>
          <iframe
            id="dev-app"
            title="iframe"
            width={width}
            height={height}
            frameBorder="0"
            ref={ref => {
              this.iframeEl = ref;
            }}
            src={getIframeSrc()}
            onLoad={this.onLoad}
          />
        </div>
      </div>
    );
  }
}

export default App;
