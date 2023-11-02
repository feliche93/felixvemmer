import { type Metadata } from 'next'

import imageLaptop from '@/../public/images/laptop.jpg'
import imageMeeting from '@/../public/images/meeting.jpg'
import imageWhiteboard from '@/../public/images/whiteboard.jpg'
import { Blockquote } from '@/components/ui/blockquote'
import { Container } from '@/components/ui/container'
import { FadeIn } from '@/components/ui/fade-in'
import { List, ListItem } from '@/components/ui/list'
import { StylizedImage } from '@/components/ui/stylized-image'
import { TagList, TagListItem } from '@/components/ui/tag-list'

function Section({
  title,
  image,
  children,
}: {
  title: string
  image: React.ComponentPropsWithoutRef<typeof StylizedImage>
  children: React.ReactNode
}) {
  return (
    <Container className="group/section [counter-increment:section]">
      <div className="lg:flex lg:items-center lg:justify-end lg:gap-x-8 lg:group-even/section:justify-start xl:gap-x-20">
        <div className="flex justify-center">
          <FadeIn className="w-[33.75rem] flex-none lg:w-[45rem]">
            <StylizedImage
              {...image}
              sizes="(min-width: 1024px) 41rem, 31rem"
              className="justify-center lg:justify-end lg:group-even/section:justify-start"
            />
          </FadeIn>
        </div>
        <div className="mt-12 lg:mt-0 lg:w-[37rem] lg:flex-none lg:group-even/section:order-first">
          <FadeIn>
            <div
              className="font-display text-base font-semibold before:text-muted-foreground before:content-['/_'] after:text-foreground after:content-[counter(section,decimal-leading-zero)]"
              aria-hidden="true"
            />
            <h2 className="mt-2 font-display text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
              {title}
            </h2>
            <div className="mt-6">{children}</div>
          </FadeIn>
        </div>
      </div>
    </Container>
  )
}

function Discover() {
  return (
    <Section title="Discover" image={{ src: imageWhiteboard }}>
      <div className="space-y-6 text-base text-muted-foreground">
        <p>
          We work closely with our clients to understand their{' '}
          <strong className="font-semibold text-foreground">needs</strong> and goals, embedding
          ourselves in their every day operations to understand what makes their business tick.
        </p>
        <p>
          Our team of private investigators shadow the company director’s for several weeks while
          our account managers focus on going through their trash. Our senior security experts then
          perform social engineering hacks to gain access to their{' '}
          <strong className="font-semibold text-foreground">business</strong> accounts — handing
          that information over to our forensic accounting team.
        </p>
        <p>
          Once the full audit is complete, we report back with a comprehensive{' '}
          <strong className="font-semibold text-foreground">plan</strong> and, more importantly, a
          budget.
        </p>
      </div>

      <h3 className="mt-12 font-display text-base font-semibold text-foreground">
        Included in this phase
      </h3>
      <TagList className="mt-4">
        <TagListItem>In-depth questionnaires</TagListItem>
        <TagListItem>Feasibility studies</TagListItem>
        <TagListItem>Blood samples</TagListItem>
        <TagListItem>Employee surveys</TagListItem>
        <TagListItem>Proofs-of-concept</TagListItem>
        <TagListItem>Forensic audit</TagListItem>
      </TagList>
    </Section>
  )
}

function Build() {
  return (
    <Section title="Build" image={{ src: imageLaptop, shape: 1 }}>
      <div className="space-y-6 text-base text-muted-foreground">
        <p>
          Based off of the discovery phase, we develop a comprehensive roadmap for each product and
          start working towards delivery. The roadmap is an intricately tangled mess of technical
          nonsense designed to drag the project out as long as possible.
        </p>
        <p>
          Each client is assigned a key account manager to keep lines of communication open and
          obscure the actual progress of the project. They act as a buffer between the client’s
          incessant nagging and the development team who are hard at work scouring open source
          projects for code to re-purpose.
        </p>
        <p>
          Our account managers are trained to only reply to client emails after 9pm, several days
          after the initial email. This reinforces the general aura that we are very busy and
          dissuades clients from asking for changes.
        </p>
      </div>

      <Blockquote author={{ name: 'Debra Fiscal', role: 'CEO of Unseal' }} className="mt-12">
        Studio were so regular with their progress updates we almost began to think they were
        automated!
      </Blockquote>
    </Section>
  )
}

