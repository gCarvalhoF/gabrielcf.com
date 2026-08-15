import { config, fields, collection, singleton } from '@keystatic/core';

const postFields = (label: string) => ({
  title: fields.slug({ name: { label: 'Title' } }),
  description: fields.text({ label: 'Description', multiline: true }),
  publishDate: fields.date({ label: 'Publish date' }),
  updatedDate: fields.date({ label: 'Updated date', validation: { isRequired: false } }),
  tags: fields.array(fields.text({ label: 'Tag' }), {
    label: 'Tags',
    itemLabel: (props) => props.value || 'Tag',
  }),
  cover: fields.text({ label: 'Cover image path', validation: { isRequired: false } }),
  coverAlt: fields.text({ label: 'Cover image alt text', validation: { isRequired: false } }),
  draft: fields.checkbox({ label: 'Draft', defaultValue: false }),
  content: fields.markdoc({ label: 'Content' }),
});

const projectFields = () => ({
  name: fields.slug({ name: { label: 'Project name' } }),
  summary: fields.text({ label: 'One-line summary', multiline: true }),
  role: fields.text({ label: 'Role' }),
  stack: fields.array(fields.text({ label: 'Technology' }), {
    label: 'Tech stack',
    itemLabel: (props) => props.value || 'Item',
  }),
  repoUrl: fields.url({ label: 'Repo URL', validation: { isRequired: false } }),
  liveUrl: fields.url({ label: 'Live URL', validation: { isRequired: false } }),
  writeupUrl: fields.url({ label: 'Write-up URL', validation: { isRequired: false } }),
  startDate: fields.date({ label: 'Start date' }),
  endDate: fields.date({ label: 'End date', validation: { isRequired: false } }),
  featured: fields.checkbox({ label: 'Featured on homepage', defaultValue: false }),
  content: fields.markdoc({ label: 'Write-up' }),
});

export default config({
  storage: { kind: 'github', repo: 'gCarvalhoF/gabrielcf.com' },
  collections: {
    postsEn: collection({
      label: 'Posts (EN)',
      slugField: 'title',
      path: 'src/content/posts/en/*',
      format: { contentField: 'content' },
      schema: postFields('EN'),
    }),
    postsPt: collection({
      label: 'Posts (PT)',
      slugField: 'title',
      path: 'src/content/posts/pt/*',
      format: { contentField: 'content' },
      schema: postFields('PT'),
    }),
    projectsEn: collection({
      label: 'Projects (EN)',
      slugField: 'name',
      path: 'src/content/projects/en/*',
      format: { contentField: 'content' },
      schema: projectFields(),
    }),
    projectsPt: collection({
      label: 'Projects (PT)',
      slugField: 'name',
      path: 'src/content/projects/pt/*',
      format: { contentField: 'content' },
      schema: projectFields(),
    }),
  },
  singletons: {
    homeEn: singleton({
      label: 'Home (EN)',
      path: 'src/content/home/en',
      format: { contentField: 'bio' },
      schema: {
        headline: fields.text({ label: 'Headline' }),
        bio: fields.markdoc({ label: 'Bio' }),
      },
    }),
    homePt: singleton({
      label: 'Home (PT)',
      path: 'src/content/home/pt',
      format: { contentField: 'bio' },
      schema: {
        headline: fields.text({ label: 'Headline' }),
        bio: fields.markdoc({ label: 'Bio' }),
      },
    }),
    aboutEn: singleton({
      label: 'About (EN)',
      path: 'src/content/about/en',
      format: { contentField: 'body' },
      schema: {
        body: fields.markdoc({ label: 'Body' }),
      },
    }),
    aboutPt: singleton({
      label: 'About (PT)',
      path: 'src/content/about/pt',
      format: { contentField: 'body' },
      schema: {
        body: fields.markdoc({ label: 'Body' }),
      },
    }),
    contact: singleton({
      label: 'Contact',
      path: 'src/content/contact/index',
      schema: {
        email: fields.text({ label: 'Email' }),
        github: fields.url({ label: 'GitHub URL', validation: { isRequired: false } }),
        linkedin: fields.url({ label: 'LinkedIn URL', validation: { isRequired: false } }),
      },
    }),
  },
});
