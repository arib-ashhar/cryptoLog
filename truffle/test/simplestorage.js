const SimpleStorage = artifacts.require("./SimpleStorage.sol");

contract("SimpleStorage", function(accounts) {
  var SimpleStorageInstance;
  it("Initializes smart contract with one dataowner", function() {
    return SimpleStorage.deployed().then(function(instance) {
      return instance.dataOwnerCount();
    }).then(function(count) {
      assert.equal(count, 1);
    })
  })

  it("adds a file successfuly", function() {
    return SimpleStorage.deployed().then(function(instance) {
      SimpleStorageInstance = instance;
      SimpleStorageInstance.write("test ipfs hash address", "27D380412C6903B0C34451a6FcB052A9ADCE5C2b", { from:accounts[0] })
      return SimpleStorageInstance.dataOwners("27D380412C6903B0C34451a6FcB052A9ADCE5C2b")
    }).then(function(dataOwner1) {
      var fileCount = dataOwner1[1];
      assert.equal(fileCount, 0, "Data Owner 1 has correct File counts");
    });
  });

  it("throws an exception for invalid File access", function() {
    return SimpleStorage.deployed().then(function(instance) {
      SimpleStorageInstance = instance;
      return SimpleStorageInstance.read("test invalid adress", { from:accounts[0] })
    }).then(assert.fail).catch(function(error) {
      assert(error.message.indexOf('revert') >= 0, "error message must contain revert");
      return SimpleStorageInstance.dataOwners("27D380412C6903B0C34451a6FcB052A9ADCE5C2b")
    }).then(function(dataOwner1) {
      var fileCount = dataOwner1[1];
      assert.equal(fileCount, 1, "Data Owner 1 has correct File counts");
    });
  });

  
});
