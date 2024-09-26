declare module "@tryghost/content-api" {
  interface Post {
    id: string;
    slug: string;
    title: string;
    html: string;
    feature_image: string;
    excerpt: string;
    published_at: string;
    primary_author: {
      name: string;
      profile_image: string;
    };
  }

  interface Settings {
    title: string;
    description: string;
    logo: string;
    cover_image: string;
  }

  class GhostContentAPI {
    constructor(options: { url: string; key: string; version: string });

    posts: {
      browse(options?: { limit?: string | number }): Promise<Post[]>;
      read(options: { slug: string }): Promise<Post>;
    };

    settings: {
      browse(): Promise<Settings>;
    };
  }

  export default function GhostContentAPI(options: {
    url: string;
    key: string;
    version: string;
  }): GhostContentAPI;
}
