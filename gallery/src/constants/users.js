const getUsers = (total = 6) => {
  return [...Array(total)].map((d, index) => {
    return {
      _id: `userId_${index + 1}`,
      fistName: `name_${index + 1}`,
      lastName: `surname_${index + 1}`,
      nickname: `@nickname_${index + 1}`,
      description: `All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary_${
        index + 1
      }`,
      code: `${index + 1}_XAVUW3sw3ZunitokcLtemEfX3tGuX2plateWdh!`,
      site: `https://unitok.template!_${index + 1}`,
      verified: index % 2 === 0,
      followers: 3800 + index,
      isFollowing: index % 2 === 1
    };
  });
};

export const sortOptions = [
  { value: "rating", label: "By rating" },
  { value: "views", label: "By views" },
  { value: "popularity", label: "By popularity" },
];

export const statusOptions = [
  { value: "all", label: "All Users" },
  { value: "verified", label: "Verified only" },
];

export default getUsers;
