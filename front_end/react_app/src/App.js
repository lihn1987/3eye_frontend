import logo from './logo.svg';
import React from 'react';
import './App.css';

import sha256 from 'crypto-js/sha256';
import axios from 'axios'
import Base64 from 'crypto-js/enc-base64';
import CryptoJS from 'crypto-js'
import { ApiPromise, WsProvider } from '@polkadot/api';
import { ContractPromise } from '@polkadot/api-contract';
import {
  web3Accounts,
  web3Enable,
  web3FromAddress,
  web3ListRpcProviders,
  web3UseRpcProvider
} from '@polkadot/extension-dapp';
import {create} from '@phala_b/sdk';
var metadata = {
  "source": {
    "hash": "0x34b0c4750206d75939f8670efd16334b4f9134517758cb673748b5919a02b985",
    "language": "ink! 3.3.0",
    "compiler": "rustc 1.64.0-nightly"
  },
  "contract": {
    "name": "pass_save",
    "version": "0.1.0",
    "authors": [
      "Hang Yin <hangyin@phala.network>"
    ]
  },
  "V3": {
    "spec": {
      "constructors": [
        {
          "args": [],
          "docs": [],
          "label": "new",
          "payable": false,
          "selector": "0x9bae9d5e"
        }
      ],
      "docs": [],
      "events": [],
      "messages": [
        {
          "args": [],
          "docs": [],
          "label": "create_pwd",
          "mutates": true,
          "payable": false,
          "returnType": {
            "displayName": [],
            "type": 2
          },
          "selector": "0x503ba197"
        },
        {
          "args": [
            {
              "label": "plaintext",
              "type": {
                "displayName": [
                  "Vec"
                ],
                "type": 5
              }
            }
          ],
          "docs": [],
          "label": "encrypt",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "Result"
            ],
            "type": 6
          },
          "selector": "0xc842034c"
        },
        {
          "args": [
            {
              "label": "ciphertext",
              "type": {
                "displayName": [
                  "Vec"
                ],
                "type": 5
              }
            }
          ],
          "docs": [],
          "label": "decrypt",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "Result"
            ],
            "type": 6
          },
          "selector": "0x90df3b6a"
        }
      ]
    },
    "storage": {
      "struct": {
        "fields": [
          {
            "layout": {
              "cell": {
                "key": "0x0000000000000000000000000000000000000000000000000000000000000000",
                "ty": 0
              }
            },
            "name": "user_password"
          }
        ]
      }
    },
    "types": [
      {
        "id": 0,
        "type": {
          "def": {
            "composite": {
              "fields": [
                {
                  "name": "offset_key",
                  "type": 4,
                  "typeName": "Key"
                }
              ]
            }
          },
          "params": [
            {
              "name": "K",
              "type": 1
            },
            {
              "name": "V",
              "type": 2
            }
          ],
          "path": [
            "ink_storage",
            "lazy",
            "mapping",
            "Mapping"
          ]
        }
      },
      {
        "id": 1,
        "type": {
          "def": {
            "composite": {
              "fields": [
                {
                  "type": 2,
                  "typeName": "[u8; 32]"
                }
              ]
            }
          },
          "path": [
            "ink_env",
            "types",
            "AccountId"
          ]
        }
      },
      {
        "id": 2,
        "type": {
          "def": {
            "array": {
              "len": 32,
              "type": 3
            }
          }
        }
      },
      {
        "id": 3,
        "type": {
          "def": {
            "primitive": "u8"
          }
        }
      },
      {
        "id": 4,
        "type": {
          "def": {
            "composite": {
              "fields": [
                {
                  "type": 2,
                  "typeName": "[u8; 32]"
                }
              ]
            }
          },
          "path": [
            "ink_primitives",
            "Key"
          ]
        }
      },
      {
        "id": 5,
        "type": {
          "def": {
            "sequence": {
              "type": 3
            }
          }
        }
      },
      {
        "id": 6,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "fields": [
                    {
                      "type": 5
                    }
                  ],
                  "index": 0,
                  "name": "Ok"
                },
                {
                  "fields": [
                    {
                      "type": 7
                    }
                  ],
                  "index": 1,
                  "name": "Err"
                }
              ]
            }
          },
          "params": [
            {
              "name": "T",
              "type": 5
            },
            {
              "name": "E",
              "type": 7
            }
          ],
          "path": [
            "Result"
          ]
        }
      },
      {
        "id": 7,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "index": 0,
                  "name": "BadOrigin"
                },
                {
                  "index": 1,
                  "name": "BadgeContractNotSetUp"
                },
                {
                  "index": 2,
                  "name": "InvalidUrl"
                },
                {
                  "index": 3,
                  "name": "RequestFailed"
                },
                {
                  "index": 4,
                  "name": "NoClaimFound"
                },
                {
                  "index": 5,
                  "name": "InvalidAddressLength"
                },
                {
                  "index": 6,
                  "name": "InvalidAddress"
                },
                {
                  "index": 7,
                  "name": "NoPermission"
                },
                {
                  "index": 8,
                  "name": "InvalidSignature"
                },
                {
                  "index": 9,
                  "name": "UsernameAlreadyInUse"
                },
                {
                  "index": 10,
                  "name": "AccountAlreadyInUse"
                },
                {
                  "index": 11,
                  "name": "FailedToIssueBadge"
                },
                {
                  "index": 12,
                  "name": "CannotEncrypt"
                },
                {
                  "index": 13,
                  "name": "CannotDecrypt"
                }
              ]
            }
          },
          "path": [
            "pass_save",
            "pass_save",
            "Error"
          ]
        }
      }
    ]
  }
}
function App() {
  return (
    <div className="App">
      <Upload></Upload>
    </div>
  );
}


