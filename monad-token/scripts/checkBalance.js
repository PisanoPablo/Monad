require('dotenv').config();
const { ethers } = require("hardhat");

async function main() {
  // Conectamos a la red configurada en Hardhat (en este caso "monad")
  const provider = new ethers.JsonRpcProvider("https://testnet-rpc.monad.xyz");

  // Cargamos la wallet desde la clave privada del .env
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  console.log(`Dirección de la wallet: ${wallet.address}`);

  // Obtenemos y mostramos el balance
  const balance = await provider.getBalance(wallet.address);
  console.log(`Balance: ${ethers.formatEther(balance)} ETH`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
