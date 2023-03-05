// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract SimpleStorage {

  struct DataOwner {
    string accountAddress;
    uint filesCount;
    string ipfsHash;
  }

  mapping(string => DataOwner) public dataOwners;
  uint public dataOwnerCount;

  constructor() public {
    adddataOwner("27D380412C6903B0C34451a6FcB052A9ADCE5C2b");
  }
  //string ipfsHash;

  function adddataOwner (string memory _accountAddress) private {
    dataOwnerCount++;
    dataOwners[_accountAddress] = DataOwner(_accountAddress, 0, '');
  }

  function accessFile (string memory _accountAddress) public {
    bytes memory accAddress = bytes(dataOwners[_accountAddress].accountAddress);
    require(accAddress.length != 0);
    bytes memory ipfsAddress = bytes(dataOwners[_accountAddress].ipfsHash);
    require(ipfsAddress.length != 0);
  }

  function read(string memory _accountAddress) public view returns (string memory) {
    bytes memory accAddress = bytes(dataOwners[_accountAddress].accountAddress);
    require(accAddress.length != 0);
    return dataOwners[_accountAddress].ipfsHash;
  }

  function write(string memory _ipfsReturn, string memory _accountAddress) public {
    dataOwners[_accountAddress].filesCount++;
    dataOwners[_accountAddress].ipfsHash = _ipfsReturn;
  }
}
