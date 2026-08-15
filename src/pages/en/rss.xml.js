import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = (await getCollection('posts', (e) => e.id.startsWith('en/') && !e.data.draft))
    .sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf());

  return rss({
    title: 'Gabriel Carvalho',
    description: 'Software engineer. I build and run infrastructure I own, end to end.',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishDate,
      link: `/en/blog/${post.id.replace('en/', '')}/`,
    })),
    customData: `<language>en-us</language>`,
  });
}
