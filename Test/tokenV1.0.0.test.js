const DYCOIN = artifacts.require("./DYCOIN.sol");

contract('DYCOIN', function(accounts) {
  var tokenInstance;

  it('initializes the contract with the correct values', function() {
    return DYCOIN.deployed().then(function(instance) {
      tokenInstance = instance;
      return tokenInstance.name();
    }).then(function(name) {
      assert.equal(name, 'DYCOIN', 'has the correct name');
      return tokenInstance.symbol();
    }).then(function(symbol) {
      assert.equal(symbol, 'DYC', 'has the correct symbol');
      return tokenInstance.currency();
    }).then(function(currency) {
      assert.equal(currency, 'NGN', 'has the correct currency');
    });
  })

  it('allocates the initial supply upon deployment', function() {
    return DYCOIN.deployed().then(function(instance) {
      tokenInstance = instance;
      return tokenInstance.totalSupply();
    }).then(function(totalSupply) {
      assert.equal(totalSupply.toNumber(), 1000000, 'sets the total supply to 1,000,000');
      return tokenInstance.balances(accounts[0]);
    }).then(function(adminBalance) {
      assert.equal(adminBalance.toNumber(), 0, 'it allocates the initial supply to the admin account');
    });
  });

  // it('transfers token ownership', function() {
  //   return DYCOIN.deployed().then(function(instance) {
  //     tokenInstance = instance;
  //     // Test `require` statement first by transferring something larger than the sender's balance
  //     return tokenInstance.transfer.call(accounts[1], 1000000);
  //   }).then(assert.fail).catch(function(error) {
  //     assert(error.message.indexOf('revert') >= 0, 'error message must contain revert');
  //     return tokenInstance.transfer.call(accounts[1], 250000, { from: accounts[0] });
  //   });
  // });
})