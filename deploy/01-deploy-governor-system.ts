import { DeployFunction } from "hardhat-deploy/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"
import { readJSONFile, writeJSONFile } from "../utils/helper"
const deployGovernanceToken: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // @ts-ignore
  const { getNamedAccounts, deployments, network } = hre
  const { deploy, log } = deployments

  //getting all the address of executor, proposer and voter
  const [deployer, proposer1, proposer2, proposer3, voter1, voter2, voter3] =
    await hre.ethers.getSigners()

  //deploying governance token
  log("----------------------------------------------------")
  log("Deploying GovernanceToken and waiting for confirmations...")
  const govTokenJson: any = await readJSONFile("govToken.json")
  log("govTokenJson", govTokenJson)
  const GovernanceToken = await hre.ethers.getContractFactory("GovernanceToken", deployer)
  const governanceToken = await GovernanceToken.deploy(
    govTokenJson.tokenName,
    govTokenJson.tokenSymbol
  )
  await governanceToken.deployed()

  //do the same work
  // const governanceToken = await deploy("GovernanceToken", {
  //   from: deployer,
  //   args: [govTokenJson.tokenName, govTokenJson.tokenSymbol],
  //   log: true,
  //   // we need to wait if on a live network so we can verify properly
  //   waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
  // })

  log(`GovernanceToken at ${governanceToken.address}`)
  const deployedTokenData = {
    tokenContractAddress: governanceToken.address,
  }

  const data = await writeJSONFile("govTokenInfo.json", deployedTokenData)
  console.log("process.env.SSH_LOGIN_USERNAME", process.env.SSH_LOGIN_USERNAME)
  // if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
  //   await verify(governanceToken.address, [])
  // }
}

export default deployGovernanceToken
deployGovernanceToken.tags = ["all", "governor"]
