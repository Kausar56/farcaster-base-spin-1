type TokenProps = {
  name: string;
  code: string;
  img: string;
  address: `0x${string}` | undefined;
  decimal: number;
};

export const tokens: TokenProps[] = [
  {
    name: "Monad",
    code: "MON",
    img: "https://docs.monad.xyz/img/monad_logo.png",
    address: undefined,
    decimal: 18,
  },
  {
    name: "Tether USD",
    code: "USDT",
    img: "https://imagedelivery.net/cBNDGgkrsEA-b_ixIp9SkQ/images.png/public",
    address: "0x88b8E2161DEDC77EF4ab7585569D2415a1C1055D",
    decimal: 6,
  },
  {
    name: "USDC Coin",
    code: "USDC",
    img: "https://imagedelivery.net/cBNDGgkrsEA-b_ixIp9SkQ/usdc.png/public",
    address: "0xf817257fed379853cDe0fa4F97AB987181B1E5Ea",
    decimal: 6,
  },
  {
    name: "Wrapped MON",
    code: "WMON",
    img: "https://imagedelivery.net/cBNDGgkrsEA-b_ixIp9SkQ/wbtc.png/public",
    address: "0xcf5a6076cfa32686c0Df13aBaDa2b40dec133F1d",
    decimal: 8,
  },
  {
    name: "Chog",
    code: "CHOG",
    img: "https://imagedelivery.net/tWwhAahBw7afBzFUrX5mYQ/5d1206c2-042c-4edc-9f8b-dcef2e9e8f00/public",
    address: "0xE0590015A873bF326bd645c3E1266d4db41C4E6B",
    decimal: 18,
  },
  {
    name: "Molandak",
    code: "DAK",
    img: "https://imagedelivery.net/tWwhAahBw7afBzFUrX5mYQ/27759359-9374-4995-341c-b2636a432800/public",
    address: "0x0F0BDEbF0F83cD1EE3974779Bcb7315f9808c714",
    decimal: 18,
  },
  {
    name: "Moyaki",
    code: "YAKI",
    img: "https://imagedelivery.net/tWwhAahBw7afBzFUrX5mYQ/6679b698-a845-412b-504b-23463a3e1900/public",
    address: "0xfe140e1dCe99Be9F4F15d657CD9b7BF622270C50",
    decimal: 18,
  },
];
