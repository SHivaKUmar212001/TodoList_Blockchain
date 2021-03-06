import {Web3} from "web3";
App = {
  loading: false,
  contracts: {},
  load: async () => {
    console.log("app loading..")
    await App.loadWeb3()
    await App.loadAccount()
    await App.loadContract()
    await App.render()
  },

  //

  // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
   loadWeb3: async () => {
     if (typeof web3 !== 'undefined') {
       App.web3Provider = web3.currentProvider
       console.log("###########")
       web3 = new Web3(web3.currentProvider)
     } else {
       window.alert("Please connect to Metamask.")
     }
     // Modern dapp browsers...
     if (window.ethereum) {
       window.web3 = new Web3(ethereum)
       try {
         // Request account access if needed
         await ethereum.enable()
         // Acccounts now exposed
         web3.eth.sendTransaction({/* ... */})
       } catch (error) {
         // User denied account access...
       }
     }
     // Legacy dapp browsers...
     else if (window.web3) {
       App.web3Provider = web3.currentProvider
       window.web3 = new Web3(web3.currentProvider)
       // Acccounts always exposed
       web3.eth.sendTransaction({/* ... */})
     }
     // Non-dapp browsers...
     else {
       console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
     }
   },

   loadAccount: async () => {
     App.account = web3.eth.accounts[0]
     console.log(App.account)
   },

   loadContract: async () => {
     const todoList = await $.getJSON('Todolist.json')

     App.contracts.Todolist = TruffleContract(todoList)
     App.contracts.Todolist.setProvider(App.web3Provider)
     console.log(todoList)
     App.todoList = await App.contracts.Todolist.deployed()

   },

   render: async () => {
     console.log("######")
     $('#account').html(App.account)
     console.log("######")
   }


}
$(() => {
  $(window).load(()=>{
    App.load()
  })
})
