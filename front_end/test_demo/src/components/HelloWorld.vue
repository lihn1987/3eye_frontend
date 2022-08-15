<template>
  <div class="hello">
    <input type="file" ref="upload_file" @change="handleChange" />
    
    <div style="display:flex">
      <div style="line-height: 40px; width: 128px">file hash:</div>
      <el-input
        placeholder="请输入内容"
        v-model="file_hash"
        :disabled="true">
      </el-input>
    </div>
    <el-button size="small" type="success" @click="upload">上传到服务器</el-button>


    <!-- <el-upload
      class="upload-demo"
      ref="upload"
      action="/api/upload/"
      @change="handleChange"
      :auto-upload="false"
      :multiple = "false">
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="upload">上传到服务器</el-button>
    </el-upload> -->
  </div>
</template>

<script>
import crypto from "crypto"
import axios from "axios"
// import {
//   web3Accounts,
//   web3Enable,
// } from '@polkadot/extension-dapp';

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      hash_state: "normal",
      file_hash:"unknown",
      upload_file: null,
    }
  },
  mounted(){
    alert("???")
  },
  methods: {
    handleChange: function(event) {
      let file = event.target.files[0]
      this.upload_file = file
      console.log(file.name)
      console.log(file.size)
      console.log(file)
      let reader = new FileReader()
      reader.readAsArrayBuffer(file)
      this.file_hash = "analysing..."
      var self = this
      reader.onload = function (e) {
        console.log(reader.result)
        var hash = crypto.createHash('sha256').update("123456\n").digest('hex');
        self.file_hash = hash
        self.hash_state = "right"
      }
    },
    upload: function() {
      console.log(this.$refs.upload_file.value)
      // this.$refs.upload.submit();
      let param = new FormData() 
      param.append('file', this.upload_file)       // 通过append向form对象添加数据
      param.append("hash", this.file_hash); // 添加form表单中其他数据
      let config = {
         headers: {'Content-Type': 'multipart/form-data'}
      }
      axios.post("/api/upload/",param, config).then((res)=>{
        console.log(res)
        // if(res.succeed){
          
        //     this.$message.success("添加成功")  //需要引入elemrnt
        // }else{
        //       this.$message.warning("添加失败")
        // }
      }).catch((err)=>{
            this.$message.warning("图片上传失败，请重新上传!")
      })
    }
  }
}
// da5698be17b9b46962335799779fbeca8ce5d491c0d26243bafef9ea1837a9d8
// 6d9d1d216e0f83abc5e5662ca62c92b4f23009466b54fa27321a69acdb778bb2
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.normal {
  color: #555555;
}
.right {
  color: #005500;
}
.error {
  color: #550000;
}
</style>
