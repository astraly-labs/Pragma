type AssetKeyT = string;

interface Currency {
  src: string;
  alt: string;
}

// Mapping from asset key abbreviation to Currency.
const currencySymbols = {
  USD: {
    src: "dollar.svg",
    alt: "US Dollar",
  },
  MXN: {
    src: "dollar.svg",
    alt: "Mexican Dollar",
  },
  EUR: {
    src: "euro.svg",
    alt: "Euro",
  },
};

/**
 * Converts asset key into file name of currency symbol;
 * @param {AssetKeyT} assetKey
 * @return {string} file name of the currency symbol
 */
export function getCurrency(assetKey: AssetKeyT): Currency {
  const slashIndex = assetKey.indexOf("/");
  const dashIndex = assetKey.indexOf("-");
  const cur =
    dashIndex === -1
      ? assetKey.slice(slashIndex + 1)
      : assetKey.slice(slashIndex + 1, dashIndex);
  return currencySymbols[cur];
}

// Local token artwork shared by both explorer networks.
const currencyLogos: Record<string, string> = {
  aave: "aave.svg",
  apt: "apt.svg",
  arb: "arb.svg",
  atom: "atom.svg",
  avax: "avax.svg",
  bch: "bch.svg",
  bnb: "bnb.svg",
  bonk: "bonk.svg",
  btc: "btc.svg",
  crv: "crv.svg",
  dai: "dai.svg",
  dash: "dash.png",
  dog: "dog.png",
  doge: "doge.svg",
  dot: "dot.svg",
  dpi: "dpi.svg",
  ekubo: "ekubo.png",
  ena: "ena.svg",
  etc: "etc.svg",
  eth: "eth.svg",
  eur: "eur.svg",
  euro: "euro.svg",
  fil: "fil.svg",
  goat: "goat.svg",
  hype: "hype.svg",
  inj: "inj.svg",
  jlp: "jlp.svg",
  jto: "jto.svg",
  jup: "jup.svg",
  lbtc: "lbtc.png",
  ldo: "ldo.svg",
  link: "link.svg",
  lords: "lords.svg",
  ltc: "ltc.svg",
  lusd: "lusd.svg",
  mkr: "mkr.svg",
  morpho: "morpho.png",
  move: "move.svg",
  mre7btc: "mre7btc.svg",
  mre7yield: "mre7yield.svg",
  near: "near.svg",
  nstr: "nstr.svg",
  okb: "okb.svg",
  ondo: "ondo.svg",
  op: "op.svg",
  paxg: "paxg.png",
  pendle: "pendle.svg",
  pol: "pol.svg",
  popcat: "popcat.svg",
  reth: "reth.svg",
  s: "s.svg",
  sei: "sei.svg",
  shib: "shib.svg",
  sol: "sol.svg",
  steth: "steth.svg",
  strk: "strk.svg",
  sui: "sui.svg",
  susn: "susn.svg",
  theta: "theta.svg",
  tia: "tia.svg",
  ton: "ton.svg",
  tron: "tron.svg",
  trx: "tron.svg",
  uni: "uni.svg",
  unibtc: "unibtc.png",
  usdc: "usdc.svg",
  usdt: "usdt.svg",
  usn: "usn.svg",
  wbtc: "wbtc.svg",
  wif: "wif.svg",
  wld: "wld.svg",
  wsteth: "wsteth.svg",
  xaut: "xaut.png",
  xmr: "xmr.png",
  xrp: "xrp.svg",
  xstrk: "xstrk.svg",
  zec: "zec.png",
  zend: "zend.svg",
};

/** Resolve the base token of a pair, leaving unknown tokens to the avatar fallback. */
export function getLogoPath(assetKey: AssetKeyT): string {
  const symbol = assetKey.split("/")[0].toLowerCase();
  const file = currencyLogos[symbol];
  return Object.hasOwn(currencyLogos, symbol)
    ? `/assets/currencies/${file}`
    : "";
}
