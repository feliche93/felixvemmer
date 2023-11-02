import { Blockquote } from '@/components/ui/blockquote'
import { Container } from '@/components/ui/container'

export default function ProcessPage() {
  return (
    <Container>
      <Blockquote author={{ name: 'Debra Fiscal', role: 'CEO of Unseal' }} className="mt-12">
        Studio were so regular with their progress updates we almost began to think they were
        automated!
      </Blockquote>
    </Container>
  )
}
