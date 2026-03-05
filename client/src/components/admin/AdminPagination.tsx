import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";

interface Props {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

function scrollToTop() {
  document.getElementById("main-scroll")?.scrollTo(0, 0);
  window.scrollTo(0, 0);
}

export function AdminPagination({ page, totalPages, onChange }: Props) {
  if (totalPages <= 1) return null;

  const handleChange = (p: number) => {
    onChange(p);
    scrollToTop();
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-1.5">
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleChange(Math.max(1, page - 1))}
        disabled={page === 1}
      >
        <ChevronLeftIcon className="h-3.5 w-3.5" />
        Prev
      </Button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <Button
          key={p}
          variant={p === page ? "default" : "outline"}
          size="sm"
          onClick={() => handleChange(p)}
        >
          {p}
        </Button>
      ))}

      <Button
        variant="outline"
        size="sm"
        onClick={() => handleChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
      >
        Next
        <ChevronRightIcon className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
}
