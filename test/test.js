const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TestTask test...", () => {
    let testTask;
    let acc0;
    let accounts;
    let res;

  it("deploy contract", async () => {
    const TestTask = await ethers.getContractFactory("TestTask");
    testTask = await TestTask.deploy();
    await testTask.deployed();
    accounts = await hre.ethers.getSigners();
    acc0 = accounts[0].address;
    console.log("Contract deployed to:", testTask.address);

  });

  it("test owner", async () => {
  	expect(await testTask.owner()).to.equal(acc0);
  });

    it('invest from accounts0...', async () => {
        expect (await testTask.invest({value: 200}));

    });    

    it('show list of investors...', async () => {
        expect (res = await testTask.contributionList());
	console.log(res);  

    });    

    it('invest from accounts1...', async () => {

	const testTask1 = await testTask.connect(accounts[1]);
        expect (await testTask1.invest({value: 300}));

    });    

    it('show contribution of account1.. must be 300', async () => {
        expect (res = await testTask.contributionView(accounts[1].address));
	console.log(res);  

    });    

    it('show list of investors...now is two', async () => {
        expect (res = await testTask.contributionList());
	console.log(res);  

    });    

    it('reinvest from accounts1...', async () => {

	const testTask1 = await testTask.connect(accounts[1]);
        expect (await testTask1.invest({value: 500}));

    });    

    it('show contribution of account1.. must be 300+500=800', async () => {
        expect (res = await testTask.contributionView(accounts[1].address));
	console.log(res);  

    });    

    it('show list of investors...still is two', async () => {
        expect (res = await testTask.contributionList());
	console.log(res);  

    });    

    it('invest from accounts2...', async () => {

	const testTask2 = await testTask.connect(accounts[2]);
        expect (await testTask2.invest({value: 1000}));

    });    
    it('show list of investors...now is three', async () => {
        expect (res = await testTask.contributionList());
	console.log(res);  

    });    
    it('try to withdraw from NOowner...reverted', async () => {
        try{
	const testTask2 = await testTask.connect(accounts[2]);
	expect (await testTask2.withdraw(accounts[9].address, 1000));
        } catch (error) {
            console.log(error.message);
        }

    });    

    it('try to withdraw from owner...passed', async () => {

	expect (await testTask.withdraw(accounts[9].address, 1000));

    });    



});
