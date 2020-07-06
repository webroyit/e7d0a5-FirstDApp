import React from 'react';
import Web3 from 'web3';
import './App.css';

class App extends React.Component{
  componentWillMount(){
    this.loadBlockchainData();
  }

  async loadBlockchainData(){
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const network = await web3.eth.net.getNetworkType();

    console.log(network);
  }

  render(){
    return (
      <div className="container">
        <h1>Hello World</h1>
      </div>
    );
  }
}

export default App;
