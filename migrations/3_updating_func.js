const DYCOIN = artifacts.require("DYCOIN");

module.exports = async function(deployer, accounts, network) {
    const Dycoin = await DYCOIN.deployed();
    await Dycoin.initialize("DYCOIN", "DYC", "NGN", 2,	"0xC972e9F6dA0C31cD50957F3244a9F822551e0616", 1000000, "0x97C982a4033d5fceD06Eedbee1Be10778E811D85", "0xDf8dC9f8239f4a276fda625649F80abD376d4Cf3", "0x33c0F52769e483A57CFeDfDFCF00351f01eF0813");
};
