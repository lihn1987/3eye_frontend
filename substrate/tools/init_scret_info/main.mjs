import { ApiPromise, WsProvider } from '@polkadot/api';
import { Keyring } from '@polkadot/keyring';

const BOB = '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty';
console.log('????');
async function main () {
  // 初始化节点
  const wsProvider = new WsProvider('ws://127.0.0.1:9001')
  const api = await ApiPromise.create({ provider: wsProvider });
  const keyring = new Keyring({ type: 'sr25519' });

  // 加载是sudo账户
  const sudo_key = keyring.addFromUri('isolate absurd sunny market wife steel glove sibling become creek issue doll');
  const fee_to = '5GWXL6eEwrLmXKK4HoQorsWqhcpK44f8Do38onSMsuFqbrer'
  // var nonce = await api.rpc.system.accountNextIndex('5Cd2zCdwtPTQFx26aKPo5QKwxhsJsqsZiuGfv8QFt4aRMFSG');
  // 配置secret
  console.log("设置转账地址")
  var trans = api.tx.balances.transfer(fee_to, BigInt(11*1000*10**10));
  var hash = await trans.signAndSend(sudo_key, {nonce:-1});

  console.log("设置收钱地址")
  trans = api.tx.sudo
  .sudo(
    api.tx.secretInfo.forceSetFeeTo(fee_to)
  );
  hash = await trans.signAndSend(sudo_key, {nonce:-1})


  console.log("设置上传者")
  trans = api.tx.sudo
  .sudo(
    api.tx.secretInfo.forceSetUploader('5Cd2zCdwtPTQFx26aKPo5QKwxhsJsqsZiuGfv8QFt4aRMFSG')
  );
  hash = await trans.signAndSend(sudo_key, {nonce:-1})


  console.log("设置每字节的价格")
  trans = api.tx.sudo
  .sudo(
    api.tx.secretInfo.set1bytePrice(10*10**10)
  );
  hash = await trans.signAndSend(sudo_key, {nonce:-1})
  
}


main()


// setInterval(function() {
//   console.log("timer that keeps nodejs processing running");
// }, 1000 * 60 * 60);