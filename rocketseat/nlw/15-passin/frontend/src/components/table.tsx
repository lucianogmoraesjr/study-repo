import { ComponentProps } from 'react'
import { cn } from '../lib/utils'

interface TableProps extends ComponentProps<'table'> {}

function Table(props: TableProps) {
  return (
    <div className="border border-white/10 rounded-lg">
      <table {...props} className="w-full" />
    </div>
  )
}

interface TableHeaderProps extends ComponentProps<'th'> {}

function TableHeader(props: TableHeaderProps) {
  return (
    <th
      {...props}
      className={cn(
        'py-3 px-4 tex-sm font-semibold text-left',
        props.className,
      )}
    />
  )
}

interface TableRowProps extends ComponentProps<'tr'> {}

function TableRow(props: TableRowProps) {
  return <tr {...props} className="border-b border-white/10" />
}

interface TableCellProps extends ComponentProps<'td'> {}

function TableCell(props: TableCellProps) {
  return (
    <td
      {...props}
      className={cn('py-3 px-4 text-sm text-zinc-300', props.className)}
    />
  )
}

export { Table, TableCell, TableHeader, TableRow }
