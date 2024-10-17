import {Address} from "viem";

async function fetchCoinData(contractAddress: Address, networkId: number) {
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_API_URL}:${process.env.REACT_APP_SERVER_PORT}/api/price/${networkId}/${contractAddress}`);
        //console.log("fetchCoinData: received response: ", response);

        if (!response.ok) {
            //throw new Error(`Error fetching coin data: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("fetchCoinData: received data: ", data);

        return data;
    } catch (error) {
        console.error("Error fetching coin data:", error);
    }
}

export default fetchCoinData;