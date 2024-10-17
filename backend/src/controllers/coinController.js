const { getCoinPrice } = require('../services/coinService');

async function getPriceByNetworkAndContract(req, res, next) {
  try {
    const { contractAddress, networkId } = req.params;
    
    // Проверка наличия параметров
    if (!contractAddress || !networkId) {
      return res.status(400).json({ error: 'Missing contract address or network ID' });
    }
    
    const priceData = await getCoinPrice(contractAddress, networkId);
    console.log("priceData: ", priceData);

    // Если токен не найден
    if (!priceData) {
      return res.status(404).json({ error: 'Token not found for the given network ID and contract address' });
    }

    res.status(200).json(priceData);
  } catch (error) {
    // Логирование ошибки
    console.error('Error fetching coin price:', error);
    
    // Если ошибка специфична для пользователя
    if (error.message.includes('Invalid contract address')) {
      return res.status(400).json({ error: 'Invalid contract address format' });
    }

    // Передаем ошибку в middleware для обработки ошибок
    next(error);
  }
}

module.exports = {
  getPriceByNetworkAndContract,
};

/*
const { getCoinPrice } = require('../services/coinService');

async function getPriceByNetworkAndContract(req, res, next) {
  try {
    const { contractAddress, networkId } = req.params;    
    const priceData = await getCoinPrice(contractAddress, networkId);
    res.status(200).json(priceData);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getPriceByNetworkAndContract,
};
*/