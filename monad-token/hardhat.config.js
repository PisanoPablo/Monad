require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();
// Requerimos dotenv para gestionar archivos .env
const dotenv = require("dotenv");

// Detectamos el entorno actual (development, production, testnet)
const ENV = process.env.NODE_ENV || "testnet";

// Cargamos el archivo .env correspondiente según el entorno
dotenv.config({ path: `.env.${ENV}` });



/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    // Configuración de las redes
    mainnet: {
      url: process.env.MAINNET_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
    testnet: {
      url: process.env.TESTNET_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
    }
  },
    localhost: {
      url: "http://127.0.0.1:8545", // O es http://127.0.0.1:5500/ no sé
      chainId: 1337
    },
    etherscan: {
      apiKey: process.env.ETHERSCAN_API_KEY, // Asegúrate de tener tu clave API de Etherscan
    },
  }
