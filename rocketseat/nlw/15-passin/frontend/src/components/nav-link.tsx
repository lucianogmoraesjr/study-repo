import { ComponentProps, PropsWithChildren } from 'react'

interface NavLinkProps extends PropsWithChildren<ComponentProps<'a'>> {}

export function NavLink({ children, ...props }: NavLinkProps) {
  return (
    <a className="font-medium text-sm text-zinc-300" {...props}>
      {children}
    </a>
  )
}
