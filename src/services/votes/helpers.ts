const reduceVoteIds = (
  ids: string[],
  upCounts: any[],
  downCounts: any[],
  groupBy: string,
) => {
  return ids.reduce(
    (idVotes, id) => ({
      ...idVotes,
      [id]: {
        upVotes: upCounts.find((c) => c[groupBy] === id)?._count[groupBy] || 0,
        downVotes:
          downCounts.find((c) => c[groupBy] === id)?._count[groupBy] || 0,
      },
    }),
    {},
  );
};

export { reduceVoteIds };
