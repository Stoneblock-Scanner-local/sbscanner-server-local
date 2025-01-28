import { PrismaClient } from '@prisma/client';
import { ProjectCategory } from '@prisma/client';
import { ApprovalStage } from '@prisma/client';
const prisma = new PrismaClient();

// ATTENTION, MAKE SURE YOU PROVIDE VALID USER ID(CREATOR ID)
const userId = '858b28b3-58ce-48c6-b178-bedd2f115334';

async function nominations() {
  const nominations = [
    {
      title: 'bitcoin',
      name: 'crazy bitcoin',
      website: 'www.mywebsite.com',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione molestiae quasi quae in accusamus quos modi aperiam fugit asperiores officiis facere ut maiores adipisci rerum itaque fugiat vitae pariatur ad explicabo, unde quaerat sint atque voluptatem. Labore, sunt aliquam? Possimus corporis fugiat soluta modi alias quos repellendus praesentium non cumque.',

      categories: [ProjectCategory.DEVELOPER_TOOLING],
      approvalStage: ApprovalStage.RATE_APPROVED,
      socialX: 'www.myxaccount.com',
      otherInfo: 'sadas',
      creatorId: userId,
    },
    {
      title: 'coldd',
      name: 'coldd',
      website: 'www.mywebsite.com',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione molestiae quasi quae in accusamus quos modi aperiam fugit asperiores officiis facere ut maiores adipisci rerum itaque fugiat vitae pariatur ad explicabo, unde quaerat sint atque voluptatem. Labore, sunt aliquam? Possimus corporis fugiat soluta modi alias quos repellendus praesentium non cumque.',

      categories: [ProjectCategory.DEVELOPER_TOOLING],
      approvalStage: ApprovalStage.RATE_APPROVED,
      socialX: 'www.myxaccount.com',
      otherInfo: 'sadas',
      creatorId: userId,
    },
    {
      title: 'dodge',
      name: 'dodge',
      website: 'www.mywebsite.com',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione molestiae quasi quae in accusamus quos modi aperiam fugit asperiores officiis facere ut maiores adipisci rerum itaque fugiat vitae pariatur ad explicabo, unde quaerat sint atque voluptatem. Labore, sunt aliquam? Possimus corporis fugiat soluta modi alias quos repellendus praesentium non cumque.',

      categories: [ProjectCategory.DEVELOPER_TOOLING],
      approvalStage: ApprovalStage.RATE_APPROVED,
      socialX: 'www.myxaccount.com',
      otherInfo: 'sadas',
      creatorId: userId,
    },
    {
      title: 'etf btc',
      name: 'etf btc',
      website: 'www.mywebsite.com',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione molestiae quasi quae in accusamus quos modi aperiam fugit asperiores officiis facere ut maiores adipisci rerum itaque fugiat vitae pariatur ad explicabo, unde quaerat sint atque voluptatem. Labore, sunt aliquam? Possimus corporis fugiat soluta modi alias quos repellendus praesentium non cumque.',

      categories: [ProjectCategory.DEVELOPER_TOOLING],
      approvalStage: ApprovalStage.RATE_APPROVED,
      socialX: 'www.myxaccount.com',
      otherInfo: 'sadas',
      creatorId: userId,
    },
    {
      title: 'super mario',
      name: 'super mario',
      website: 'www.mywebsite.com',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione molestiae quasi quae in accusamus quos modi aperiam fugit asperiores officiis facere ut maiores adipisci rerum itaque fugiat vitae pariatur ad explicabo, unde quaerat sint atque voluptatem. Labore, sunt aliquam? Possimus corporis fugiat soluta modi alias quos repellendus praesentium non cumque.',

      categories: [ProjectCategory.GAMING],
      approvalStage: ApprovalStage.RATE_APPROVED,
      socialX: 'www.myxaccount.com',
      otherInfo: 'sadas',
      creatorId: userId,
    },
    {
      title: 'fifa',
      name: 'fifa',
      website: 'www.mywebsite.com',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione molestiae quasi quae in accusamus quos modi aperiam fugit asperiores officiis facere ut maiores adipisci rerum itaque fugiat vitae pariatur ad explicabo, unde quaerat sint atque voluptatem. Labore, sunt aliquam? Possimus corporis fugiat soluta modi alias quos repellendus praesentium non cumque.',

      categories: [ProjectCategory.GAMING],
      approvalStage: ApprovalStage.RATE_APPROVED,
      socialX: 'www.myxaccount.com',
      otherInfo: 'sadas',
      creatorId: userId,
    },
    {
      title: 'game',
      name: 'game',
      website: 'www.mywebsite.com',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione molestiae quasi quae in accusamus quos modi aperiam fugit asperiores officiis facere ut maiores adipisci rerum itaque fugiat vitae pariatur ad explicabo, unde quaerat sint atque voluptatem. Labore, sunt aliquam? Possimus corporis fugiat soluta modi alias quos repellendus praesentium non cumque.',

      categories: [ProjectCategory.GAMING],
      approvalStage: ApprovalStage.RATE_APPROVED,
      socialX: 'www.myxaccount.com',
      otherInfo: 'sadas',
      creatorId: userId,
    },
    {
      title: 'arcade',
      name: 'arcade',
      website: 'www.mywebsite.com',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione molestiae quasi quae in accusamus quos modi aperiam fugit asperiores officiis facere ut maiores adipisci rerum itaque fugiat vitae pariatur ad explicabo, unde quaerat sint atque voluptatem. Labore, sunt aliquam? Possimus corporis fugiat soluta modi alias quos repellendus praesentium non cumque.',

      categories: [ProjectCategory.GAMING],
      approvalStage: ApprovalStage.RATE_APPROVED,
      socialX: 'www.myxaccount.com',
      otherInfo: 'sadas',
      creatorId: userId,
    },
    {
      title: 'infrastracute nom',
      name: 'infrastraucure nom',
      website: 'www.mywebsite.com',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione molestiae quasi quae in accusamus quos modi aperiam fugit asperiores officiis facere ut maiores adipisci rerum itaque fugiat vitae pariatur ad explicabo, unde quaerat sint atque voluptatem. Labore, sunt aliquam? Possimus corporis fugiat soluta modi alias quos repellendus praesentium non cumque.',

      categories: [ProjectCategory.INFRASTRUCTURE],
      approvalStage: ApprovalStage.RATE_APPROVED,
      socialX: 'www.myxaccount.com',
      otherInfo: 'sadas',
      creatorId: userId,
    },
    {
      title: 'infrastraucure nom',
      name: 'infrastraucure nom',
      website: 'www.mywebsite.com',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione molestiae quasi quae in accusamus quos modi aperiam fugit asperiores officiis facere ut maiores adipisci rerum itaque fugiat vitae pariatur ad explicabo, unde quaerat sint atque voluptatem. Labore, sunt aliquam? Possimus corporis fugiat soluta modi alias quos repellendus praesentium non cumque.',

      categories: [ProjectCategory.INFRASTRUCTURE],
      approvalStage: ApprovalStage.RATE_APPROVED,
      socialX: 'www.myxaccount.com',
      otherInfo: 'sadas',
      creatorId: userId,
    },
    {
      title: 'infrastraucure nom',
      name: 'infrastraucure nom',
      website: 'www.mywebsite.com',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione molestiae quasi quae in accusamus quos modi aperiam fugit asperiores officiis facere ut maiores adipisci rerum itaque fugiat vitae pariatur ad explicabo, unde quaerat sint atque voluptatem. Labore, sunt aliquam? Possimus corporis fugiat soluta modi alias quos repellendus praesentium non cumque.',

      categories: [ProjectCategory.INFRASTRUCTURE],
      approvalStage: ApprovalStage.RATE_APPROVED,
      socialX: 'www.myxaccount.com',
      otherInfo: 'sadas',
      creatorId: userId,
    },
    {
      title: 'infrastraucure nom',
      name: 'infrastraucure nom',
      website: 'www.mywebsite.com',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione molestiae quasi quae in accusamus quos modi aperiam fugit asperiores officiis facere ut maiores adipisci rerum itaque fugiat vitae pariatur ad explicabo, unde quaerat sint atque voluptatem. Labore, sunt aliquam? Possimus corporis fugiat soluta modi alias quos repellendus praesentium non cumque.',

      categories: [ProjectCategory.INFRASTRUCTURE],
      approvalStage: ApprovalStage.RATE_APPROVED,
      socialX: 'www.myxaccount.com',
      otherInfo: 'sadas',
      creatorId: userId,
    },
    {
      title: 'cool nft',
      name: 'cool nft',
      website: 'www.mywebsite.com',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione molestiae quasi quae in accusamus quos modi aperiam fugit asperiores officiis facere ut maiores adipisci rerum itaque fugiat vitae pariatur ad explicabo, unde quaerat sint atque voluptatem. Labore, sunt aliquam? Possimus corporis fugiat soluta modi alias quos repellendus praesentium non cumque.',

      categories: [ProjectCategory.NFT],
      approvalStage: ApprovalStage.RATE_APPROVED,
      socialX: 'www.myxaccount.com',
      otherInfo: 'sadas',
      creatorId: userId,
    },
    {
      title: 'crazy nft',
      name: 'crazy nft',
      website: 'www.mywebsite.com',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione molestiae quasi quae in accusamus quos modi aperiam fugit asperiores officiis facere ut maiores adipisci rerum itaque fugiat vitae pariatur ad explicabo, unde quaerat sint atque voluptatem. Labore, sunt aliquam? Possimus corporis fugiat soluta modi alias quos repellendus praesentium non cumque.',

      categories: [ProjectCategory.NFT],
      approvalStage: ApprovalStage.RATE_APPROVED,
      socialX: 'www.myxaccount.com',
      otherInfo: 'sadas',
      creatorId: userId,
    },
    {
      title: 'nft',
      name: 'nft',
      website: 'www.mywebsite.com',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione molestiae quasi quae in accusamus quos modi aperiam fugit asperiores officiis facere ut maiores adipisci rerum itaque fugiat vitae pariatur ad explicabo, unde quaerat sint atque voluptatem. Labore, sunt aliquam? Possimus corporis fugiat soluta modi alias quos repellendus praesentium non cumque.',

      categories: [ProjectCategory.NFT],
      approvalStage: ApprovalStage.RATE_APPROVED,
      socialX: 'www.myxaccount.com',
      otherInfo: 'sadas',
      creatorId: userId,
    },
    {
      title: 'infrastraucure nom',
      name: 'infrastraucure nom',
      website: 'www.mywebsite.com',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione molestiae quasi quae in accusamus quos modi aperiam fugit asperiores officiis facere ut maiores adipisci rerum itaque fugiat vitae pariatur ad explicabo, unde quaerat sint atque voluptatem. Labore, sunt aliquam? Possimus corporis fugiat soluta modi alias quos repellendus praesentium non cumque.',

      categories: [ProjectCategory.INFRASTRUCTURE],
      approvalStage: ApprovalStage.RATE_APPROVED,
      socialX: 'www.myxaccount.com',
      otherInfo: 'sadas',
      creatorId: userId,
    },
    {
      title: 'soc',
      name: 'soc',
      website: 'www.mywebsite.com',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione molestiae quasi quae in accusamus quos modi aperiam fugit asperiores officiis facere ut maiores adipisci rerum itaque fugiat vitae pariatur ad explicabo, unde quaerat sint atque voluptatem. Labore, sunt aliquam? Possimus corporis fugiat soluta modi alias quos repellendus praesentium non cumque.',

      categories: [ProjectCategory.SOCIAL],
      approvalStage: ApprovalStage.RATE_APPROVED,
      socialX: 'www.myxaccount.com',
      otherInfo: 'sadas',
      creatorId: userId,
    },
    {
      title: 'soc',
      name: 'soc',
      website: 'www.mywebsite.com',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione molestiae quasi quae in accusamus quos modi aperiam fugit asperiores officiis facere ut maiores adipisci rerum itaque fugiat vitae pariatur ad explicabo, unde quaerat sint atque voluptatem. Labore, sunt aliquam? Possimus corporis fugiat soluta modi alias quos repellendus praesentium non cumque.',

      categories: [ProjectCategory.SOCIAL],
      approvalStage: ApprovalStage.RATE_APPROVED,
      socialX: 'www.myxaccount.com',
      otherInfo: 'sadas',
      creatorId: userId,
    },
    {
      title: 'soc',
      name: 'soc',
      website: 'www.mywebsite.com',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione molestiae quasi quae in accusamus quos modi aperiam fugit asperiores officiis facere ut maiores adipisci rerum itaque fugiat vitae pariatur ad explicabo, unde quaerat sint atque voluptatem. Labore, sunt aliquam? Possimus corporis fugiat soluta modi alias quos repellendus praesentium non cumque.',

      categories: [ProjectCategory.SOCIAL],
      approvalStage: ApprovalStage.RATE_APPROVED,
      socialX: 'www.myxaccount.com',
      otherInfo: 'sadas',
      creatorId: userId,
    },
    {
      title: 'bitcoin',
      name: 'crazy bitcoin',
      website: 'www.mywebsite.com',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione molestiae quasi quae in accusamus quos modi aperiam fugit asperiores officiis facere ut maiores adipisci rerum itaque fugiat vitae pariatur ad explicabo, unde quaerat sint atque voluptatem. Labore, sunt aliquam? Possimus corporis fugiat soluta modi alias quos repellendus praesentium non cumque.',

      categories: [ProjectCategory.DEVELOPER_TOOLING],
      approvalStage: ApprovalStage.VOTE_APPROVED,
      socialX: 'www.myxaccount.com',
      otherInfo: 'sadas',
      creatorId: userId,
    },
    {
      title: 'coldd',
      name: 'coldd',
      website: 'www.mywebsite.com',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione molestiae quasi quae in accusamus quos modi aperiam fugit asperiores officiis facere ut maiores adipisci rerum itaque fugiat vitae pariatur ad explicabo, unde quaerat sint atque voluptatem. Labore, sunt aliquam? Possimus corporis fugiat soluta modi alias quos repellendus praesentium non cumque.',

      categories: [ProjectCategory.DEVELOPER_TOOLING],
      approvalStage: ApprovalStage.VOTE_APPROVED,
      socialX: 'www.myxaccount.com',
      otherInfo: 'sadas',
      creatorId: userId,
    },
    {
      title: 'dodge',
      name: 'dodge',
      website: 'www.mywebsite.com',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione molestiae quasi quae in accusamus quos modi aperiam fugit asperiores officiis facere ut maiores adipisci rerum itaque fugiat vitae pariatur ad explicabo, unde quaerat sint atque voluptatem. Labore, sunt aliquam? Possimus corporis fugiat soluta modi alias quos repellendus praesentium non cumque.',

      categories: [ProjectCategory.DEVELOPER_TOOLING],
      approvalStage: ApprovalStage.VOTE_APPROVED,
      socialX: 'www.myxaccount.com',
      otherInfo: 'sadas',
      creatorId: userId,
    },
    {
      title: 'etf btc',
      name: 'etf btc',
      website: 'www.mywebsite.com',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione molestiae quasi quae in accusamus quos modi aperiam fugit asperiores officiis facere ut maiores adipisci rerum itaque fugiat vitae pariatur ad explicabo, unde quaerat sint atque voluptatem. Labore, sunt aliquam? Possimus corporis fugiat soluta modi alias quos repellendus praesentium non cumque.',

      categories: [ProjectCategory.DEVELOPER_TOOLING],
      approvalStage: ApprovalStage.VOTE_APPROVED,
      socialX: 'www.myxaccount.com',
      otherInfo: 'sadas',
      creatorId: userId,
    },
    {
      title: 'super mario',
      name: 'super mario',
      website: 'www.mywebsite.com',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione molestiae quasi quae in accusamus quos modi aperiam fugit asperiores officiis facere ut maiores adipisci rerum itaque fugiat vitae pariatur ad explicabo, unde quaerat sint atque voluptatem. Labore, sunt aliquam? Possimus corporis fugiat soluta modi alias quos repellendus praesentium non cumque.',

      categories: [ProjectCategory.GAMING],
      approvalStage: ApprovalStage.VOTE_APPROVED,
      socialX: 'www.myxaccount.com',
      otherInfo: 'sadas',
      creatorId: userId,
    },
    {
      title: 'fifa',
      name: 'fifa',
      website: 'www.mywebsite.com',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione molestiae quasi quae in accusamus quos modi aperiam fugit asperiores officiis facere ut maiores adipisci rerum itaque fugiat vitae pariatur ad explicabo, unde quaerat sint atque voluptatem. Labore, sunt aliquam? Possimus corporis fugiat soluta modi alias quos repellendus praesentium non cumque.',

      categories: [ProjectCategory.GAMING],
      approvalStage: ApprovalStage.VOTE_APPROVED,
      socialX: 'www.myxaccount.com',
      otherInfo: 'sadas',
      creatorId: userId,
    },
    {
      title: 'game',
      name: 'game',
      website: 'www.mywebsite.com',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione molestiae quasi quae in accusamus quos modi aperiam fugit asperiores officiis facere ut maiores adipisci rerum itaque fugiat vitae pariatur ad explicabo, unde quaerat sint atque voluptatem. Labore, sunt aliquam? Possimus corporis fugiat soluta modi alias quos repellendus praesentium non cumque.',

      categories: [ProjectCategory.GAMING],
      approvalStage: ApprovalStage.VOTE_APPROVED,
      socialX: 'www.myxaccount.com',
      otherInfo: 'sadas',
      creatorId: userId,
    },
    {
      title: 'arcade',
      name: 'arcade',
      website: 'www.mywebsite.com',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione molestiae quasi quae in accusamus quos modi aperiam fugit asperiores officiis facere ut maiores adipisci rerum itaque fugiat vitae pariatur ad explicabo, unde quaerat sint atque voluptatem. Labore, sunt aliquam? Possimus corporis fugiat soluta modi alias quos repellendus praesentium non cumque.',

      categories: [ProjectCategory.GAMING],
      approvalStage: ApprovalStage.VOTE_APPROVED,
      socialX: 'www.myxaccount.com',
      otherInfo: 'sadas',
      creatorId: userId,
    },
    {
      title: 'infrastracute nom',
      name: 'infrastraucure nom',
      website: 'www.mywebsite.com',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione molestiae quasi quae in accusamus quos modi aperiam fugit asperiores officiis facere ut maiores adipisci rerum itaque fugiat vitae pariatur ad explicabo, unde quaerat sint atque voluptatem. Labore, sunt aliquam? Possimus corporis fugiat soluta modi alias quos repellendus praesentium non cumque.',

      categories: [ProjectCategory.INFRASTRUCTURE],
      approvalStage: ApprovalStage.VOTE_APPROVED,
      socialX: 'www.myxaccount.com',
      otherInfo: 'sadas',
      creatorId: userId,
    },
    {
      title: 'infrastraucure nom',
      name: 'infrastraucure nom',
      website: 'www.mywebsite.com',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione molestiae quasi quae in accusamus quos modi aperiam fugit asperiores officiis facere ut maiores adipisci rerum itaque fugiat vitae pariatur ad explicabo, unde quaerat sint atque voluptatem. Labore, sunt aliquam? Possimus corporis fugiat soluta modi alias quos repellendus praesentium non cumque.',

      categories: [ProjectCategory.INFRASTRUCTURE],
      approvalStage: ApprovalStage.VOTE_APPROVED,
      socialX: 'www.myxaccount.com',
      otherInfo: 'sadas',
      creatorId: userId,
    },
    {
      title: 'infrastraucure nom',
      name: 'infrastraucure nom',
      website: 'www.mywebsite.com',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione molestiae quasi quae in accusamus quos modi aperiam fugit asperiores officiis facere ut maiores adipisci rerum itaque fugiat vitae pariatur ad explicabo, unde quaerat sint atque voluptatem. Labore, sunt aliquam? Possimus corporis fugiat soluta modi alias quos repellendus praesentium non cumque.',

      categories: [ProjectCategory.INFRASTRUCTURE],
      approvalStage: ApprovalStage.VOTE_APPROVED,
      socialX: 'www.myxaccount.com',
      otherInfo: 'sadas',
      creatorId: userId,
    },
    {
      title: 'infrastraucure nom',
      name: 'infrastraucure nom',
      website: 'www.mywebsite.com',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione molestiae quasi quae in accusamus quos modi aperiam fugit asperiores officiis facere ut maiores adipisci rerum itaque fugiat vitae pariatur ad explicabo, unde quaerat sint atque voluptatem. Labore, sunt aliquam? Possimus corporis fugiat soluta modi alias quos repellendus praesentium non cumque.',

      categories: [ProjectCategory.INFRASTRUCTURE],
      approvalStage: ApprovalStage.VOTE_APPROVED,
      socialX: 'www.myxaccount.com',
      otherInfo: 'sadas',
      creatorId: userId,
    },
    {
      title: 'cool nft',
      name: 'cool nft',
      website: 'www.mywebsite.com',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione molestiae quasi quae in accusamus quos modi aperiam fugit asperiores officiis facere ut maiores adipisci rerum itaque fugiat vitae pariatur ad explicabo, unde quaerat sint atque voluptatem. Labore, sunt aliquam? Possimus corporis fugiat soluta modi alias quos repellendus praesentium non cumque.',

      categories: [ProjectCategory.NFT],
      approvalStage: ApprovalStage.VOTE_APPROVED,
      socialX: 'www.myxaccount.com',
      otherInfo: 'sadas',
      creatorId: userId,
    },
    {
      title: 'crazy nft',
      name: 'crazy nft',
      website: 'www.mywebsite.com',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione molestiae quasi quae in accusamus quos modi aperiam fugit asperiores officiis facere ut maiores adipisci rerum itaque fugiat vitae pariatur ad explicabo, unde quaerat sint atque voluptatem. Labore, sunt aliquam? Possimus corporis fugiat soluta modi alias quos repellendus praesentium non cumque.',

      categories: [ProjectCategory.NFT],
      approvalStage: ApprovalStage.VOTE_APPROVED,
      socialX: 'www.myxaccount.com',
      otherInfo: 'sadas',
      creatorId: userId,
    },
    {
      title: 'nft',
      name: 'nft',
      website: 'www.mywebsite.com',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione molestiae quasi quae in accusamus quos modi aperiam fugit asperiores officiis facere ut maiores adipisci rerum itaque fugiat vitae pariatur ad explicabo, unde quaerat sint atque voluptatem. Labore, sunt aliquam? Possimus corporis fugiat soluta modi alias quos repellendus praesentium non cumque.',

      categories: [ProjectCategory.NFT],
      approvalStage: ApprovalStage.VOTE_APPROVED,
      socialX: 'www.myxaccount.com',
      otherInfo: 'sadas',
      creatorId: userId,
    },
    {
      title: 'infrastraucure nom',
      name: 'infrastraucure nom',
      website: 'www.mywebsite.com',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione molestiae quasi quae in accusamus quos modi aperiam fugit asperiores officiis facere ut maiores adipisci rerum itaque fugiat vitae pariatur ad explicabo, unde quaerat sint atque voluptatem. Labore, sunt aliquam? Possimus corporis fugiat soluta modi alias quos repellendus praesentium non cumque.',

      categories: [ProjectCategory.INFRASTRUCTURE],
      approvalStage: ApprovalStage.VOTE_APPROVED,
      socialX: 'www.myxaccount.com',
      otherInfo: 'sadas',
      creatorId: userId,
    },
    {
      title: 'soc',
      name: 'soc',
      website: 'www.mywebsite.com',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione molestiae quasi quae in accusamus quos modi aperiam fugit asperiores officiis facere ut maiores adipisci rerum itaque fugiat vitae pariatur ad explicabo, unde quaerat sint atque voluptatem. Labore, sunt aliquam? Possimus corporis fugiat soluta modi alias quos repellendus praesentium non cumque.',

      categories: [ProjectCategory.SOCIAL],
      approvalStage: ApprovalStage.VOTE_APPROVED,
      socialX: 'www.myxaccount.com',
      otherInfo: 'sadas',
      creatorId: userId,
    },
    {
      title: 'soc',
      name: 'soc',
      website: 'www.mywebsite.com',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione molestiae quasi quae in accusamus quos modi aperiam fugit asperiores officiis facere ut maiores adipisci rerum itaque fugiat vitae pariatur ad explicabo, unde quaerat sint atque voluptatem. Labore, sunt aliquam? Possimus corporis fugiat soluta modi alias quos repellendus praesentium non cumque.',

      categories: [ProjectCategory.SOCIAL],
      approvalStage: ApprovalStage.VOTE_APPROVED,
      socialX: 'www.myxaccount.com',
      otherInfo: 'sadas',
      creatorId: userId,
    },
    {
      title: 'soc',
      name: 'soc',
      website: 'www.mywebsite.com',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione molestiae quasi quae in accusamus quos modi aperiam fugit asperiores officiis facere ut maiores adipisci rerum itaque fugiat vitae pariatur ad explicabo, unde quaerat sint atque voluptatem. Labore, sunt aliquam? Possimus corporis fugiat soluta modi alias quos repellendus praesentium non cumque.',

      categories: [ProjectCategory.SOCIAL],
      approvalStage: ApprovalStage.VOTE_APPROVED,
      socialX: 'www.myxaccount.com',
      otherInfo: 'sadas',
      creatorId: userId,
    },
  ];

  for (const item of nominations) {
    const nomination = await prisma.nomination.create({ data: item });
    console.log('Created nomination', nomination.id);
  }
}

async function main() {
  await nominations();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })

  .catch(async (e) => {
    console.error(e);

    await prisma.$disconnect();

    process.exit(1);
  });
