import React, { Component } from 'react'
import SimpleStorageContract from './contracts/SimpleStorage.json'
import getWeb3 from './getWeb3'
import { Buffer } from 'buffer';
//import ipfs from './ipfs'
import { create } from 'ipfs-hhtp-client'
const ipfsClient = require('ipfs-http-client');

const API_KEY = '13936b972004476b92d120f91781fc9d'
const API_SECRET_KEY = '3a3b0319bb5f4b139efcaaf1161b2266'
const auth = 'Basic' + Buffer.from(API_KEY + ":" + API_SECRET_KEY).toString('base64')

const client = ipfsClient.create({
  host:'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  apiPath: '/api/v0',  
  headers: {
    authorization: auth,
  },
})


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      ipfsHash: '',
      web3: null,
      buffer: null,
      account: null
    }
    this.captureFile = this.captureFile.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }



  // componentWillMount() {
  //   // Get network provider and web3 instance.
  //   // See utils/getWeb3 for more info.

  //   getWeb3
  //   .then(results => {
  //     this.setState({
  //       web3: results.web3
  //     })

  //     // Instantiate contract once web3 provided.
  //     //this.instantiateContract()
  //   })
  //   .catch(() => {
  //     console.log('Error finding web3.')
  //   })
  // }

  // instantiateContract() {
  //   /*
  //    * SMART CONTRACT EXAMPLE
  //    *
  //    * Normally these functions would be called in the context of a
  //    * state management library, but for convenience I've placed them here.
  //    */

  //   const contract = require('truffle-contract')
  //   const simpleStorage = contract(SimpleStorageContract)
  //   simpleStorage.setProvider(this.state.web3.currentProvider)

  //   // Get accounts.
  //   this.state.web3.eth.getAccounts((error, accounts) => {
  //     simpleStorage.deployed().then((instance) => {
  //       this.simpleStorageInstance = instance
  //       this.setState({ account: accounts[0] })
  //       // Get the value from the contract to prove it worked.
  //       return this.simpleStorageInstance.get.call(accounts[0])
  //     }).then((ipfsHash) => {
  //       // Update state with the result.
  //       return this.setState({ ipfsHash })
  //     })
  //   })
  // }

  captureFile = (event) => {
    event.preventDefault()
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) })
      console.log('buffer', this.state.buffer)
    }
  }

  onSubmit = (event) => {
    event.preventDefault()
    const res = client.add({content: this.state.buffer})
    console.log('IPFS: ', res)
    console.log('submitting the form')
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
          <a href="#" className="pure-menu-heading pure-menu-link">IPFS File Upload DApp</a>
        </nav>

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h1>Your Image</h1>
              <p>This image is stored on IPFS & The Ethereum Blockchain!</p>
              <img src={`https://infura-ipfs.io/ipfs/${this.state.ipfsHash}  `} alt=""/>
              <h2>Upload Image</h2>
              <form onSubmit={this.onSubmit} >
                <input type='file' onChange={this.captureFile} />
                <input type='submit' />
              </form>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App