import { ProjectCategory } from "@prisma/client";

export enum ContentTypes {
  ProjectAuditPost = "projectAuditPost",
  ProjectAuditPostSection = "projectAuditPostSection",
  News = "news",
}

export class ProjectAuditPostDto {
  constructor(entry: any) {
    const { fields } = entry;

    this.title = fields.title;
    this.description = fields.description;
    this.imageSrc = "https:" + fields.image.fields.file.url;
    this.slug = fields.slug;
    this.category = fields.category;
    this.isFeatured = fields.featured;
    this.sections = fields.sections.map(
      (section: any) => new ProjectAuditPostSectionDto(section),
    );
    this.conclusion = new ProjectAuditPostSectionDto(fields.conclusion);
    this.rating = fields.rating;
  }

  title: string;
  description: string;
  imageSrc: string;
  slug: string;
  category: ProjectCategory;
  isFeatured: boolean;
  sections: ProjectAuditPostSectionDto[];
  conclusion: ProjectAuditPostSectionDto;
  rating: number;
}

export class ProjectAuditPostSectionDto {
  constructor(entry: any) {
    const { fields } = entry;

    this.title = fields.title;
    this.description = fields.description;
    this.rating = fields.rating;
  }

  title: string;
  description: object;
  rating: number;
}

export class News {
  constructor(entry: any) {
    const { fields } = entry;

    this.title = fields.title;
    this.link = fields.link;
    this.imageSrc = "https:" + fields.image.fields.file.url;
  }

  title: string;
  link: string;
  imageSrc: string;
}
