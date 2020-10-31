import React from 'react';
import Web3 from 'web3';
import './App.css';
import { TODO_LIST_ABI, TODO_LIST_ADDRESS } from './config';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      account: '',
      taskCount: 0
    }
  }

  componentDidMount(){
    this.loadBlockchainData();
  }

  async loadBlockchainData(){
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const network = await web3.eth.net.getNetworkType();
    
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0]});

    const todoList = new web3.eth.Contract(TODO_LIST_ABI, TODO_LIST_ADDRESS);
    this.setState({ todoList });

    // Call taskCount() from the blockchain
    const taskCount = await todoList.methods.taskCount().call();
    this.setState({ taskCount });

    console.log(todoList);
  }

  render(){
    return (
      <div className="container">
        <h1>Hello World</h1>
        <p>Your account: {this.state.account}</p>
        <p>Task Count: {this.state.taskCount}</p>
      </div>
    );
  }
}

export default App;
