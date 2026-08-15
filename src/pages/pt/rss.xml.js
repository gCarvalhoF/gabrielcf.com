import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = (await getCollection('posts', (e) => e.id.startsWith('pt/') && !e.data.draft))
    .sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf());

  return rss({
    title: 'Gabriel Carvalho',
    description: 'Engenheiro de software. Construo e opero a infraestrutura que uso, de ponta a ponta.',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishDate,
      link: `/pt/blog/${post.id.replace('pt/', '')}/`,
    })),
    customData: `<language>pt-br</language>`,
  });
}
