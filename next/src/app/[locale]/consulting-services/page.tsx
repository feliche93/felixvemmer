import imageLaptop from '@/../public/images/laptop.jpg'
import imageMeeting from '@/../public/images/meeting.jpg'
import imageWhiteboard from '@/../public/images/whiteboard.jpg'
import { Blockquote } from '@/components/ui/blockquote'
import { Container } from '@/components/ui/container'
import { FadeIn } from '@/components/ui/fade-in'
import { GridPattern } from '@/components/ui/grid-pattern'
import { List, ListItem } from '@/components/ui/list'
import { PageIntro } from '@/components/ui/page-intro'
import { Skills } from '@/components/ui/skills'
import { StylizedImage } from '@/components/ui/stylized-image'
import { useTranslations } from 'next-intl'

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
    <Section title="Discovery Call" image={{ src: imageWhiteboard }}>
      <div className="space-y-4 text-base text-muted-foreground">
        <p>
          Transforming your business ideas into digital success is what I do best. My
          <strong className="font-semibold text-foreground">
            {' '}
            CEMS Master's in International Management{' '}
          </strong>
          and deep technical knowledge enable me to turn complex challenges into
          <strong className="font-semibold text-foreground"> effective tech solutions</strong>. I'm
          committed to
          <strong className="font-semibold text-foreground"> clear communication</strong>, ensuring
          your goals are achieved with custom solutions tailored for your business.
        </p>

        <p>
          Our discovery call will be a session of
          <strong className="font-semibold text-foreground"> honest feedback </strong> and
          <strong className="font-semibold text-foreground"> actionable insights</strong>. With a
          lean MVP approach, I prioritize a fast and focused launch, attuned to your customers'
          needs and your project's unique requirements.
        </p>

        <p>
          Transparency is a given with me. If a project stretches beyond my expertise, I'll be
          upfront about it. But with my robust knowledge of the
          <strong className="font-semibold text-foreground"> React and Python </strong> ecosystems,
          I'm ready to craft a
          <strong className="font-semibold text-foreground">
            {' '}
            comprehensive full-stack strategy{' '}
          </strong>{' '}
          for your project's success.
        </p>
      </div>

      <Blockquote
        author={{ name: 'Julian Richter', role: 'Founder at DecentralizedFinance.com' }}
        className="mt-12"
      >
        I collaborated with Felix on a project for DezentralizedFinance.com to create a scalable
        logo map SaaS tool. Felix was professional, timely, and efficient. He excelled in
        communication, adapting to my vision of integrating a prototype with Google Sheets. What
        stood out was Felix's understanding of my workflow and needs.
      </Blockquote>

      {/* <h3 className="mt-12 font-display text-base font-semibold text-foreground">
        Included in this phase
      </h3>
      <TagList className="mt-4">
        <TagListItem>In-depth questionnaires</TagListItem>
        <TagListItem>Feasibility studies</TagListItem>
        <TagListItem>Proofs-of-concept</TagListItem>
      </TagList> */}
    </Section>
  )
}

function Offer() {
  return (
    <Section title="Offer" image={{ src: imageLaptop, shape: 1 }}>
      <div className="space-y-6 text-base text-muted-foreground">
        <p>
          Post-discovery, you'll receive a{' '}
          <strong className="font-semibold text-foreground">tailored proposal</strong>, complete
          with{' '}
          <strong className="font-semibold text-foreground">
            minimum and maximum pricing brackets
          </strong>
          . This gives you a{' '}
          <strong className="font-semibold text-foreground">
            transparent view of potential costs
          </strong>
          , ensuring no surprises down the line.
        </p>
        <p>
          Understanding that every project is unique, I offer the{' '}
          <strong className="font-semibold text-foreground">flexibility to adjust the scope</strong>{' '}
          to meet your financial and project requirements. We can work together to align the
          project's needs with your budget, crafting a solution that's{' '}
          <strong className="font-semibold text-foreground">right for you</strong>.
        </p>
        <p>
          My aim is to deliver{' '}
          <strong className="font-semibold text-foreground">exceptional value</strong>, balancing
          quality and cost. By{' '}
          <strong className="font-semibold text-foreground">refining the project scope</strong>, we
          can find a sweet spot that{' '}
          <strong className="font-semibold text-foreground">maximizes your investment</strong> and
          brings your vision to life without compromise.
        </p>
      </div>

      {/* <h3 className="mt-12 font-display text-base font-semibold text-foreground">
        Included in this phase
      </h3>
      <TagList className="mt-4">
        <TagListItem>In-depth questionnaires</TagListItem>
        <TagListItem>Feasibility studies</TagListItem>
        <TagListItem>Proofs-of-concept</TagListItem>
      </TagList> */}
    </Section>
  )
}

