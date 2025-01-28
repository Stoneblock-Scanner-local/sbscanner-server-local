export const reduceEntityIds = (
  ids: string[],
  entityIdsCounts: any[],
  groupBy: string,
) => {
  return ids.reduce(
    (entityCounts, id) => ({
      ...entityCounts,
      [id]:
        entityIdsCounts.find((c) => c[groupBy] === id)?._count[groupBy] || 0,
    }),
    {},
  );
};
