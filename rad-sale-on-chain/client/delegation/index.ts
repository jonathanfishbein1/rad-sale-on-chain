import * as Lucid from 'lucid-cardano'
import * as Wallet from '../wallet'
var { Elm } = require('./Delegation.elm')

const
    sumnPoolId = "pool13dgxp4ph2ut5datuh5na4wy7hrnqgkj4fyvac3e8fzfqcc7qh0h",
    bk = "testnetwIyK8IphOti170JCngH0NedP0yK8wBZs"
    , blockfrostApi = 'https://cardano-testnet.blockfrost.io/api/v0'
    , blockfrostClient = new Lucid.Blockfrost(blockfrostApi, bk)
    , lucid = await Lucid.Lucid.new(blockfrostClient,
        'Testnet'),
    register = async rewardAddress => {
        const transaction =
            await lucid
                .newTx()
                .registerStake(rewardAddress)
                .complete()
            , signedTx = await transaction
                .sign()
                .complete()
            , transactionHash = await signedTx
                .submit()
    },
    delegate = async rewardAddress => {
        const transaction =
            await lucid
                .newTx()
                .delegateTo(rewardAddress, sumnPoolId)
                .complete()
            , signedTx = await transaction
                .sign()
                .complete()
            , transactionHash = await signedTx
                .submit()
    },
    deregister = async rewardAddress => {
        const transaction =
            await lucid
                .newTx()
                .deregisterStake(rewardAddress)
                .complete()
            , signedTx = await transaction
                .sign()
                .complete()
            , transactionHash = await signedTx
                .submit()
    }
    , registerAndDelegate = async rewardAddress => {
        const transaction =
            await lucid
                .newTx()
                .registerStake(rewardAddress)
                .delegateTo(rewardAddress, sumnPoolId)
                .complete()
            , signedTx = await transaction
                .sign()
                .complete()
            , transactionHash = await signedTx
                .submit()
        return transactionHash
    }

var app = Elm.Delegation.init({
    flags: [Wallet.hasWallet(), sumnPoolId],
    node: document.getElementById("elm-app-is-loaded-here")
})

app.ports.connectWalletDelegation.subscribe(async supportedWallet => {
    const wallet = await Wallet.getWalletApi(supportedWallet!) as any
    lucid.selectWallet(wallet)
    console.log(wallet)
    app.ports.receiveWalletConnectionDelegation.send(supportedWallet)
})

app.ports.getAccountStatus.subscribe(async () => {
    const rewardAddress = await lucid.wallet.rewardAddress()
        , utils = new Lucid.Utils(lucid)
        , { address: { address } } = utils.getAddressDetails(rewardAddress!)
        , account = await fetch(`${blockfrostApi}/accounts/${(address)}/`
            , { headers: { project_id: bk } })
            .then(res => res.json())
    console.log(account)
    app.ports.receiveAccountStatus.send(JSON.stringify(account))
})


app.ports.registerAndDelegateToSumn.subscribe(async rewardAddress => {
    try {
        const txHash = await registerAndDelegate(rewardAddress)
        app.ports.receiveRegisterAndDelegateStatus.send(true)
    }
    catch (e) {
        app.ports.receiveRegisterAndDelegateStatus.send(false)
    }
})

app.ports.delegateToSumn.subscribe(async rewardAddress => {
    try {
        const txHash = await delegate(rewardAddress)
        app.ports.receiveDelegateToSumnStatus.send(true)
    }
    catch (e) {
        app.ports.receiveDelegateToSumnStatus.send(false)
    }
})

app.ports.undelegate.subscribe(async rewardAddress => {
    try {
        const txHash = await deregister(rewardAddress)
        app.ports.receiveUndelegateStatus.send(true)
    }
    catch (e) {
        app.ports.receiveUndelegateStatus.send(false)
    }
})