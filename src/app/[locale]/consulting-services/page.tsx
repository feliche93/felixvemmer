import deliverImage from '@/../public/pages/consulting-services/deliver.avif'
import discoverImage from '@/../public/pages/consulting-services/discover.jpeg'
import offerImage from '@/../public/pages/consulting-services/offer.avif'
import { Blockquote } from '@/components/ui/blockquote'
import { Container } from '@/components/ui/container'
import { FadeIn } from '@/components/ui/fade-in'
import { GridPattern } from '@/components/ui/grid-pattern'
import { List, ListItem } from '@/components/ui/list'
import { PageIntro } from '@/components/ui/page-intro'
import { Skills } from '@/components/ui/skills'
import { StylizedImage } from '@/components/ui/stylized-image'
import { useTranslations } from 'next-intl'
import { unstable_setRequestLocale } from 'next-intl/server'
import { locales } from '../../../../i18n'

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
              className="font-display font-semibold text-base before:text-muted-foreground before:content-['/'] after:text-foreground after:content-[counter(section,decimal-leading-zero)]"
              aria-hidden="true"
            />
            <h2 className="mt-2 font-display font-medium text-3xl text-foreground tracking-tight sm:text-4xl">
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
  const t = useTranslations('consultingServices.discover')
  return (
    <Section title={t('title')} image={{ src: discoverImage }}>
      <div className="space-y-6 text-base text-muted-foreground">
        {t.rich('description', {
          strong: (chunks) => <strong className="font-semibold text-foreground">{chunks}</strong>,
          p: (chunks) => <p>{chunks}</p>,
        })}
      </div>
      <Blockquote
        author={{ name: 'Julian Richter', role: 'Founder at DecentralizedFinance.com' }}
        className="mt-12"
      >
        {t('quote')}
      </Blockquote>
    </Section>
  )
}

function Offer() {
  const t = useTranslations('consultingServices.offer')
  return (
    <Section title={t('title')} image={{ src: offerImage }}>
      <div className="space-y-6 text-base text-muted-foreground">
        {t.rich('description', {
          strong: (chunks) => <strong className="font-semibold text-foreground">{chunks}</strong>,
          p: (chunks) => <p>{chunks}</p>,
        })}
      </div>
    </Section>
  )
}

function Deliver() {
  const t = useTranslations('consultingServices.deliver')

  return (
    <Section title="Deliver" image={{ src: deliverImage, shape: 2 }}>
      <div className="space-y-6 text-base text-muted-foreground">
        {t.rich('description', {
          strong: (chunks) => <strong className="font-semibold text-foreground">{chunks}</strong>,
          p: (chunks) => <p>{chunks}</p>,
        })}
      </div>

      <h3 className="mt-12 font-display font-semibold text-base text-foreground">
        Included in this phase
      </h3>
      <List className="mt-8">
        <ListItem title="Documentation">
          Comprehensive documentation is provided to ensure easy understanding, future maintenance
          of the application, and easy onboarding of other developers or team members.
        </ListItem>
        <ListItem title="Support">
          I am committed to providing ongoing support to ensure the smooth operation of your
          application.
        </ListItem>
      </List>
    </Section>
  )
}

function Values() {
  return (
    <div className="relative mt-24 pt-24 sm:mt-32 sm:pt-32 lg:mt-40 lg:pt-40">
      <div className="-z-10 absolute inset-x-0 top-0 h-[884px] overflow-hidden rounded-t-4xl bg-gradient-to-b from-neutral-50">
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

export async function generateStaticParams() {
  const params = locales.map((locale) => ({
    slug: 'blog',
    locale,
  }))

  return params
}

export default function Process({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale)
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
          solutions.
        </p>
      </PageIntro>

      <div className="mt-24 space-y-24 [counter-reset:section] sm:mt-32 sm:space-y-32 lg:mt-40 lg:space-y-40">
        <Discover />
        <Offer />
        <Deliver />
      </div>

      {/* <Values /> */}

      {/* <ContactSection /> */}
    </>
  )
}
