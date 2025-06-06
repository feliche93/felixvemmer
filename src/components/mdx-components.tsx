import { ProductCard } from '@/components/amazon-product-card'
import { CalCom } from '@/components/cal-com'
import { Callout } from '@/components/callout'
import { Icons } from '@/components/icons'
import { Iframe } from '@/components/iframe'
import { LinkButton } from '@/components/link-button'
import { MdxCard } from '@/components/mdx-card'
import { RelatedPostCard } from '@/components/related-post-card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { YouTubeEmbed } from '@/components/youtube-embed'
import { cn } from '@/lib/utils'
import { MDXContent } from '@content-collections/mdx/react'
import { Banner } from 'fumadocs-ui/components/banner'
import { CodeBlock, Pre } from 'fumadocs-ui/components/codeblock'
import { File, Files, Folder } from 'fumadocs-ui/components/files'
import { ImageZoom } from 'fumadocs-ui/components/image-zoom'
import { Step, Steps } from 'fumadocs-ui/components/steps'
import { Tab, Tabs } from 'fumadocs-ui/components/tabs'
import defaultMdxComponents from 'fumadocs-ui/mdx'
import NextImage, { type ImageProps } from 'next/image'
import Link from 'next/link'
import type * as React from 'react'
import { Suspense } from 'react'
import { Tweet } from 'react-tweet'
import { ProtectedContent } from './protected-content'

const components = {
  ...defaultMdxComponents,
  Step,
  Steps,
  ImageZoom,
  File,
  Folder,
  Files,
  Tab,
  Tabs,
  CalCom,
  Card: MdxCard,
  RelatedPostCard,
  ProductCard,
  LinkButton,
  Tweet,
  YouTubeEmbed,
  Iframe,
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Alert,
  AlertTitle,
  AlertDescription,
  Banner,
  Icons,
  a: ({ className, ...props }: React.HTMLAttributes<HTMLAnchorElement>) => (
    <a className={cn('font-medium underline underline-offset-4', className)} {...props} />
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className={cn('leading-7 [&:not(:first-child)]:mt-6', className)} {...props} />
  ),
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className={cn('my-6 ml-6 list-disc', className)} {...props} />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className={cn('my-6 ml-6 list-decimal', className)} {...props} />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <li className={cn('mt-2', className)} {...props} />
  ),
  blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <blockquote className={cn('mt-6 border-l-2 pl-6 italic', className)} {...props} />
  ),
  img: ({ className, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // biome-ignore lint/a11y/useAltText: <explanation>
    <img className={cn('rounded-md', className)} alt={alt} {...props} />
  ),
  hr: ({ ...props }: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className="my-4 md:my-8" {...props} />
  ),
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className={cn('w-full', className)} {...props} />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className={cn('m-0 border-t p-0 even:bg-muted', className)} {...props} />
  ),
  th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className={cn(
        'border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right',
        className,
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className={cn(
        'border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right',
        className,
      )}
      {...props}
    />
  ),
  pre: ({ title, ...props }: React.HTMLAttributes<HTMLPreElement> & { title?: string }) => (
    <CodeBlock title={title}>
      <Pre {...props} />
    </CodeBlock>
  ),
  Image: (props: ImageProps) => <NextImage {...props} />,
  Callout,
  Link: ({ className, ...props }: React.ComponentProps<typeof Link>) => (
    <Link className={cn('font-medium underline underline-offset-4', className)} {...props} />
  ),
  LinkedCard: ({ className, ...props }: React.ComponentProps<typeof Link>) => (
    <Link
      className={cn(
        'flex w-full flex-col items-center rounded-xl border bg-card p-6 text-card-foreground shadow transition-colors hover:bg-muted/50 sm:p-10',
        className,
      )}
      {...props}
    />
  ),
  ProtectedContent: ({ ...props }: React.ComponentProps<typeof ProtectedContent>) => (
    <Suspense fallback={null}>
      <ProtectedContent {...props} />
    </Suspense>
  ),
}

interface MdxProps {
  code: string
}

export function Mdx({ code }: MdxProps) {
  return (
    <>
      <div className="mdx">
        {/* TODO: Fix TS error with Icons */}
        {/* @ts-ignore */}
        <MDXContent code={code} components={components} />
      </div>
    </>
  )
}
