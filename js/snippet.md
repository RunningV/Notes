## 一行代码搞定系列

1. 英文句子首字母大写：

   ```
   str.toLowerCase().replace(/\b(\w)/g, f => f.toUpperCase())
   ```

   ​

