# MongoDB Local Development Setup

This guide provides step-by-step instructions to set up MongoDB locally for development purposes. Follow these steps to get started:

---

## Prerequisites

- **Operating System:** Windows, macOS, or Linux
- **Tools:**
  - A terminal or command-line interface
  - Package Manager (e.g., Homebrew for macOS, Chocolatey for Windows, or APT/YUM for Linux)
  - Node.js (optional, for backend development integration)

---

## Steps to Set Up MongoDB Locally

### 1. Install MongoDB

#### **Option 1: Using Package Manager**

- **For macOS** (Homebrew):
  ```bash
  brew tap mongodb/brew
  brew install mongodb-community@8.0.3
  ```

- **For Ubuntu/Debian-based Linux**:
  ```bash
  wget -qO - https://www.mongodb.org/static/pgp/server-8.0.asc | sudo apt-key add -
  echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/8.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-8.0.list
  sudo apt update
  sudo apt install -y mongodb-org
  ```

- **For Windows**:
  1. Download the [MongoDB MSI Installer](https://www.mongodb.com/try/download/community).
  2. Follow the installation wizard.
  3. Ensure the option to add MongoDB to the PATH environment variable is selected.

#### **Option 2: Download Precompiled Binaries**

1. Go to the [MongoDB Download Center](https://www.mongodb.com/try/download/community).
2. Select version `8.0.3`, choose **macOS**, and download the `.tgz` package.
3. Extract the downloaded file:
   ```bash
   tar -xvzf mongodb-macos-x86_64-8.0.3.tgz
   ```
4. Move the extracted folder to a directory in your PATH, such as `/usr/local/bin`:
   ```bash
   sudo mv mongodb-macos-x86_64-8.0.3 /usr/local/mongodb
   ```
5. Add MongoDB binaries to your PATH by editing your shell profile (e.g., `.zshrc` or `.bash_profile`):
   ```bash
   export PATH=/usr/local/mongodb/bin:$PATH
   ```
   Reload your shell profile:
   ```bash
   source ~/.zshrc
   ```

---

### 2. Run MongoDB Locally

#### **Start the MongoDB Service**

- **For macOS/Linux:**
  ```bash
  brew services start mongodb/brew/mongodb-community@8.0.3
  ```

  Or run it directly without a background service:
  ```bash
  mongod --dbpath /path/to/data
  ```

- **For Windows:**
  1. Open Command Prompt as Administrator.
  2. Run:
     ```bash
     net start MongoDB
     ```

#### **Verify MongoDB is Running**

Run the following command in your terminal:
```bash
mongo
```
If the connection is successful, you'll see the MongoDB shell prompt (`>`).

---

### 3. Configure MongoDB

1. **Default Data Directory**:
   - By default, MongoDB stores data in `/data/db` (Linux/macOS) or `C:\data\db` (Windows).
   - Create this directory if it doesn’t exist and set appropriate permissions:
     ```bash
     mkdir -p /data/db
     sudo chmod -R 775 /data/db
     ```

2. **Custom Configuration**:
   - Create a `mongod.conf` file for advanced configurations, such as:
     ```yaml
     storage:
       dbPath: /custom/path/to/db
     net:
       bindIp: 127.0.0.1
       port: 27017
     ```
   - Run MongoDB with your custom configuration:
     ```bash
     mongod --config /path/to/mongod.conf
     ```

---

### 4. Connect to MongoDB

#### **Using MongoDB Shell**:
```bash
mongo
```

#### **Using a GUI Tool**:
- Install [MongoDB Compass](https://www.mongodb.com/products/compass) for a graphical interface.
- Connect to `localhost:27017`.

#### **Using a Node.js Application**:

1. Install the MongoDB driver:
   ```bash
   npm install mongodb
   ```

2. Create a connection:
   ```javascript
   const { MongoClient } = require('mongodb');

   const uri = 'mongodb://localhost:27017';
   const client = new MongoClient(uri);

   async function run() {
     try {
       await client.connect();
       console.log('Connected to MongoDB');
       const db = client.db('mydatabase');
       // Perform operations on the database
     } finally {
       await client.close();
     }
   }

   run().catch(console.error);
   ```

---

### 5. Manage MongoDB

#### **Stop MongoDB**
- **macOS/Linux:**
  ```bash
  brew services stop mongodb/brew/mongodb-community@8.0.3
  ```
- **Windows:**
  ```bash
  net stop MongoDB
  ```

#### **Check MongoDB Logs**
Logs are typically located in `/var/log/mongodb` or in the path specified in your configuration file.

---

## Troubleshooting

- **Permission Errors:** Ensure proper permissions for the `dbPath` directory.
- **Port Conflicts:** Verify that no other process is using port `27017`.
- **Connection Issues:** Ensure MongoDB is running and listening on the correct IP and port.

---

You are now ready to start developing with MongoDB locally!
