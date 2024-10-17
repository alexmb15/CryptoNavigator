const express = require('express');
const { getPriceByNetworkAndContract } = require('../controllers/coinController');

const router = express.Router();

router.get('/price/:networkId/:contractAddress', getPriceByNetworkAndContract);

module.exports = router;
