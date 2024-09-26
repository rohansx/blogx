import GhostContentAPI from "@tryghost/content-api";
import { Post } from "@/interfaces/post";

// Create Ghost API instance (function call, not new)
const api = GhostContentAPI({
  url: process.env.CMS_GHOST_API_URL as string,
  key: process.env.CMS_GHOST_API_KEY as string,
  version: "v3",
});

// Fetch all posts
export async function getAllPosts(): Promise<Post[]> {
  const posts = await api.posts.browse({ limit: "all" }).catch((err) => {
    console.error(err);
    return [];
  });

  return posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    date: post.published_at || "",
    coverImage: post.feature_image || "",
    author: {
      name: post.primary_author?.name || "",
      picture: post.primary_author?.profile_image || "",
    },
    excerpt: post.excerpt || "",
    ogImage: { url: post.feature_image || "" },
    content: post.html || "",
    preview: false,
  }));
}

// Fetch a post by slug
export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const post = await api.posts
    .read({ slug })
    .catch((err) => console.error(err));

  if (!post) {
    return undefined;
  }

  return {
    slug: post.slug,
    title: post.title,
    date: post.published_at || "",
    coverImage: post.feature_image || "",
    author: {
      name: post.primary_author?.name || "",
      picture: post.primary_author?.profile_image || "",
    },
    excerpt: post.excerpt || "",
    ogImage: { url: post.feature_image || "" },
    content: post.html || "",
    preview: false,
  };
}
