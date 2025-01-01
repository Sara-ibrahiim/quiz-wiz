import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

const PaginationItems = ({
  totalGroups,
  itemsPerPage,
  paginate,
  currentPage,
}: {totalGroups: number; itemsPerPage: number;  paginate: (number: number) => void; currentPage: number}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalGroups / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <div className="p-3 mt-4 pagination">
        <Pagination>
          <PaginationContent>
            {pageNumbers.map((number) => (
              <PaginationItem
                key={number}
                className={`page-item border rounded-md ${
                  number === currentPage ? "active" : ""
                }`}
              >
                <PaginationLink onClick={() => paginate(number)} >
                  {number}
                </PaginationLink>
              </PaginationItem>
            ))}
          </PaginationContent>
        </Pagination>
      </div>
    </nav>
  );
};

export default PaginationItems;
