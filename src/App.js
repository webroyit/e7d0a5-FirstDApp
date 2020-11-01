import React from 'react';
import Web3 from 'web3';
import './App.css';
import { TODO_LIST_ABI, TODO_LIST_ADDRESS } from './config';
import TodoList from './TodoList';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      account: '',
      taskCount: 0,
      tasks: [],
      loading: true
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

    for (let i = 1; i <= taskCount; i++) {
      // Get the task from the blockchain
      const task = await todoList.methods.tasks(i).call();
      this.setState({
        tasks: [...this.state.tasks, task]
      });
    }

    this.setState({ loading: false });
    console.log(this.state.tasks);
  }

  render(){
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-warning flex-md-nowrap p-0 shadow">
          <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="/">Todo List</a>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
              <small><a className="nav-link" href="/"><span id="account"></span></a></small>
            </li>
          </ul>
        </nav>
        <div className="container-fluid">
          <div className="row">
            <main role="main">
              <div id="loader" className="text-center">
                <p className="text-center">Loading...</p>
              </div>
              <TodoList tasks={this.state.tasks}/>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
