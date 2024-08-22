import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
  Search,
} from 'lucide-react'
import { ChangeEvent, useEffect, useState } from 'react'
import { IconButton } from './icon-button'
import { Table, TableCell, TableHeader, TableRow } from './table'

dayjs.extend(relativeTime)
dayjs.locale('pt-br')

interface Attendee {
  id: string
  name: string
  email: string
  createdAt: string
  checkedInAt: string
}

export function AttendeesList() {
  const [attendees, setAttendees] = useState<Attendee[]>([])
  const [total, setTotal] = useState(0)

  const [search, setSearch] = useState(() => {
    const url = new URL(window.location.toString())

    if (url.searchParams.has('query')) {
      return url.searchParams.get('query') ?? ''
    }

    return ''
  })

  const [page, setPage] = useState(() => {
    const url = new URL(window.location.toString())

    if (url.searchParams.has('page')) {
      return Number(url.searchParams.get('page'))
    }

    return 1
  })

  useEffect(() => {
    const url = new URL(
      'http://localhost:3333/events/9e9bd979-9d10-4915-b339-3786b1634f33/attendees',
    )

    url.searchParams.set('pageIndex', String(page - 1))

    if (search.length > 0) {
      url.searchParams.set('query', search)
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setAttendees(data.attendees)
        setTotal(data.total)
      })
  }, [page, search])

  const totalPages = Math.ceil(total / 10)

  function setCurrentSearch(search: string) {
    const url = new URL(window.location.toString())

    url.searchParams.set('query', search)

    window.history.pushState({}, '', url)

    setSearch(search)
  }

  function setCurrentPage(page: number) {
    const url = new URL(window.location.toString())

    url.searchParams.set('page', String(page))

    window.history.pushState({}, '', url)

    setPage(page)
  }

  function handleFirstPage() {
    setCurrentPage(1)
  }

  function handlePreviousPage() {
    setCurrentPage(page - 1)
  }

  function handleNextPage() {
    setCurrentPage(page + 1)
  }

  function handleLastPage() {
    setCurrentPage(totalPages)
  }

  function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
    setCurrentSearch(event.target.value)
    setCurrentPage(1)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold">Participantes</h1>

        <div className="px-3 py-1.5 border border-white/10 rounded-lg text-sm w-64 flex items-center gap-3">
          <Search className="size-4 text-emerald-300" />
          <input
            className="bg-transparent flex-1 outline-none"
            placeholder="Buscar Participante..."
            value={search}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <Table>
        <thead>
          <TableRow>
            <TableHeader className="w-16">
              <input
                type="checkbox"
                className="form-checkbox size-4 bg-black/20 rounded border border-white/20 text-orange-400 focus:ring-0 focus:ring-offset-0"
              />
            </TableHeader>
            <TableHeader>Código</TableHeader>
            <TableHeader>Participante</TableHeader>
            <TableHeader>Data de inscrição</TableHeader>
            <TableHeader>Data do check-in</TableHeader>
            <TableHeader className="w-16"></TableHeader>
          </TableRow>
        </thead>

        <tbody>
          {attendees.map((attendee) => (
            <TableRow key={attendee.id}>
              <TableCell>
                <input
                  type="checkbox"
                  className="form-checkbox size-4 bg-black/20 rounded border border-white/20 text-orange-400 focus:ring-0 focus:ring-offset-0"
                />
              </TableCell>
              <TableCell>{attendee.id}</TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-white">
                    {attendee.name}
                  </span>
                  <span>{attendee.email}</span>
                </div>
              </TableCell>
              <TableCell>{dayjs(attendee.createdAt).fromNow()}</TableCell>
              <TableCell>{dayjs(attendee.checkedInAt).fromNow()}</TableCell>
              <TableCell>
                <IconButton>
                  <MoreHorizontal className="size-4" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </tbody>

        <tfoot>
          <TableRow>
            <TableCell colSpan={3}>
              Mostrando {attendees.length} de {total} itens
            </TableCell>
            <TableCell className="text-right" colSpan={3}>
              <div className="inline-flex items-center gap-8">
                <span>
                  Página {page} de {totalPages}
                </span>

                <div className="flex gap-1.5">
                  <IconButton
                    variant="secondary"
                    onClick={handleFirstPage}
                    disabled={page === 1}
                  >
                    <ChevronsLeft className="size-4" />
                  </IconButton>

                  <IconButton
                    variant="secondary"
                    onClick={handlePreviousPage}
                    disabled={page === 1}
                  >
                    <ChevronLeft className="size-4" />
                  </IconButton>

                  <IconButton
                    variant="secondary"
                    onClick={handleNextPage}
                    disabled={page === totalPages}
                  >
                    <ChevronRight className="size-4" />
                  </IconButton>

                  <IconButton
                    variant="secondary"
                    onClick={handleLastPage}
                    disabled={page === totalPages}
                  >
                    <ChevronsRight className="size-4" />
                  </IconButton>
                </div>
              </div>
            </TableCell>
          </TableRow>
        </tfoot>
      </Table>
    </div>
  )
}
