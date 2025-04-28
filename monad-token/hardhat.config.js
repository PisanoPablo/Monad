require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    monad: {
      url: "https://testnet-rpc.monad.xyz",
      accounts: ["buffalo dose tube mechanic reopen adapt spot oval defense grunt ski squirrel"], // ⚠️ wallet de prueba
      chainId: 10143,
    }
  }
};