function Deliver() {
  return (
    <Section title="Deliver" image={{ src: imageMeeting, shape: 2 }}>
      <div className="space-y-6 text-base text-muted-foreground">
        <p>
          I ensure the solution sticks to the agreed proposal, focusing on essential features to
          prevent <strong className="font-semibold text-foreground">feature bloat</strong>. However,
          I stay adaptable to refine the project scope as your needs evolve, keeping things{' '}
          <strong className="font-semibold text-foreground">simple and efficient</strong>.
        </p>

        <p>
          Delivery speed is championed through modern cloud providers like Vercel and Modal.com,
          which support{' '}
          <strong className="font-semibold text-foreground">
            rapid scaling and robust deployment
          </strong>{' '}
          of web applications.
        </p>
        <p>
          By leveraging full-stack frameworks like Next.js, combined with clean, well-documented
          code and robust testing, I deliver products that are not just quickly brought to market,
          but also{' '}
          <strong className="font-semibold text-foreground">maintainable and scalable</strong>. My
          commitment to code quality involves using TypeScript/Python type hints, which enhances
          readability and future-proofs your application, making it ready for whatever changes lie
          ahead.
        </p>
      </div>

      <h3 className="mt-12 font-display text-base font-semibold text-foreground">
        Included in this phase
      </h3>
      <List className="mt-8">
        <ListItem title="Documentation">
          Comprehensive documentation is provided to ensure easy understanding and future
          maintenance of the application.
        </ListItem>
        <ListItem title="Support">
          We provide ongoing support to ensure the smooth operation of your application. As we have
          access to the API keys for all critical services your business uses, you can rely on us
          for continuous assistance.
        </ListItem>
      </List>
    </Section>
  )
}

function Values() {
  return (
    <div className="relative mt-24 pt-24 sm:mt-32 sm:pt-32 lg:mt-40 lg:pt-40">
      <div className="absolute inset-x-0 top-0 -z-10 h-[884px] overflow-hidden rounded-t-4xl bg-gradient-to-b from-neutral-50">
        <GridPattern
          className="absolute inset-0 h-full w-full fill-neutral-100 stroke-foreground/5 [mask-image:linear-gradient(to_bottom_left,white_40%,transparent_50%)]"
          yOffset={-270}
        />
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

export default function Process({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations('index')

  return (
    <>
      <PageIntro
        className="mt-24 sm:mt-32 lg:mt-40"
        centered
        title={t('skills.title')}
        eyebrow={t('skills.section')}
      >
        {t('skills.description')}
      </PageIntro>

      <Skills locale={locale} />

      <PageIntro
        centered
        eyebrow="Process Overview"
        title="Transforming Ideas into Digital Success"
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
          I follow a three-step process: Discover, Offer, and Deliver. This approach ensures a deep
          understanding of your needs, a transparent proposal, and the delivery of scalable
          solutions using React and Python.
        </p>
      </PageIntro>

      <div className="mt-24 space-y-24 [counter-reset:section] sm:mt-32 sm:space-y-32 lg:mt-40 lg:space-y-40">
        <Discover />
        <Offer />
        <Deliver />
      </div>

      <Values />

      {/* <ContactSection /> */}
    </>
  )
}
