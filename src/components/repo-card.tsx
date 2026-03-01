import { GitFork, Star } from "lucide-react"
import { nFormatter } from "@/lib/utils"
import { env } from "@/server"
import { Icons } from "./icons"
import { Card } from "./ui/card"

export interface GithubRepoProps {
  url: string
}

interface GithubRepoResponse {
  description?: string | null
  stargazers_count?: number
  forks?: number
}

export default async function RepoCard({ url }: GithubRepoProps) {
  const [orgName, repoName] = url.replace("https://github.com/", "").split("/")

  const response = await fetch(`https://api.github.com/repos/${orgName}/${repoName}`, {
    headers: {
      Authorization: `Bearer ${env.GITHUB_TOKEN}`,
    },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch repository data")
  }

  let repoData: GithubRepoResponse | null = null

  try {
    repoData = (await response.json()) as GithubRepoResponse
  } catch (error) {
    console.error(error)
    return <pre>{JSON.stringify(error)}</pre>
  }

  if (!repoData) {
    return null
  }

  console.log({ repoData })

  const { description = "", stargazers_count: stars = 0, forks = 0 } = repoData
  return (
    <Card className="mx-auto max-w-4xl">
      <a href={url} target="_blank" rel="noreferrer noopener" className="block p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-normal text-2xl">
              {orgName}/<span className="font-bold text-foreground">{repoName}</span>
            </p>
            <p className="mt-2 font-normal text-muted-foreground text-sm">{description}</p>
          </div>
          <Icons.gitHub className="h-8 w-8 sm:h-10 sm:w-10" />
        </div>
        <div className="flex items-end justify-between">
          <div className="mt-4 flex items-center space-x-6">
            <div className="flex items-start space-x-2">
              <Star size={16} className="mt-1.5" />
              <div>
                <p className="font-semibold text-foreground">{nFormatter(stars)}</p>
                <p className="font-normal text-muted-foreground text-xs">Stars</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <GitFork size={16} className="mt-1.5" />
              <div>
                <p className="font-semibold text-foreground">{nFormatter(forks)}</p>
                <p className="font-normal text-muted-foreground text-xs">Forks</p>
              </div>
            </div>
          </div>
        </div>
      </a>
    </Card>
  )
}
