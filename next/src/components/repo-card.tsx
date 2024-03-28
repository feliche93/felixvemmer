import { nFormatter } from '@/lib/utils'
import { GitFork, Star } from 'lucide-react'
import { Icons } from './icons'
import { Card } from './ui/card'

export interface GithubRepoProps {
  url: string
}

export default async function RepoCard({ url }: GithubRepoProps) {
  const [orgName, repoName] = url.replace('https://github.com/', '').split('/')

  const response = await fetch(`https://api.github.com/repos/${orgName}/${repoName}`, {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch repository data')
  }

  let repoData

  try {
    repoData = await response.json()
  } catch (error) {
    console.error(error)
    return <pre>{JSON.stringify(error)}</pre>
  }

  if (!repoData) {
    return null
  }

  console.log({ repoData })

  const { description, stargazers_count: stars, forks } = repoData
  return (
    <Card className="max-w-4xl mx-auto">
      <a href={url} target="_blank" rel="noreferrer noopener" className="block p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-2xl font-normal">
              {orgName}/<span className="font-bold text-foreground">{repoName}</span>
            </p>
            <p className="text-muted-foreground font-normal text-sm mt-2">{description}</p>
          </div>
          <Icons.gitHub className="w-8 h-8 sm:w-10 sm:h-10" />
        </div>
        <div className="flex justify-between items-end">
          <div className="mt-4 flex items-center space-x-6">
            <div className="flex items-start space-x-2">
              <Star size={16} className="mt-1.5" />
              <div>
                <p className="text-foreground font-semibold">{nFormatter(stars)}</p>
                <p className="text-muted-foreground font-normal text-xs">Stars</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <GitFork size={16} className="mt-1.5" />
              <div>
                <p className="text-foreground font-semibold">{nFormatter(forks)}</p>
                <p className="text-muted-foreground font-normal text-xs">Forks</p>
              </div>
            </div>
          </div>
        </div>
      </a>
    </Card>
  )
}
