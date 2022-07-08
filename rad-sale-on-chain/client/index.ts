declare var window: any
import './style.css'
import * as Lucid from 'lucid-cardano'

const supportedWallets = [
    'nami',
    'flint',
    'eternl'
]
    , getWalletApi = async namespace => {
        return await ('typhon' === namespace) ?
            window.cardano[namespace]
            :
            window.cardano[namespace].enable()
    }
    , isSupported = type => supportedWallets.includes(type)
    , hasWallet = type => isSupported(type) && window.cardano[type.toLowerCase()] !== undefined
const
    connectButton = document.getElementById('connect'),
    poolId = "pool1m3gg43uhtetn4hmw79u8836dyq8qe4cex8qnn6mks5egza7n6tp",
    bk = "testnetwIyK8IphOti170JCngH0NedP0yK8wBZs",
    connectMessage = "connect wallet",
    buyMessage = "Buy",
    buyingMessage = "Buying...",
    unbuyingMessage = "Unbuying..."
    , successMessage = "Successfully buyd to SUMN!"
    , lucid = await Lucid.Lucid.new(
        new Lucid.Blockfrost('https://cardano-testnet.blockfrost.io/api/v0', bk), 'Testnet')
if (hasWallet('nami') == true) {
    const wallet = await getWalletApi('nami') as any
    lucid.selectWallet(wallet)
    connectButton!.innerText = connectMessage
    const utils = new Lucid.Utils(lucid)
    const paymentAddressDetails = utils.getAddressDetails(await lucid.wallet.address())
    connectButton?.addEventListener('click', async () => {
        connectButton!.innerText = buyMessage
        connectButton?.addEventListener('click', async () => {
            connectButton!.innerText = buyingMessage
            const lovelaceAmount = BigInt(Number(10000000))
            const minLovelaceAmount = BigInt(Number(2000000))
            const redeemer = new Lucid.Construct(0, [])
            const serializedRedeemer = Lucid.Data.to(redeemer)
            console.log(await lucid.wallet.address())
            console.log(paymentAddressDetails)
            const transaction =
                await lucid
                    .newTx()
                    .payToAddress('addr_test1vrh0kkuahtz28qpfdhsx2hm2eekf06des8h03xnm757u65sd6egwy'
                        , { lovelace: lovelaceAmount })
                    .payToContract('addr_test1wzrx2p5pz3489fsyce88kedgr93v3uzxfkqq3uhuz2qetkq29hr49'
                        , Lucid.Data.empty()
                        , { lovelace: minLovelaceAmount })
                    .attachSpendingValidator({
                        type: 'PlutusV1'
                        , script: '5911a95911a601000033232323232323232323232323232332232323232222322323253353330073333573466e1cd55ce9baa0064800080648c98d4cd5ce00d80c80c00b9999ab9a3370ea0089001109100091999ab9a3370ea00a9000109100111931a99ab9c01c01a0190180173333573466e1cd55cea8012400046644246600200600464646464646464646464646666ae68cdc39aab9d500a480008cccccccccc888888888848cccccccccc00402c02802402001c01801401000c008cd40548c8c8cccd5cd19b8735573aa004900011991091980080180118101aba15002301a357426ae8940088c98d4cd5ce01581481401389aab9e5001137540026ae854028cd4054058d5d0a804999aa80c3ae501735742a010666aa030eb9405cd5d0a80399a80a8101aba15006335015335502302175a6ae854014c8c8c8cccd5cd19b8735573aa00490001199109198008018011919191999ab9a3370e6aae754009200023322123300100300233502675a6ae854008c09cd5d09aba2500223263533573805e05a05805626aae7940044dd50009aba150023232323333573466e1cd55cea8012400046644246600200600466a04ceb4d5d0a80118139aba135744a004464c6a66ae700bc0b40b00ac4d55cf280089baa001357426ae8940088c98d4cd5ce01581481401389aab9e5001137540026ae854010cd4055d71aba15003335015335502375c40026ae854008c074d5d09aba2500223263533573804e04a04804626ae8940044d5d1280089aba25001135744a00226ae8940044d5d1280089aba25001135744a00226aae7940044dd50009aba150023232323333573466e1d400520062321222230040053018357426aae79400c8cccd5cd19b875002480108c848888c008014c068d5d09aab9e500423333573466e1d400d20022321222230010053016357426aae7940148cccd5cd19b875004480008c848888c00c014dd71aba135573ca00c464c6a66ae7008808007c07807407006c4d55cea80089baa001357426ae8940088c98d4cd5ce00d80c80c00b880c09931a99ab9c49010350543500018017135573ca00226ea80044d55ce9baa0011232230023758002640026aa028446666aae7c004940248cd4020c010d5d080118019aba200201323232323333573466e1cd55cea801a40004666444246660020080060046464646666ae68cdc39aab9d5002480008cc8848cc00400c008c054d5d0a80119a80700a1aba135744a004464c6a66ae7006806005c0584d55cf280089baa00135742a006666aa00eeb94018d5d0a80119a8053ae357426ae8940088c98d4cd5ce00b00a00980909aba25001135573ca00226ea80044cd54005d73ad112232230023756002640026aa02444646666aae7c008940208cd401ccd54050c018d55cea80118029aab9e500230043574400602426ae840044488008488488cc00401000c488c8c8cccd5cd19b875001480008c8488c00800cc014d5d09aab9e500323333573466e1d40092002212200123263533573802402001e01c01a26aae7540044dd5000919191999ab9a3370e6aae7540092000233221233001003002300535742a0046eb4d5d09aba2500223263533573801e01a01801626aae7940044dd50009191999ab9a3370e6aae75400520002375c6ae84d55cf280111931a99ab9c00d00b00a0091375400224464646666ae68cdc3a800a40084244400246666ae68cdc3a8012400446424446006008600c6ae84d55cf280211999ab9a3370ea00690001091100111931a99ab9c01000e00d00c00b00a135573aa00226ea80048c8cccd5cd19b8750014800884880088cccd5cd19b8750024800084880048c98d4cd5ce00600500480400389aab9d3754002464646464646666ae68cdc3a800a401842444444400646666ae68cdc3a8012401442444444400846666ae68cdc3a801a40104664424444444660020120106eb8d5d0a8029bad357426ae8940148cccd5cd19b875004480188cc8848888888cc008024020dd71aba15007375c6ae84d5d1280391999ab9a3370ea00a900211991091111111980300480418061aba15009375c6ae84d5d1280491999ab9a3370ea00c900111909111111180380418069aba135573ca01646666ae68cdc3a803a400046424444444600a010601c6ae84d55cf280611931a99ab9c01401201101000f00e00d00c00b00a135573aa00826aae79400c4d55cf280109aab9e5001137540024646464646666ae68cdc3a800a4004466644424466600200a0080066eb4d5d0a8021bad35742a0066eb4d5d09aba2500323333573466e1d4009200023212230020033008357426aae7940188c98d4cd5ce00680580500480409aab9d5003135744a00226aae7940044dd5000919191999ab9a3370ea002900111909118008019bae357426aae79400c8cccd5cd19b875002480008c8488c00800cdd71aba135573ca008464c6a66ae7002802001c0180144d55cea80089baa0011122232323333573466e1cd55cea80124000466aa012600c6ae854008c014d5d09aba2500223263533573801401000e00c26aae7940044dd5000a4c240022244246600200600492103505431001123230010012233003300200200133232323232332233223232332232323232323232332232323232323232323232323232323232323322323232323232323232323232322222323235005533500413353353353353353253353332001501a3332001501232333553026120015009502a350022222222222333553030120012235002222350032233500225335333573466e3c04c0041241204cd40ec01401c401c801d40d0024d401c8888004c8cd40a4cd540ec040cd40a4cd540ec04000540a940a8d401c88880100d84d540dc0d84d540e1240116496e636f727265637420547820746f2073656c6c6572005001235503800123550372225335004153350031533500210011038103810382355038001233532335550235335300d0011355039491094e6f207369676e65720022135503a300f003233555024533533501d233355022302a12001233320015027300f002330150015035002300f002135503a4911f4e6f206f757470757420746f207468652062757965727320616464726573730022135503b33501f233355024302c12001233320015029301100233017001503700430110042533533501e23303333021300e001335503e302000b301200b480080044d540ed241284e6f2063757272656e63792073796d626f6c20616e6420746f6b656e206e616d65206f7574707574002215335001135503c03b22135503f4912f546f6f206d616e792063757272656e63792073796d626f6c20616e6420746f6b656e206e616d65206f7574707574730050022355039001235503830020012355038001233553353024004130344988854cd400454cd4cd540c8d40088880048cd540ccc8d400488888888894cd4ccd54c0d44800540e08d4004894cd4ccd5cd19b8f00200f04704613504300315042002213504135001220011503f301300723233550353333333574800446666ae68cdc39aab9d5002480008cccd55cf9aab9e500323503a04425039043250380412503725037250372503704123503803c13754002426aa07400226aa0749201234572726f7220636f6e76657274696e672074784f7574446174756d20746f20756e69740022130384988d540e40048d540e0c0080048d540e00048cd54cd4ccc80054068ccd5407cc09c480048ccc8005404cc02c004ccc80054024c8c8cd40accd540f4048cd40accd540f404800540b140b0ccc0800040440454010c8c8c8cd40b0cd540f800ccd40b0cd540f800800540b540b4cc0814018cd540f4c07c028c044028c040024c074020c0900100d84d540dc0d84d540e12401134e6f206f757470757420746f2073637269707400235503900123550383002001233573800206a4a66a002206c2c264646a0044444444444a66a666aa606424002a06a4a66a666ae68cdc780600082102089a81f0008a81e8019082108201a8039111000a80089a80111001099191a8011111111111199aa981709000a808a81919aa98090900091a80091000999aa981709000911a801111299a800909a8021119a80110041299a999ab9a3371e00202809008e266a07466aa09800800c01020102008a0640126a6a004446a0044444444444a66a66060014016426a002446a0024446a0064466a00446098931299a8021099aa8270010008982624c260869311001180680089119aa98088900091a8009119aa81b80119aa980a0900091a8009119aa81d001199a80091981a24000002446606a004002466068002900000099806801000990009aa81a110891299a8008a81211099a812980200119aa98030900080200091a80091100111a80091100191a800911111111100191a800911111111100491a8009111001244100235001220022233221233001003002301e00253350012135024321223002003301f00115022122333553017120013500950082350012233355301a120013500c500b2350012233350012330264800000488cc09c0080048cc09800520000013300300200122335530061200123500122335502c002333500123355300a1200123500122335503000235500c0010012233355500802200200123355300a1200123500122335503000235500b00100133355500301d002001111222333553014120015017335530061200123500122335502c00235500800133355301412001223500222533533355301a12001350135014235001223300a0020050061003133501b004003501800133553006120012350012232335502d00330010053200135502f2253350011355009003221350022253353300c002008112223300200a0041300600300211212223003004112122230010043200135502622112253350011501622133501730040023355300612001004001112330012253350021001102001f123350132233350032200200200135001220011225335002100115335001101d101e123355300b12001225335300300213350100020011001500f23500122220032235001223330050040020012223232300100532001355023223350014800088d4008894cd4ccd5cd19b8f002009022021130070011300600332001355022223350014800088d4008894cd4ccd5cd19b8f002007021020100113006003112233550023500350040011233500c22333500322002002001350012200111233001225335002101810010151112233500223550190012300200112235002223500322333300f0040030020012350012235002222222222253353300f00a00b21350012235001222333553014120012235002222350082235005225335333302400400300200113350200090081008501800f132635335738921024c660002502432001355018221122253350011002221330050023335530071200100500400122333350012500e2500e2500e23335530041200150072350012253355335333573466e3cd400888008d4010880080580544ccd5cd19b8735002220013500422001016015101513501200315011003320013550162211222533500113500322001221333500522002300400233355300712001005004001112200212212233001004003133500122533500221003100150071221233001003002222232335005233500425335333573466e3c0080040440405400c404080408cd4010804094cd4ccd5cd19b8f002001011010150031010153350032153350022133500223350022335002233500223300c00200120132335002201323300c00200122201322233500420132225335333573466e1c01800c05805454cd4ccd5cd19b8700500201601513300f00400110151015100e153350012100e100e2122300200322333573466e3c00800402802488ccd5cd19b8700200100900811225335002213002001150031212230020031122001223370000400246aa00a921144e6f20636f6e74696e75696e67206f757470757400122002122001112122300200311212230010032326353357389201024c67000040031122123300100300249848004448c8c00400488cc00cc008008004cd4488cccc0092080dac4094891c641593ca39c5cbd3eb314533841d53e61ebf6ee7a0ec7c391652f31e0048811443617264616e6961466f756e64657257686974650048811ceefb5b9dbac4a380296de0655f6ace6c97e9b981eef89a7bf53dcd5200222212333300100500400300220011'
                    })
                    .payToAddress(await lucid.wallet.address(), {
                        lovelace: minLovelaceAmount
                        , '641593ca39c5cbd3eb314533841d53e61ebf6ee7a0ec7c391652f31e43617264616e6961466f756e6465725768697465': BigInt(Number(1))
                    })
                    .collectFrom([{
                        txHash: 'f1256d480a8f069d0f6ff3d9c2de88ba0bbc1de241099c0f09e4cdef4319cf22',
                        outputIndex: 1,
                        assets: {
                            lovelace: BigInt(Number(3000000)),
                            '641593ca39c5cbd3eb314533841d53e61ebf6ee7a0ec7c391652f31e43617264616e6961466f756e6465725768697465': BigInt(Number(1))
                        },
                        address: 'addr_test1wq0vuyskzm0yl8ef0kvysxk6rgcj8ahp5e9njpm3sh2zv9sy32085',
                        datumHash: '923918e403bf43c34b4ef6b48eb2ee04babed17320d8d1b9ff9ad086e86f44ec'
                    },], serializedRedeemer)
                    .addSigner(await lucid.wallet.address())
                    .complete()
            transaction.txComplete
            console.log(transaction)
            console.log(transaction.txComplete)
            const signedTx = await transaction
                .sign()
                .complete()
            console.log(signedTx)
            const transactionHash = await signedTx
                .submit()
            console.log(transactionHash)
            transactionHash ?
                connectButton!.innerText = successMessage
                :
                console.log('Transaction Hash', transaction)
        })
    })
}
