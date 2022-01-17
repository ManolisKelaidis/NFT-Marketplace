// types : added, offered, purchased, transferred, followed, liked
const getActivityList = (total = 6) => {
  return [...Array(total)].map((d, index) => {
    return {
      _id: `activityId_${index + 1}`,
      title: `Walking on Air (${index + 1})`,
      item: {
        _id: `itemId_${index + 1}`,
        title: `Walking on Air (${index + 1})`,
        price: 4.89,
      },
      user: {
        _id: `userId_${index + 1}`,
        nickname: `@nickname_${index + 1}`,
      },
      type: "liked",
      createdAt: "4 minutes ago",
    };
  });
};

export default getActivityList;
