const hre = require("hardhat");

async function main() {
  // Obtenemos el contrato
  const Token = await hre.ethers.getContractFactory("MiTokenMonad");

  // Desplegamos el contrato con 1 millón de tokens
  const initialSupply = hre.ethers.parseUnits("1000000", 18); // 1 millón con 18 decimales
  const token = await Token.deploy(initialSupply);

  // Esperamos a que se despliegue
  await token.deployed();

  // Mostramos la dirección del contrato desplegado
  console.log("✅ Token ERC20 desplegado en la red Monad Testnet:");
  console.log("📬 Dirección:", token.target); // token.address en versiones antiguas
}

main().catch((error) => {
  console.error("❌ Error al desplegar el contrato:", error);
  process.exitCode = 1;
});
