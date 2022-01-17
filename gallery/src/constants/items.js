const getItems = (total = 6) => {
  return [...Array(total)].map((d, index) => {
    return {
      _id: `itemId_${index + 1}`,
      title: `Walking on Air (${index + 1})`,
      user: {
        _id: `userId_${index + 1}`,
        nickname: `@nickname_${index + 1}`,
      },
      userId: `userId_${index + 1}`,
      userNickname: `@nickname_${index + 1}`,
      price: 4.89,
      likes: 189 + index,
      verified: index % 2 === 0,
    };
  });
};

export const itemSocial = [
  { value: "socials-1", label: "Instagram" },
  { value: "socials-2", label: "Facebook" },
  { value: "socials-3", label: "Twitter" },
];

export const itemTypes = [
  { value: "PutOnSale", label: "Put on sale" },
  { value: "InstantSalePrice", label: "Instant sale price" },
  { value: "UnlockOnePurchased", label: "Unlock one purchased" },
];

export const itemRoyalties = [
  { value: "royalties-1", label: "5%" },
  { value: "royalties-2", label: "10%" },
  { value: "royalties-3", label: "20%" },
];

export const categoryOptions = [
  { value: "Music", label: "Music" },
  { value: "Art", label: "Art" },
  { value: "Photography", label: "Photography" },
  { value: "Games", label: "Games" },
  { value: "Metaverses", label: "Metaverses" },
  { value: "Domains", label: "Domains" },
  { value: "Memes", label: "Memes" },
];

export const blockchains = [
  { value: "Ethereum", label: "Ethereum" },
  { value: "BinanceChain", label: "BinanceChain" },
  { value: "Safemoon", label: "Safemoon" },
];
export default getItems;
