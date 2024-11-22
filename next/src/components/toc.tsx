'use client'

import { SerializableTOC } from '@fumadocs/content-collections/configuration'
import * as Base from 'fumadocs-core/toc'
import { useActiveAnchor } from 'fumadocs-core/toc'
import { FC } from 'react'
import React from 'react'

export interface TOCProps {
  toc: SerializableTOC
  title: string
}

const TOCItem: FC<{ item: SerializableTOC[0] }> = ({ item }) => {
  const activeAnchor = useActiveAnchor()
  const isActive = item.url.replace('#', '') === activeAnchor

  return (
    <li>
      <Base.TOCItem
        href={item.url}
        className={`block py-1 text-sm ${
          isActive ? 'font-medium text-primary' : 'text-muted-foreground'
        } ${item.depth > 2 ? 'pl-4' : ''}`}
        data-active={isActive}
      >
        {item.title}
      </Base.TOCItem>
    </li>
  )
}

export const TOC: FC<TOCProps> = ({ toc, title }) => {
  const containerRef = React.useRef<HTMLElement>(null)

  return (
    <div className="space-y-2">
      <p className="font-medium">{title}</p>
      <Base.AnchorProvider toc={toc} single>
        <Base.ScrollProvider containerRef={containerRef}>
          <nav ref={containerRef} className="sticky top-16 max-h-[calc(100vh-4rem)] overflow-auto">
            <ul className="space-y-1">
              {toc.map((item) => (
                <TOCItem key={item.url} item={item} />
              ))}
            </ul>
          </nav>
        </Base.ScrollProvider>
      </Base.AnchorProvider>
    </div>
  )
}
