<template>
  <div class="hello">
    <input type="file" @change="handleChange" />
    <div style="display:flex">
      <div style="line-height: 24px;">file hash:</div>
      <div style="line-height: 24px;margin-left:24px" :class="hash_state">{{file_hash}}</div>
    </div>


    <el-upload
      class="upload-demo"
      ref="upload"
      action="https://jsonplaceholder.typicode.com/posts/"
      :auto-upload="false"
      :multiple = "false">
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
    </el-upload>
  </div>
</template>

<script>
import crypto from "crypto"
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      hash_state: "normal",
      file_hash:"unknown",
    }
  },
  methods: {
    handleChange: function(event) {
      let file = event.target.files[0]
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
