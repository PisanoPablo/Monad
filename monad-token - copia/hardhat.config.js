require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    monad: {
      url: "https://testnet-rpc.monad.xyz",
      accounts: [""], // ⚠️ wallet de prueba
      chainId: 10143,
    }
  }
};
