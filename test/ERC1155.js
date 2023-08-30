const { assert } = require("chai");
const { expect } = require("chai");
const { hre, ethers } = require("hardhat");



describe("ERC-1155 contract", function () {
// Used both mint, burn and balanceOf functions
  it("Should mint token for owner and check balanceOf", async function ()
   {
    const [owner] = await ethers.getSigners();// owner addrerss
    //console.log(await owner)
    const hardhatToken = await ethers.deployContract("MyToken");
   

    await hardhatToken.connect(owner).mint(owner, 1, 100, "0x4d7920637573746f6d206d65746164617461");
    
    await hardhatToken.connect(owner).burn(owner, 1, 30);
    //100-30=70
    expect(await hardhatToken.balanceOf(owner.address, 1)).to.equal(70);
  });


//--------------------------------------------------------------------------------------------------------------------//
  
it("Approve an address and check approval", async function () 
{ //used both setApprovalForAll and isApprovedForAll
    const [owner,addrerss1] = await ethers.getSigners();// owner addrerss
    //console.log(await owner)
    const hardhatToken = await ethers.deployContract("MyToken");
   

    await hardhatToken.connect(owner).setApprovalForAll(addrerss1, true)

    check=await hardhatToken.isApprovedForAll(owner,addrerss1)
    //console.log(check)
    assert.equal(check,true)
  });

//--------------------------------------------------------------------------------------------------------------------//

  it("Transfer token using SafeTranferFrom", async function () 
  { //used mint, setApprovalForAll, balanceOf, safeTransferFrom
    const [owner,addrerss1] = await ethers.getSigners();// owner addrerss
    //console.log(await owner)
    const hardhatToken = await ethers.deployContract("MyToken");
    
    await hardhatToken.connect(owner).mint(owner.address, 1, 100, "0x4d7920637573746f6d206d65746164617461"); //mint token

    await hardhatToken.connect(owner).setApprovalForAll(addrerss1, true) //approve an address to transfer token

    console.log("Balance of owner before transfer: ",await hardhatToken.balanceOf(owner, 1))
    console.log("Balance of operator before transfer: ",await hardhatToken.balanceOf(addrerss1, 1))

    await hardhatToken.connect(addrerss1).safeTransferFrom(owner, addrerss1, 1, 45, "0x4d7920637573746f6d206d65746164617461")
    
    console.log("Balance of owner after transfer: ",await hardhatToken.balanceOf(owner, 1))
    console.log("Balance of operator after transfer: ",await hardhatToken.balanceOf(addrerss1, 1))      
      
    });

//--------------------------------------------------------------------------------------------------------------------//

    it("Should Batchmint and Batchburn token for owner and check BatchBalanceOf", async function ()
    {//used mint mintBatch and balanceOfBatch
    const [owner,address1] = await ethers.getSigners();// owner addrerss
    //console.log(await owner)
    const hardhatToken = await ethers.deployContract("MyToken");

    await hardhatToken.connect(owner).mintBatch(owner,[2,3],[10,15],"0xffff");

    await hardhatToken.connect(owner).burnBatch(owner,[2,3],[5,5],);
      //10-5=5
    await hardhatToken.connect(owner).mint(address1, 1, 100, "0xffff");

    console.log(await hardhatToken.balanceOfBatch([owner,address1],[2,1]))
    
    });

//--------------------------------------------------------------------------------------------------------------------//

it("Transfer token using SafeBatchTranferFrom", async function () 
{ //used mint, setApprovalForAll, balanceOf, safeTransferFrom
  const [owner,addrerss1] = await ethers.getSigners();// owner addrerss
  //console.log(await owner)
  const hardhatToken = await ethers.deployContract("MyToken");
  
  await hardhatToken.connect(owner).mintBatch(owner,[2,1],[10,15],"0xffff");

  await hardhatToken.connect(owner).setApprovalForAll(addrerss1, true) //approve an address to transfer token

  console.log("Balance of owner before transfer: ",await hardhatToken.balanceOfBatch([owner,owner],[2,1]))
  console.log("Balance of operator before transfer: ",await hardhatToken.balanceOfBatch([addrerss1,addrerss1],[2,1]))

  await hardhatToken.connect(addrerss1).safeBatchTransferFrom(owner, addrerss1, [1,2], [5,10], "0xffff")
  
  console.log("Balance of owner after transfer: ",await hardhatToken.balanceOfBatch([owner,owner],[2,1]))
  console.log("Balance of operator after transfer: ",await hardhatToken.balanceOfBatch([addrerss1,addrerss1],[2,1]))      
    
  });

//--------------------------------------------------------------------------------------------------------------------//  

it("Transfer ownership and check", async function () 
{ //used both transferOwnership and owner variable
    const [owner,addrerss1] = await ethers.getSigners();// owner addrerss
    
    const hardhatToken = await ethers.deployContract("MyToken");
   

    console.log("Old owner: ",await hardhatToken.connect(owner).owner())

    await hardhatToken.connect(owner).transferOwnership(addrerss1)

    console.log("New owner: ",await hardhatToken.connect(owner).owner())    

    assert.equal(await hardhatToken.connect(owner).owner(), addrerss1.address)
  });

})

