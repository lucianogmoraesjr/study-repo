import { Box, Stack, Text } from '@chakra-ui/react'
import { PaginationItem } from './PaginationItem'

interface PaginationProps {
  totalCountofRegisters: number
  registersPerPage?: number
  currentPage?: number
  onPageChange: (page: number) => void
}

const siblingsCount = 1

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((teste, index) => {
      return from + index + 1
    })
    .filter((page) => page > 0)
}

export function Pagination({
  totalCountofRegisters,
  currentPage = 1,
  registersPerPage = 10,
  onPageChange,
}: PaginationProps) {
  const lastPage = Math.ceil(totalCountofRegisters / registersPerPage)

  const previousPage =
    currentPage > 1
      ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
      : []

  const nextPages =
    currentPage < lastPage
      ? generatePagesArray(
          currentPage,
          Math.min(currentPage + siblingsCount, lastPage),
        )
      : []

  return (
    <Stack
      direction="row"
      mt="8"
      justify="space-between"
      align="center"
      spacing="6"
    >
      <Box>
        <strong>0</strong> - <strong>{registersPerPage}</strong> de{' '}
        <strong>{totalCountofRegisters}</strong>
      </Box>
      <Stack direction="row" spacing="2">
        {currentPage > 1 + siblingsCount && (
          <>
            <PaginationItem pageNumber={1} onPageChange={onPageChange} />
            {currentPage > 2 + siblingsCount && (
              <Text color="gray.300" width="8" textAlign="center">
                ...
              </Text>
            )}
          </>
        )}

        {previousPage.length > 0 &&
          previousPage.map((page) => (
            <PaginationItem
              key={page}
              pageNumber={page}
              onPageChange={onPageChange}
            />
          ))}

        <PaginationItem
          pageNumber={currentPage}
          isCurrent
          onPageChange={onPageChange}
        />

        {nextPages.length > 0 &&
          nextPages.map((page) => (
            <PaginationItem
              key={page}
              pageNumber={page}
              onPageChange={onPageChange}
            />
          ))}

        {currentPage + siblingsCount < lastPage && (
          <>
            {currentPage + 1 + siblingsCount < lastPage && (
              <Text color="gray.300" width="8" textAlign="center">
                ...
              </Text>
            )}
            <PaginationItem pageNumber={lastPage} onPageChange={onPageChange} />
          </>
        )}
      </Stack>
    </Stack>
  )
}
