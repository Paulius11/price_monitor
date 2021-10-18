import express from 'express'
const app = express()
import Web3 from "web3";
import hnyAgve from "./abi/hnyAgveXdai.js";


const millisecondToCheck = 60000
const port = 3011



const tokenData = async (token = "") => {
  const web3 = new Web3(
    new Web3.providers.HttpProvider("https://rpc.xdaichain.com")
  );
  if (!token) {
    var customToken = new web3.eth.Contract(
      hnyAgve,
      "0x50A4867AEe9cafd6dDC84de3CE59dF027Cb29084"
    ); 
  } else {
    var customToken = new web3.eth.Contract(ERC20ABI, token); // dogeMoon
  }


  // run only standalone
  const reserves = await customToken.methods.getReserves ().call();
  //console.log(reserves);
  return  reserves;
};





app.listen(port, async () => {
    console.log(`Auto-Reinvest on BSC app listening at http://localhost:${port}`)

    console.log(`Recheck every : ${millisecondToCheck / 60000} mins`);


    setInterval(async () => {
        console.log("Rechecking...")
		const {_reserve0, _reserve1} = await tokenData();
	
		var rate = _reserve0/_reserve1
		console.log(`Agave rate: ${rate}`)
		
		
		
    }, millisecondToCheck);
})


