const hre = require("hardhat");
const { ethers } = require("hardhat");

require("dotenv").config({ path: `.env.${process.env.NODE_ENV || "testnet"}` });

async function main() {
  try {
    console.log(`Usando entorno: ${process.env.NODE_ENV}`);
    
    // Verificar clave privada
    if (!process.env.PRIVATE_KEY) {
      throw new Error("❌ PRIVATE_KEY no está configurado en el archivo .env");
    }

    // Forzar compilación (por si acaso)
    console.log("🔧 Compilando contrato...");
    await hre.run("compile");
    
    //const [deployer] = await ethers.getSigners();
    const provider = new ethers.JsonRpcProvider(process.env.TESTNET_RPC_URL);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY).connect(provider);
    console.log("Desplegando con la cuenta:", wallet.address);

    // Verificar balance inicial
    const balanceInicial = await provider.getBalance(wallet.address);
    console.log("Balance inicial:", ethers.formatEther(balanceInicial), "MON");

    // Cargar el contrato con 1M tokens
    const Token = await ethers.getContractFactory("MiPrimerTokenMonad", wallet);
    console.log("✅ Contrato cargado correctamente.");

    // Desplegamos el contrato con 1 millón de tokens
    const initialSupply = ethers.parseUnits("1000000", 18); // 1 millón con 18 decimales
    const token = await Token.connect(wallet).deploy(initialSupply);
    console.log("🚀 Transacción de despliegue enviada:");

    // Mostramos la dirección del contrato desplegado
    console.log("Token desplegado en:", token.address);

    // Esperamos a que se confirme la transacción
    const receipt = await token.deploymentTransaction().wait();
    console.log("✅ Contrato desplegado en:", token.target);

    // ✅ Obtener balance final correctamente
    console.log("Token desplegado en:", token.address);
    const balanceFinal = await ethers.provider.getBalance(wallet.address);
    console.log("💰 Balance final:", ethers.formatEther(balanceFinal), "ETH");
    console.log("📬 Dirección:", token.target || token.address); // target para compatibilidad
    console.log(receipt.status,": 1 si fue exitosa, 0 si falló.");
    console.log(receipt.transactionHash,": el hash de la transacción en la blockchain.");
    console.log(receipt.blockNumber,": el número del bloque donde se confirmó.");
    console.log(receipt.gasUsed,": el gas que se utilizó en la transacción.");
    console.log(receipt.cumulativeGasUsed,": el gas total utilizado en el bloque (útil para diagnóstico).");
    console.log(receipt.contractAddress,": la dirección del contrato desplegado (en este caso, tu token).");
    const gasUsed = receipt.gasUsed;
  const gasPrice = await provider.getGasPrice();
  const gasCostInEth = ethers.formatEther(gasUsed.mul(gasPrice));
  console.log("💰 Costo del gas (ETH):", gasCostInEth);
  const ethToUsdRate = 1800; // Ajusta esto al precio actual del mercado
  console.log("💰 Costo del gas (USD):", (parseFloat(gasCostInEth) * ethToUsdRate).toFixed(2));

  } catch (error) {
    console.error("❌ Error al desplegar el contrato:", error.message);
    console.error("❌ Stack:", error.stack);
  }
}

main().catch((error) => {
  console.error("❌ Error global:", error.message);
  console.error("❌ Stack global:", error.stack);
  process.exitCode = 1;
});