function Deliver() {
  return (
    <Section title="Deliver" image={{ src: imageMeeting, shape: 2 }}>
      <div className="space-y-6 text-base text-muted-foreground">
        <p>
          About halfway through the Build phase, we push each project out by 6 weeks due to a change
          in <strong className="font-semibold text-foreground">requirements</strong>. This allows us
          to increase the budget a final time before launch.
        </p>
        <p>
          Despite largely using pre-built components, most of the{' '}
          <strong className="font-semibold text-foreground">progress</strong> on each project takes
          place in the final 24 hours. The development time allocated to each client is actually
          spent making augmented reality demos that go viral on Twitter.
        </p>
        <p>
          We ensure that the main pages of the site are{' '}
          <strong className="font-semibold text-foreground">fully functional</strong> at launch —
          the auxiliary pages will, of course, be lorem ipusm shells which get updated as part of
          our exorbitant <strong className="font-semibold text-foreground">maintenance</strong>{' '}
          retainer.
        </p>
      </div>

      <h3 className="mt-12 font-display text-base font-semibold text-foreground">
        Included in this phase
      </h3>
      <List className="mt-8">
        <ListItem title="Testing">
          Our projects always have 100% test coverage, which would be impressive if our tests
          weren’t as porous as a sieve.
        </ListItem>
        <ListItem title="Infrastructure">
          To ensure reliability we only use the best Digital Ocean droplets that $4 a month can buy.
        </ListItem>
        <ListItem title="Support">
          Because we hold the API keys for every critical service your business uses, you can expect
          a lifetime of support, and invoices, from us.
        </ListItem>
      </List>
    </Section>
  )
}

function Values() {
  return (
    <div className="relative mt-24 pt-24 sm:mt-32 sm:pt-32 lg:mt-40 lg:pt-40">
      <div className="absolute inset-x-0 top-0 -z-10 h-[884px] overflow-hidden rounded-t-4xl bg-gradient-to-b from-neutral-50">
        {/* <GridPattern
          className="absolute inset-0 h-full w-full fill-neutral-100 stroke-foreground/5 [mask-image:linear-gradient(to_bottom_left,white_40%,transparent_50%)]"
          yOffset={-270}
        /> */}
      </div>
      {/* 
      <SectionIntro eyebrow="Our values" title="Balancing reliability and innovation">
        <p>
          We strive to stay at the forefront of emerging trends and technologies, while completely
          ignoring them and forking that old Rails project we feel comfortable using. We stand by
          our core values to justify that decision.
        </p>
      </SectionIntro> */}

      {/* <Container className="mt-24">
        <GridList>
          <GridListItem title="Meticulous">
            The first part of any partnership is getting our designer to put your logo in our
            template. The second step is getting them to do the colors.
          </GridListItem>
          <GridListItem title="Efficient">
            We pride ourselves on never missing a deadline which is easy because most of the work
            was done years ago.
          </GridListItem>
          <GridListItem title="Adaptable">
            Every business has unique needs and our greatest challenge is shoe-horning those needs
            into something we already built.
          </GridListItem>
          <GridListItem title="Honest">
            We are transparent about all of our processes, banking on the simple fact our clients
            never actually read anything.
          </GridListItem>
          <GridListItem title="Loyal">
            We foster long-term relationships with our clients that go beyond just delivering a
            product, allowing us to invoice them for decades.
          </GridListItem>
          <GridListItem title="Innovative">
            The technological landscape is always evolving and so are we. We are constantly on the
            lookout for new open source projects to clone.
          </GridListItem>
        </GridList>
      </Container> */}
    </div>
  )
}

export const metadata: Metadata = {
  title: 'Our Process',
  description:
    'We believe in efficiency and maximizing our resources to provide the best value to our clients.',
}

export default function Process() {
  return (
    <>
      {/* <PageIntro eyebrow="Our process" title="How we work">
        <p>
          We believe in efficiency and maximizing our resources to provide the best value to our
          clients. The primary way we do that is by re-using the same five projects we’ve been
          developing for the past decade.
        </p>
      </PageIntro> */}

      <div className="mt-24 space-y-24 [counter-reset:section] sm:mt-32 sm:space-y-32 lg:mt-40 lg:space-y-40">
        <Discover />
        <Build />
        <Deliver />
      </div>

      <Values />

      {/* <ContactSection /> */}
    </>
  )
}
