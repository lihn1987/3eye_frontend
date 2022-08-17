修改`node_modules`中的`@phala`为`@phala_b`
修改 `@phala_b/sdk/disk/index.js`

从 

`import * as $protobuf from "protobufjs/minimal";`

改为

`import * as $protobuf from "protobufjs";`

`import`部分把`@phala`改为`@phala_b`即可