require("dotenv").config({ path: `.env.${process.env.NODE_ENV || "development"}` });
const { ethers } = require("hardhat");
console.log("✅ Entorno configurado:", process.env);

async function main() {
  console.log(`Usando entorno: ${process.env.NODE_ENV}`);
  // Conectamos a la red configurada en Hardhat (en este caso "monad")
  const provider = new ethers.JsonRpcProvider("https://testnet-rpc.monad.xyz");

  // Verificamos si la clave privada se ha cargado correctamente
  if (!process.env.PRIVATE_KEY) {
    throw new Error("Error: PRIVATE_KEY no está configurado en el archivo .env");
  }
  
  // Cargamos la wallet desde la clave privada del .env
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  console.log(`Dirección dSe la wallet: ${wallet.address}`);

  // Obtenemos y mostramos el balance
  const balance = await provider.getBalance(wallet.address);
  console.log(`Balance: ${ethers.formatEther(balance)} ETH`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
