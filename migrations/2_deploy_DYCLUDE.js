const { scripts, ConfigManager } = require('@openzeppelin/cli');
const { add, push, create } = scripts;

async function deploy(options) {
  add({ contractsData: [{ name: 'DYCOIN', alias: 'DYCOIN' }] });
  await push(options);
  await create(Object.assign({ contractAlias: 'DYCOIN' }, options));
}

module.exports = function(deployer, networkName, accounts) {
  deployer.then(async () => {
    const { network, txParams } = await ConfigManager.initNetworkConfiguration({ network: networkName, from: accounts[0] })
    await deploy({ network, txParams }, 10000000)

    
  })
}

