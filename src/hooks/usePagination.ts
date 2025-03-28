import { useMemo } from "react";

interface UsePaginationProps<T> {
  data: T[];
  currentPage: number;
  itemsPerPage: number;
}

interface UsePaginationReturn<T> {
  paginatedData: T[];
  totalPages: number;
  startIndex: number;
  endIndex: number;
}

export const usePagination = <T>({
  data,
  currentPage,
  itemsPerPage,
}: UsePaginationProps<T>): UsePaginationReturn<T> => {
  const totalPages = useMemo(
    () => Math.ceil(data.length / itemsPerPage),
    [data.length, itemsPerPage]
  );

  /* Ensure currentPage is within valid range. If currentPage is less than 1, set it to 1 */
  const validCurrentPage = useMemo(
    () => Math.max(1, Math.min(currentPage, totalPages || 1)),
    [currentPage, totalPages]
  );

  /* Calculate start index for slicing the data array */
  const startIndex = useMemo(
    () => (validCurrentPage - 1) * itemsPerPage,
    [validCurrentPage, itemsPerPage]
  );

  /* Calculate end index for slicing the data array */
  const endIndex = useMemo(
    () => startIndex + itemsPerPage,
    [startIndex, itemsPerPage]
  );

  /* Slice the data array to get the paginated data */
  /* The useMemo hook is used to optimize performance by memoizing the result of the slice operation */
  const paginatedData = useMemo(
    () => data.slice(startIndex, endIndex),
    [data, startIndex, endIndex]
  );

  return {
    paginatedData,
    totalPages,
    startIndex,
    endIndex,
  };
};
