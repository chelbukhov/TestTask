require("@nomiclabs/hardhat-waffle");
require("solidity-coverage");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("_invest", "Invest some funds to the contract", async (taskArgs, hre) => {
	console.log("task is disabled, sorry");
});


/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
};
