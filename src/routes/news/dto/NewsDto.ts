export class NewsDto {
  constructor(news: any) {
    this.title = news.title.rendered;
    this.link = news.link;
    this.imageSrc = news.imageSrc;
  }

  readonly title;
  readonly link;
  readonly imageSrc;
}
