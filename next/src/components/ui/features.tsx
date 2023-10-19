import { FC } from 'react'

export interface FeatureGridProps {}
export const FeatureGrid: FC<FeatureGridProps> = () => {
  const features = [
    {
      title: 'Fullstack & Web3 Development',
      description:
        'Build and ship the next modern frontend application to power your individual idea.',
      languages: ['Solidity', 'Typescript', 'CSS', 'HTML'],
      tools: [
        'Next.js / Next13',
        'Tailwind CSS',
        'Tanstack',
        'React Hook Form',
        'Wagmi.sh',
        'ThirdWeb',
        'Alchemy',
      ],
    },
    {
      title: 'Data & AI Services',
      description:
        'Derive better insights and build new data products with a scalable data warehouse and custom data pipelines.',
      languages: ['Python', 'SQL'],
      tools: ['DBT', 'Pandas', 'Langchain', 'Modal', 'Superset', 'Airbyte', 'Great Expectations'],
    },
    {
      title: 'Business & Marketing',
      description:
        'Learn how to how to optimize your current business or get feedback on a complete new business idea.',
      experiences: ['SEO & SEA', 'Agile Sprints', 'BizDev'],
      tools: [
        'Ahrefs',
        'Google Search Console',
        'Google Tag Manager',
        'Business Model Canvas',
        'Notion',
      ],
    },
  ]

  return (
    <div className="relative pt-16 sm:pt-24 lg:pt-32">
      <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
        {/* <Header>
          <Header.Section>Features</Header.Section>
          <Header.Title>Everything you need to succeed</Header.Title>
        </Header> */}
        <p className="mx-auto mt-5 max-w-prose text-xl text-base-content/80">"Test"</p>
        <div className="mt-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-1 lg:grid-cols-3">
            {features.map((feature: any, index: number) => (
              <div key={index} className="pt-6">
                <div className="flow-root h-full rounded-lg bg-base-100 px-6 pb-8 shadow">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center rounded-md bg-primary p-3 shadow-lg">
                        <feature.icon color="text-white" size={6} />
                        {/* <skill.icon className="h-6 w-6 text-primary-content" aria-hidden="true" /> */}
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium tracking-tight">{feature.title}</h3>
                    {/* <div
                      className="prose-base-content/80 prose mt-5 prose-ul:p-0 prose-li:list-none prose-li:text-sm"
                      dangerouslySetInnerHTML={{ __html: feature.description }}
                    /> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