function arrayBufferToWordArray(ab) {
  var i8a = new Uint8Array(ab);
  var a = [];
  for (var i = 0; i < i8a.length; i += 4) {
    a.push((i8a[i] << 24) | (i8a[i + 1] << 16) | (i8a[i + 2] << 8) | i8a[i + 3]);
  }
  console.log(CryptoJS.lib.WordArray)
  return CryptoJS.lib.WordArray.create(a, i8a.length);
}

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.inited = false
    this.api = null
    this.pha_api = null
    this.upload_file = null
    this.file_size = 0
    this.current_addr = null

    this.addrs_ref = React.createRef()
    this.state = {
      addr_list:[],
      hash: "unknown",
      could_upload: false,
      file_info:[]
    };
  }

  OnInputChange (event) {
    let file = event.target.files[0]
    console.log(this)
    this.upload_file = file
    this.file_size = file.size

    this.check_hash_timer = null
    console.log(file.name)
    console.log(file.size)
    console.log(file)
    let reader = new FileReader()
    reader.readAsArrayBuffer(file)
    this.state.hash = "analysing..."
    var self = this
    reader.onload = function (e) {
      var hash = sha256( arrayBufferToWordArray(reader.result)).toString();
      console.log(hash)
      // self.state.hash = hash
      self.setState({
        hash:"0x"+hash
      })
      console.log(self.state)
      // console.log(hash)
    }
  }
  fee() {
    console.log("fee", this.state.hash, this.file_size, this.addrs_ref.current.value)
    var SENDER = this.addrs_ref.current.value;
    web3FromAddress(SENDER).then((e)=>{
      this.api.tx.secretInfo
        .uploadFile(this.state.hash, this.file_size)
        .signAndSend(this.addrs_ref.current.value, { signer: e.signer })
    })
    
  }
  upload() {
    console.log("upload")
    let param = new FormData() 
    param.append('file', this.upload_file)       // 通过append向form对象添加数据
    param.append("hash", this.state.hash); // 添加form表单中其他数据
    let config = {
       headers: {'Content-Type': 'multipart/form-data'}
    }
    axios.post("/api/upload/",param, config).then((res)=>{
      console.log(res)
    }).catch((err)=>{
          this.$message.warning("图片上传失败，请重新上传!")
    })
  }
  componentDidMount() {
    if (this.inited == false) {
      //更新账户列表
      var self = this
      setTimeout(function(){
        web3Enable('my cool dapp').then((e)=>{
          // 获取钱包所有地址
          web3Accounts().then((e) => {
            console.log("list", e)
            self.setState({
              addr_list:e
            })
          })

          // 配置api
          var wsProvider = new WsProvider('ws://127.0.0.1:9001'); // 这个是rpc地址，需要根据实际修改
          ApiPromise.create({ provider: wsProvider
          }).then((api_tmp) => {
              console.log("api created")
              self.api = api_tmp
              console.log("api", api_tmp)
          }) 
          

          // 配置phala contract
          const pha_wsProvider = new WsProvider('wss://poc5.phala.network/ws');
          ApiPromise.create({
              provider: pha_wsProvider,
          }).then((api_tmp) => {
            console.log("pha_api created")
            self.pha_api = api_tmp
            console.log("sub api", api_tmp)
            const contractId = '0x62ede2a632e7440ec8d71d02eed960b27d31eaceba7600a7f6910ef243acbd04';  // your contract id
            const baseURL = 'https://poc5.phala.network/tee-api-1'
            console.log(create)
            create({api: api_tmp, baseURL:baseURL, contractId:contractId}).then(function(p){
              console.log("phala api:", p)
              const contract = new ContractPromise(p, metadata, contractId)
              console.log("phala contract:", contract)
            })
          });
          
          // Create a contract object with the metadata and the contract id.
          // const pruntimeURL = 'http://127.0.0.1:8000';  // assuming the default port
          



        })
          
      }, 2000)

      var self = this
      this.check_hash_timer = setInterval( function(){
        // console.log("????????")
        if (self.api) {
          self.api.query.secretInfo.fileState.keys().then( (data) => {
            var args = []
            for (var i = 0; i < data.length; i++) {
              var str = data[i].toString()
              args.push('0x'+str.substr(str.length - 64, 64))
            }
            
            // 更新所有的文件
            self.api.query.secretInfo.fileState.multi(args, (res)=>{
              var files = []
              for ( var i = 0; i < res.length; i++ ) {
                var json_obj = JSON.parse(res[i].toString())
                var obj = {
                  hash: args[i],
                  file_size: json_obj[0],
                  owner: json_obj[1],
                  is_upload: json_obj[2],
                  is_ar: json_obj[3]
                }
                // console.log(obj.owner, self.addrs_ref.current.value)
                if (obj.owner == self.addrs_ref.current.value) {
                  files.push(obj)
                }
              }
              self.setState({
                file_info: files
              })
              // console.log("files", files)
            })

            // 更新是否能够上传文件
            if (self.state.hash != "unknown"){
              self.api.query.secretInfo.fileState(self.state.hash, (res)=>{
                if (res.toString() == ""){
                  self.setState({
                    could_upload: false
                  })
                } else {
                  self.setState({
                    could_upload: true
                  })
                }
              })
            }

          })
        }
      }, 2000)


      this.inited = true
    }
    console.log("moun ted")
  }
 
  componentWillUnmount() {
    console.log("unmount", this.inited)
  }
 
  render() {
    // console.log("??", this)
    var files = []
    for (var i = 0; i < this.state.file_info.length; i++){
      files.push(
        <div key={i} style={{padding:'12px'}}>
          <div>文件hash:  {this.state.file_info[i].hash.substr(0,5)}...{this.state.file_info[i].hash.substr(this.state.file_info[i].hash.length-5,5)}</div>
          <div>文件大小:  {this.state.file_info[i].file_size}</div>
          <div>是否上传:  {this.state.file_info[i].is_upload?'是':'否'}</div>
          <div>是否ar:  {this.state.file_info[i].is_ar?'是':'否'}</div>
        </div>
      )
    }

    var options = []
    for (var i = 0; i < this.state.addr_list.length; i++) {
      options.push(<option value = {this.state.addr_list[i]["address"]} key={i} >{this.state.addr_list[i]["meta"]["name"]} </option>)
    }
    return (
      <div style = {{textAlign: 'left',marginTop: '48px'}}>
        <div style={{textAlign: 'left', marginTop:'48px'}}>
          <div>
            账户
          </div> 
          <select style={{minWidth: '128px'}} ref={this.addrs_ref}>
            {options}
          </select>

          <div>我的文件</div>
          <div style={{display: 'flex'}}>
            {files}
          </div>
        </div>
        <input type='file' style={{marginTop: '48px'}} onChange = {(e) => this.OnInputChange(e)}/> 
        <div style={{display: 'flex',width: '628px'}}>
          <div style={{textAlign: 'left',width: '128px'}}>file hash:</div> 
          <input style= {{ width: "500px" }}
            placeholder="请输入内容" value={this.state.hash } readOnly={true}>
          </input>
        </div> 
        <div>
          <input type="button" onClick={()=>this.fee()} value='缴费'></input>
        </div>
        <div>
          <input type="button" onClick={()=>this.upload()} value='点击上传文件' disabled = {!this.state.could_upload}></input>
        </div>
      </div> 
      
    );
  }
}
export default App;