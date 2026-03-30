export async function getFearAndGreed() {
  const res = await fetch("https://api.alternative.me/fng/?limit=1", {
    next: { revalidate: 0 },
  });
  return res.json();
}

export async function getTrending() {
  const res = await fetch("https://api.coingecko.com/api/v3/search/trending", {
    next: { revalidate: 0 },
  });
  return res.json();
}

export async function getBinanceTickers() {
  const res = await fetch(
    "https://api.binance.com/api/v3/ticker/24hr?symbols=[%22BTCUSDT%22,%22ETHUSDT%22,%22SOLUSDT%22,%22DOGEUSDT%22,%22AVAXUSDT%22,%22LINKUSDT%22,%22SUIUSDT%22,%22PEPEUSDT%22,%22ARBUSDT%22,%22OPUSDT%22]",
    { next: { revalidate: 0 } }
  );
  return res.json();
}
