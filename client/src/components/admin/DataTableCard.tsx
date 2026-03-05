import type { ReactNode } from "react";

interface Props {
  toolbar?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
}

/**
 * Unified card shell for all admin data tables.
 * - Reuses `.table-shell` CSS (border, radius, thead background, row hover)
 * - Inner `overflow-x-auto` div prevents layout breakage on narrow viewports
 * - Optional `toolbar` slot renders above the table (search / filters)
 * - Optional `footer` slot renders below the table (pagination)
 */
export function DataTableCard({ toolbar, footer, children }: Props) {
  return (
    <div className="table-shell">
      {toolbar && (
        <div className="border-b border-(--line) bg-[#f7efe0] px-4 py-3">
          {toolbar}
        </div>
      )}
      <div className="overflow-x-auto">{children}</div>
      {footer && (
        <div className="border-t border-(--line) px-4 py-4">{footer}</div>
      )}
    </div>
  );
}
