import { defineCollection, defineConfig } from '@content-collections/core'
import { transformMDX } from '@fumadocs/content-collections/configuration'
import {
  rehypeCode,
  rehypeCodeDefaultOptions,
  remarkGfm,
  remarkHeading,
} from 'fumadocs-core/mdx-plugins'

const Post = defineCollection({
  name: 'Post',
  directory: 'content',
  include: ['**/blog/**/*.mdx'],
  schema: (z) => ({
    title: z.string(),
    description: z.string().optional(),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    keywords: z.array(z.string()).optional(),
    date: z.coerce.date(),
    published: z.coerce.boolean().default(false),
    featured: z.coerce.boolean().default(false),
    image: z.string(),
    authors: z.array(z.string()),
    categories: z.array(z.string()),
    postAccess: z
      .enum(['public', 'membersOnly', 'paidMembersOnly', 'specificTiers'])
      .default('public'),
  }),
  async transform(data, context) {
    const mdx = await transformMDX(data, context, {
      rehypePlugins: [[rehypeCode, { ...rehypeCodeDefaultOptions }]],
      remarkPlugins: [remarkGfm, remarkHeading],
    })

    const slug = data._meta.fileName.replace(/\.mdx$/, '')
    const slugAsParams = data._meta.path.split('/').slice(1).join('/')
    const locale = data._meta.path.split('/')[0]
    const absoluteUrl = `/${data._meta.path}`

    return {
      ...data,
      ...mdx,
      slug,
      slugAsParams,
      locale,
      absoluteUrl,
    }
  },
})

const Author = defineCollection({
  name: 'Author',
  directory: 'content/authors',
  include: '*.mdx',
  schema: (z) => ({
    title: z.string(),
    description: z.string().optional(),
    avatar: z.string(),
    twitter: z.string(),
  }),
  async transform(data, context) {
    const mdx = await transformMDX(data, context, {
      rehypePlugins: [[rehypeCode, { ...rehypeCodeDefaultOptions }]],
      remarkPlugins: [remarkGfm, remarkHeading],
    })

    const slug = data._meta.fileName.replace(/\.mdx$/, '')
    const slugAsParams = data._meta.path.split('/').slice(1).join('/')
    const locale = data._meta.path.split('/')[0]
    const absoluteUrl = `/${data._meta.path}`

    return {
      ...data,
      ...mdx,
      slug,
      slugAsParams,
      locale,
      absoluteUrl,
    }
  },
})

const Page = defineCollection({
  name: 'Page',
  directory: 'content',
  include: ['**/pages/**/*.mdx'],
  schema: (z) => ({
    title: z.string(),
    description: z.string().optional(),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    keywords: z.array(z.string()).optional(),
    date: z.coerce.date(),
    published: z.boolean().default(true),
    featured: z.boolean().default(false),
    image: z.string().optional(),
  }),
  async transform(data, context) {
    const mdx = await transformMDX(data, context, {
      rehypePlugins: [[rehypeCode, { ...rehypeCodeDefaultOptions }]],
      remarkPlugins: [remarkGfm, remarkHeading],
    })

    const slug = data._meta.fileName.replace(/\.mdx$/, '')
    const slugAsParams = data._meta.path.split('/').slice(1).join('/')
    const locale = data._meta.path.split('/')[0]
    const absoluteUrl = `/${data._meta.path}`

    return {
      ...data,
      ...mdx,
      slug,
      slugAsParams,
      locale,
      absoluteUrl,
    }
  },
})

export default defineConfig({
  collections: [Post, Author, Page],
})
