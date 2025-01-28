import { Request, Response } from 'express';
import { PaginationQueryDto } from '../../common/validation/query/PaginationQueryDto';
import { NewsDto } from '../../routes/news/dto/NewsDto';

const getNews = async (
  req: Request<{}, {}, {}, PaginationQueryDto>,
  res: Response,
) => {
  const { skip = 0, take = 2 } = req.query;

  const response = await fetch(
    `https://stoneblock.hr/wp-json/wp/v2/posts?per_page=${take}&offset=${skip}`,
  );
  const fullNews = await response.json();

  const newsPromises = fullNews.map(async (item: any) => {
    const mediaResponse = await fetch(item._links['wp:featuredmedia'][0].href);
    const mediaJson = await mediaResponse.json();
    const imageSrc = mediaJson.source_url;

    const newsItem = new NewsDto({ ...item, imageSrc });
    return newsItem;
  });

  const news = await Promise.all(newsPromises);

  return res.status(200).json(news);
};

export { getNews };
