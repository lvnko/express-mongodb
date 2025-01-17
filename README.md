# Week #009 + Week #010
## 專案啟動步驟
1. 安裝與設定 mongodb 開發環境，執行步驟可以參考 [``setup.md``](./setup.md)
2. 安裝專案依賴模組
```node
npm install
```
3. 啟動環境
```node
npm run start
```  
### 開發環境依賴
- Mongodb v8.0
- Node.js v18.20.2
***
## mongoose 的使用觀念
在 Mongoose 中，Schemas 和 Models 在定義和使用 MongoDB 文件方面扮演著截然不同但互補的角色。  
### Schemas（模式）
Schema 是 MongoDB 文件的藍圖。它定義了結構、默認值、數據類型、驗證規則等等，但它不直接與數據庫交互。  
### Models（模型）
Model 是 Schema 的編譯版本。它提供了一個與數據庫交互的接口，允許您查詢、創建、更新和刪除文件。  
### 主要區別  
| 層面 | Schema | Model |
|:---|---|---|
| **目的** | 文件結構的藍圖/定義 | 與數據庫交互的接口 |
| **功能** | 指定數據類型、默認值、驗證 | 提供 CRUD 操作 |
| **與數據庫的關係** | 不直接與數據庫交互 | 與數據庫交互 |
### 代碼示例
```javascript
// Import Mongoose
import mongoose from 'mongoose';

// Define a Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name must be a string and is required
  email: { type: String, required: true, unique: true }, // Unique email address
  age: { type: Number, min: 0 }, // Age must be a non-negative number
  createdAt: { type: Date, default: Date.now } // Default to the current date
});

// Add a method to the schema
userSchema.methods.getDisplayName = function () {
  return `${this.name} (${this.email})`;
};

// Add a static function to the schema
userSchema.statics.findByEmail = function (email) {
  return this.findOne({ email });
};

// Compile a Model from the Schema
const User = mongoose.model('User', userSchema);

// Using the Model to interact with the database
(async () => {
  // Connect to MongoDB
  await mongoose.connect('mongodb://localhost:27017/test');

  // Create a new user document
  const newUser = new User({
    name: 'John Doe',
    email: 'john.doe@example.com',
    age: 30
  });

  // Save the user to the database
  await newUser.save();
  console.log('User saved:', newUser);

  // Use an instance method
  console.log('Display Name:', newUser.getDisplayName());

  // Use a static method
  const foundUser = await User.findByEmail('john.doe@example.com');
  console.log('Found User:', foundUser);

  // Close the connection
  await mongoose.connection.close();
})();

```
### 示例中的要點

- #### Schema：
    - 定義文件結構（姓名、電子郵件、年齡等）。
    - 添加實例方法（getDisplayName）和靜態方法 (findByEmail)。
- #### Model：
    - 與數據庫交互以保存、查詢或刪除文件。
    - 提供 save()、findOne() 和 findByEmail()（自定義）等方法。  

### 總結
- Schemas 定義數據的外觀。
- Models 使用 Schemas 與數據庫交互。  

### CRUD 語法
mongoose 的 CRUD 使用語法與 MongoDB Shell 非常相似，其使用方法可參考另一專案中的 [筆記](../../../graphql-server/blob/main/notes/mongodb-shell.md)。
***
## 其他有用資源
- MongoDB [[官網](https://www.mongodb.com/)]
    - 使用手冊 (8.0 current) [What is MongoDB?](https://www.mongodb.com/docs/manual/)
- Mongoose [官網](https://mongoosejs.com/)