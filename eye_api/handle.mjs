const error_unknow = -1
const error_unknow_url = -2



import { ApiPromise, WsProvider } from '@polkadot/api';
import { Keyring } from '@polkadot/keyring';


var api = null
var sudo_key = null
var wsProvider = new WsProvider('ws://eye_block:9001'); // 这个是rpc地址，需要根据实际修改
ApiPromise.create({ provider: wsProvider
}).then((api_tmp) => {
    console.log("api created")
    api = api_tmp
    const keyring = new Keyring({ type: 'sr25519' });
    sudo_key = keyring.addFromUri('isolate absurd sunny market wife steel glove sibling become creek issue doll');
})

function handle_post(path, param, cb){
    try{
        if(path == "/api/test"){
            cb("1122");
        }
    } catch(e) {
        cb(0)
    }
}
function handle_get(path, param, cb){
    if(path == "/api/test"){
        const fee_to = '5GWXL6eEwrLmXKK4HoQorsWqhcpK44f8Do38onSMsuFqbrer'
        var trans = api.tx.sudo
        .sudo(
            api.tx.secretInfo.forceSetUpload("0x06d6ba083ab0a12fe365aecfcf2d88372923beec6852bc2c59971f736eaba392")
        );
        trans.signAndSend(sudo_key, ({status, events}) =>{
            console.log(status.toString())
            console.log(events.toString())
            console.log("==========================================")
            if(status.isFinalized){
                cb("ok")
            }
        })
    } else if(path == "/api/upload_file"){
        console.log(param)
        const hash = param.hash
        api.tx.secretInfo.forceSetUpload(hash).signAndSend(sudo_key)
        cb(123)
        // const fee_to = '5GWXL6eEwrLmXKK4HoQorsWqhcpK44f8Do38onSMsuFqbrer'
        // var trans = api.tx.sudo
        // .sudo(
        //     api.tx.secretInfo.forceSetUpload("0x06d6ba083ab0a12fe365aecfcf2d88372923beec6852bc2c59971f736eaba392")
        // );
        // trans.signAndSend(sudo_key, ({status, events}) =>{
        //     console.log(status.toString())
        //     console.log(events.toString())
        //     console.log("==========================================")
        //     if(status.isFinalized){
        //         cb("ok")
        //     }
        // })
    }
    //cb("1122");
}


export {handle_post, handle_get};