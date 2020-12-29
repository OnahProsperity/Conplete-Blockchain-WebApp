// SPDX-License-Identifier: MIT
import "./DYCOIN.sol";

pragma solidity ^0.7.1;

contract DYCTokenSales{
    // DYC Address = 0x4Fabb145d64652a948d72533023f6E7A623C7C53
    // BUSD Decimals = 18
    // USDC Address = 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
    // USDC Decimals = 6

    DYCOIN public tokenContract;  // the token being sold
    uint256 public price;              // the price, in wei, per token
    address private owner;
    uint256 public tokensSold;

    event Sold(address buyer, uint256 amount);
    
    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "DYC Token: Caller is not the Owner"
        );
        _;
    }


    // Initializer function (replaces constructor).
    // When the contract is deploy, 
    //(cont) pass in an USDC contract deployment address as the first argument,
    // (cont) and Solidity will cast it to type DYCOIN.
    // Keep track of the address that deploy the contract,
    // (cont) because  it will be the owner account that will be require to end the sales and the price of token.

    constructor ( DYCOIN _tokenContract, uint256 _price) {
        //require(!initialized, "DYC Token: contract is already initialized");
        require(owner != address(0), "DYC: new owner is the zero address");
        require(price != 0, "DYC: new price must be greater than zero");
        owner = msg.sender;

        tokenContract = _tokenContract;
        price = _price;       
    }

    // Guards against integer overflows
    function safeMultiply(uint256 a, uint256 b) internal pure returns (uint256) {
        if (a == 0) {
            return 0;
        } else {
            uint256 c = a * b;
            assert(c / a == b);
            return c;
        }
    }

    function buyTokens(uint256 numberOfTokens) public payable {
        require(msg.value == safeMultiply(numberOfTokens, price), "DYC: Incorrect amount of token sent");

        uint256 scaledAmount = safeMultiply(numberOfTokens,
            uint256(18) ** tokenContract.decimals());

        require(address(this).balance >= scaledAmount, "DYC: Insufficient Number of Token to Complet sales");

        emit Sold(msg.sender, numberOfTokens);
        tokensSold += numberOfTokens;

        require(tokenContract.transfer(msg.sender, scaledAmount), "DYC: Sorry Sales have been reverted");
    }

    //ENDING SALES
    function endSale() public onlyOwner{

    // Send unsold tokens to the owner.
    require(tokenContract.transfer(owner, address(this).balance), "DYC: Sales ended.");

    msg.sender.transfer(address(this).balance);
}
}