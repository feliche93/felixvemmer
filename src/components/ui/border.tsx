import clsx from 'clsx'

type BorderProps<T extends React.ElementType> = {
  as?: T
  className?: string
  position?: 'top' | 'left'
  invert?: boolean
}

export function Border<T extends React.ElementType = 'div'>({
  as,
  className,
  position = 'top',
  invert = false,
  ...props
}: Omit<React.ComponentPropsWithoutRef<T>, keyof BorderProps<T>> & BorderProps<T>) {
  const Component = as ?? 'div'

  return (
    <Component
      className={clsx(
        className,
        'relative before:absolute after:absolute',
        invert
          ? 'before:bg-background after:bg-background/10'
          : 'before:bg-foreground after:bg-foreground/10',
        position === 'top' &&
          'before:top-0 before:left-0 before:h-px before:w-6 after:top-0 after:right-0 after:left-8 after:h-px',
        position === 'left' &&
          'before:top-0 before:left-0 before:h-6 before:w-px after:top-8 after:bottom-0 after:left-0 after:w-px',
      )}
      {...props}
    />
  )
}
