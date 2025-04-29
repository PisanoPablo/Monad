require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    monad: {
      url: "https://testnet-rpc.monad.xyz",
      accounts: [process.env.PRIVATE_KEY], // ⚠️ wallet de prueba
      chainId: 10143,
    }
  }
};
