import { useEffect, useState, useRef } from "react";

type props = {
  page_size: number;
  endpoint: string;
};

function UsePagination({ page_size, endpoint }: props) {
  const isMountedRef = useRef(true);

  const [page, setPage] = useState<number>(1);
  const [rows, setRows] = useState<any[]>([]);
  const [totalRecords, setTotalrecords] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const MAX_VISIBLE_PAGES = 3;

  const handleFirstPage = () => {
    setPage(1);
  };

  const handleLastPage = () => {
    setPage(totalPages);
  };

  const handleNextPage = () => {
    if (page < totalRecords / page_size) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };
  const handlePage = (value: number) => {
    if (value > 0 && value <= totalPages) {
      setPage(value);
    }
  };

  const handlePageNumbers = () => {
    let start = Math.max(page - Math.floor(MAX_VISIBLE_PAGES / 2), 1);
    let end = start + MAX_VISIBLE_PAGES - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(end - MAX_VISIBLE_PAGES + 1, 1);
    }
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // const finalEndpoint = `${endpoint}?page-size=${page_size}&page=${page}`;
        // const response: any = await apiService.get(finalEndpoint);

        // if (isMountedRef.current) {
        //   setRows(response?.payoutRequests);
        //   setTotalrecords(response?.totalRecords);
        //   setTotalPages(response?.totalPages);
        // }
      } catch (error: any) {
        if (isMountedRef.current) {
          if (error?.response?.data?.message) {
            // Handle error silently or set an error state if needed
          } else {
            // Handle error silently or set an error state if needed
          }
        }
      } finally {
        if (isMountedRef.current) {
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [endpoint, page, page_size]);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  return {
    page,
    rows,
    totalPages,
    setRows,
    handleFirstPage,
    handleLastPage,
    handleNextPage,
    handlePreviousPage,
    handlePage,
    handlePageNumbers,
    isLoading,
  };
}

export default UsePagination;
