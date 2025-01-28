import { ProjectCategory } from '@prisma/client';

export function projectCategoryDtoConverter(
  categories: ProjectCategory[] | ProjectCategory,
) {
  return Array.isArray(categories)
    ? categories.map((s) => projectCategoryMapping(s))
    : projectCategoryMapping(categories);
}

function projectCategoryMapping(category: ProjectCategory) {
  switch (category) {
    case ProjectCategory.DEFI:
      return 'DeFi';
    case ProjectCategory.DEVELOPER_TOOLING:
      return 'Developer Tooling';
    case ProjectCategory.GAMING:
      return 'Gaming';
    case ProjectCategory.INFRASTRUCTURE:
      return 'Infrastructure';
    case ProjectCategory.NFT:
      return 'NFT';
    case ProjectCategory.OTHER:
      return 'Other';
    case ProjectCategory.SOCIAL:
      return 'Social';
  }
}
