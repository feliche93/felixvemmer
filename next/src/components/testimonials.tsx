import { cn } from '@/lib/utils'
import Link from 'next/link'
import { PropsWithChildren } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Card } from './ui/card'

const featuredTestimonial = {
  body: "Felix expertly guided our transition from Wordpress to Next.js, translating complex frontend concepts into clear terms. His detailed insights on SEO, from performance to meta tag nuances, were invaluable. He also advised on blog setup and CMS suitability for our needs, and efficiently assisted with integrations like Mailchimp. Felix's broad tech knowledge and business acumen make him an invaluable asset. I highly recommend him for his ability to merge technology and business insights to deliver real value.",
  author: {
    name: 'Perjan Duro',
    linkedinUrl: 'https://www.linkedin.com/in/perjanduro/',
    position: 'Co-Founder at MoneyCoach.ai',
    imageUrl:
      'https://media.licdn.com/dms/image/D4E03AQGsfdZxOg1R3Q/profile-displayphoto-shrink_800_800/0/1672657236253?e=1703116800&v=beta&t=GxWdD4-9wEZ1Hd53cvSbce7AqX7PzO_CTwwQh_Ravtk',
    logoUrl:
      'https://moneycoach.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmoneycoach-web-logo.ce5031e1.png&w=1920&q=75',
  },
}

const testimonialsData = [
  [
    [
      {
        body: "I collaborated with Felix on a project for DezentralizedFinance.com to create a scalable logo map SaaS tool. Felix was professional, timely, and efficient. He excelled in communication, adapting to my vision of integrating a prototype with Google Sheets. With his expertise, especially in image rendering with Vercel OG Image, he closely matched my expectations, needing only slight style adjustments. What stood out was Felix's understanding of my workflow and needs. The prototype's value for money is impressive, and I look forward to future projects with him. I highly recommend Felix for his exceptional work and client-focused approach, solidifying his freelancing reputation.",
        author: {
          name: 'Julian Richter',
          socialUrl: 'https://www.linkedin.com/in/richter-julian/',
          position: 'Founder at DezentralizedFinance.com',
          imageUrl:
            'https://media.licdn.com/dms/image/C4D03AQHROst7-gdgCA/profile-displayphoto-shrink_400_400/0/1580838009297?e=1703116800&v=beta&t=nYhYpmB_ENrt6zPP2P1CfHk4GtYLYWB-x3X8JZhuRHE',
        },
      },
    ],
    [
      {
        body: 'This is a good summary! I’m glad you enjoyed the book, and thanks for sharing your thoughts.',
        author: {
          name: 'Rob Walling',
          imageUrl:
            'https://m.media-amazon.com/images/S/amzn-author-media-prod/a2ivs540g924bgkqv9p5sjdm1v.jpg',
          socialUrl:
            'https://www.reddit.com/r/indiehackers/comments/15makjn/comment/jvg31jp/?utm_source=share&utm_medium=web2x&context=3',
          position: 'Author of the SaaS Playbook',
        },
      },
    ],
    [
      {
        body: 'This is an awesome blog post. Thanks!',
        author: {
          name: 'Michael Frieze',
          socialUrl:
            'https://www.reddit.com/r/nextjs/comments/174v2ua/comment/k4byz37/?utm_source=share&utm_medium=web2x&context=3/',
          position: '@u/michaelfrieze',
          imageUrl: undefined,
        },
      },
    ],
    [
      {
        body: 'As a recent bootcamp grad who is often overwhelmed by how much is out there and how the bar seems so much higher for a chance at employment, stuff like this is super helpful. Really appreciate it! It was nice to see some of my current frameworks included',
        author: {
          name: 'Due_Advisor925',
          socialUrl:
            'https://www.reddit.com/r/nextjs/comments/15fplwb/comment/jug0f4z/?utm_source=share&utm_medium=web2x&context=3',
          position: '@u/Due_Advisor925',
          imageUrl: undefined,
        },
      },

      // More testimonials...
    ],
    //     [
    //       {
    //         body: 'Aut reprehenderit voluptatem eum asperiores beatae id. Iure molestiae ipsam ut officia rem undefineda blanditiis.',
    //         author: {
    //           name: 'Lindsay Walton',
    //           handle: 'lindsaywalton',
    //           imageUrl:
    //             'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    //         },
    //       },
    //       // More testimonials...
    //     ],
    //   ],
    //   [
    //     [
    //       {
    //         body: 'Voluptas quos itaque ipsam in voluptatem est. Iste eos blanditiis repudiandae. Earum deserunt enim molestiae ipsum perferendis recusandae saepe corrupti.',
    //         author: {
    //           name: 'Tom Cook',
    //           handle: 'tomcook',
    //           imageUrl:
    //             'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    //         },
    //       },
    //       // More testimonials...
    //     ],
    //     [
    //       {
    //         body: 'Molestias ea earum quos nostrum doloremque sed. Quaerat quasi aut velit incidunt excepturi rerum voluptatem minus harum.',
    //         author: {
    //           name: 'Leonard Krasner',
    //           handle: 'leonardkrasner',
    //           imageUrl:
    //             'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    //         },
    //       },
    //       // More testimonials...
    //     ],
  ],
]

