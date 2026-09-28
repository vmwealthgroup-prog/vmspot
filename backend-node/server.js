const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/chart/:symbol', (req, res) => {
  const symbol = req.params.symbol || 'BTCUSD';
  res.json({
    symbol,
    status: 'success',
    candles: [
      { time: '2026-09-23', open: 62000, high: 63500, low: 61800, close: 63100 }
    ]
  });
});

app.listen(5000, () => console.log('BTC Node API running on port 5000'));