interface Testimonial extends PropsWithChildren {}

export default async function Testimonials({ children }: Testimonial) {
  return (
    <div className="relative isolate pb-16 pt-12 sm:pt-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {children}
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 grid-rows-1 gap-8 text-sm leading-6 text-gray-900 sm:mt-20 sm:grid-cols-2 xl:mx-0 xl:max-w-none xl:grid-flow-col xl:grid-cols-4">
          <Card className="rounded-2xl shadow-lg sm:col-span-2 xl:col-start-2 xl:row-end-1">
            <blockquote className="p-6 text-lg font-semibold leading-7 tracking-tight sm:p-12 sm:text-xl sm:leading-8">
              <p>{`“${featuredTestimonial.body}”`}</p>
            </blockquote>
            <figcaption className="flex flex-wrap items-center gap-x-4 gap-y-4 border-t px-6 py-4 sm:flex-nowrap">
              <Avatar>
                <AvatarImage
                  src={featuredTestimonial.author.imageUrl}
                  alt={featuredTestimonial.author.name}
                />
                <AvatarFallback>{featuredTestimonial.author.name.substring(0, 2)}</AvatarFallback>
              </Avatar>

              <Link
                target="_blank"
                className="flex-auto"
                href={featuredTestimonial.author.linkedinUrl}
              >
                <div className="flex-auto">
                  <div className="font-semibold">{featuredTestimonial.author.name}</div>
                  <div className="text-muted-foreground">{`${featuredTestimonial.author.position}`}</div>
                </div>
              </Link>

              <img
                className="h-10 w-auto flex-none"
                src={featuredTestimonial.author.logoUrl}
                alt=""
              />
            </figcaption>
          </Card>
          {testimonialsData.map((columnGroup, columnGroupIdx) => (
            <div key={columnGroupIdx} className="space-y-8 xl:contents xl:space-y-0">
              {columnGroup.map((column, columnIdx) => (
                <div
                  key={columnIdx}
                  className={cn(
                    (columnGroupIdx === 0 && columnIdx === 0) ||
                      (columnGroupIdx === testimonialsData.length - 1 &&
                        columnIdx === columnGroup.length - 1)
                      ? 'xl:row-span-2'
                      : 'xl:row-start-1',
                    'space-y-8',
                  )}
                >
                  {column.map((testimonial) => (
                    <Card key={testimonial.author.socialUrl} className="rounded-2xl p-6 shadow-lg">
                      <blockquote className="">
                        <p>{`“${testimonial.body}”`}</p>
                      </blockquote>
                      <figcaption className="mt-6 flex items-center gap-x-4">
                        <Avatar>
                          <AvatarImage
                            src={testimonial.author?.imageUrl}
                            alt={testimonial.author.name}
                          />
                          <AvatarFallback>{testimonial.author.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <Link href={testimonial.author.socialUrl}>
                          <div className="font-semibold">{testimonial.author.name}</div>
                          <div className="text-muted-foreground">{`${testimonial.author.position}`}</div>
                        </Link>
                      </figcaption>
                    </Card>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
