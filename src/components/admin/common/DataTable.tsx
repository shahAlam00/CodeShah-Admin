import React, { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';
import { Pagination } from './Pagination';
import { EmptyState } from './EmptyState';

export interface Column<T> {
  key: string;
  header: string;
  accessor?: (item: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (item: T) => string;
  selectedIds?: string[];
  onSelectIds?: (ids: string[]) => void;
  pageSize?: number;
  emptyTitle?: string;
  emptyDescription?: string;
  isLoading?: boolean;
  bulkActions?: React.ReactNode;
}

export function DataTable<T>({
  data,
  columns,
  keyExtractor,
  selectedIds,
  onSelectIds,
  pageSize = 10,
  emptyTitle = 'No records found',
  emptyDescription = 'There are no items matching your criteria.',
  bulkActions,
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (key: string) => {
    if (sortKey === key) {
      if (sortDirection === 'asc') setSortDirection('desc');
      else {
        setSortKey(null);
        setSortDirection('asc');
      }
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const sortedData = useMemo(() => {
    if (!sortKey) return data;
    return [...data].sort((a: any, b: any) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (aVal === bVal) return 0;
      if (aVal === null || aVal === undefined) return 1;
      if (bVal === null || bVal === undefined) return -1;
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      }
      return sortDirection === 'asc'
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
  }, [data, sortKey, sortDirection]);

  const totalPages = Math.ceil(sortedData.length / pageSize);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const hasSelection = onSelectIds && selectedIds !== undefined;
  const allPageIds = paginatedData.map(keyExtractor);
  const isAllSelected =
    allPageIds.length > 0 && allPageIds.every((id) => selectedIds?.includes(id));
  const isSomeSelected =
    allPageIds.some((id) => selectedIds?.includes(id)) && !isAllSelected;

  const toggleSelectAll = () => {
    if (!onSelectIds || !selectedIds) return;
    if (isAllSelected) {
      onSelectIds(selectedIds.filter((id) => !allPageIds.includes(id)));
    } else {
      const newSelected = Array.from(new Set([...selectedIds, ...allPageIds]));
      onSelectIds(newSelected);
    }
  };

  const toggleSelectRow = (id: string) => {
    if (!onSelectIds || !selectedIds) return;
    if (selectedIds.includes(id)) {
      onSelectIds(selectedIds.filter((i) => i !== id));
    } else {
      onSelectIds([...selectedIds, id]);
    }
  };

  return (
    <div className="w-full bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-soft-sm overflow-hidden">
      {/* Bulk actions banner if items selected */}
      {hasSelection && selectedIds && selectedIds.length > 0 && (
        <div className="flex items-center justify-between px-4 py-2.5 bg-brand-50/90 dark:bg-brand-950/50 border-b border-brand-200 dark:border-brand-900/60 text-xs text-brand-900 dark:text-brand-100 animate-fade-in">
          <div className="font-semibold flex items-center gap-2">
            <span className="flex items-center justify-center w-5 h-5 bg-brand-600 text-white rounded-full text-[10px]">
              {selectedIds.length}
            </span>
            <span>item{selectedIds.length > 1 ? 's' : ''} selected</span>
          </div>
          <div className="flex items-center gap-2">{bulkActions}</div>
        </div>
      )}

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/75 dark:bg-navy-950/60 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              {hasSelection && (
                <th className="p-4 w-10">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    ref={(input) => {
                      if (input) input.indeterminate = isSomeSelected;
                    }}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500/20 cursor-pointer"
                  />
                </th>
              )}
              {columns.map((col) => (
                <th
                  key={col.key}
                  style={{ width: col.width }}
                  className={`p-4 font-semibold ${
                    col.align === 'center'
                      ? 'text-center'
                      : col.align === 'right'
                      ? 'text-right'
                      : 'text-left'
                  } ${col.sortable ? 'cursor-pointer select-none hover:text-navy-900 dark:hover:text-white' : ''}`}
                  onClick={() => col.sortable && handleSort(col.key)}
                >
                  <div
                    className={`inline-flex items-center gap-1.5 ${
                      col.align === 'right' ? 'justify-end' : ''
                    }`}
                  >
                    <span>{col.header}</span>
                    {col.sortable && (
                      <span className="text-slate-400">
                        {sortKey === col.key ? (
                          sortDirection === 'asc' ? (
                            <ChevronUp className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
                          )
                        ) : (
                          <ChevronsUpDown className="w-3.5 h-3.5 opacity-40" />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-700 dark:text-slate-300">
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (hasSelection ? 1 : 0)}
                  className="p-0"
                >
                  <EmptyState
                    title={emptyTitle}
                    description={emptyDescription}
                  />
                </td>
              </tr>
            ) : (
              paginatedData.map((item) => {
                const id = keyExtractor(item);
                const isSelected = selectedIds?.includes(id);

                return (
                  <tr
                    key={id}
                    className={`transition-colors duration-150 hover:bg-slate-50/80 dark:hover:bg-navy-800/50 ${
                      isSelected ? 'bg-brand-50/40 dark:bg-brand-950/20' : ''
                    }`}
                  >
                    {hasSelection && (
                      <td className="p-4 w-10">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelectRow(id)}
                          className="w-4 h-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500/20 cursor-pointer"
                        />
                      </td>
                    )}
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className={`p-4 ${
                          col.align === 'center'
                            ? 'text-center'
                            : col.align === 'right'
                            ? 'text-right'
                            : 'text-left'
                        }`}
                      >
                        {col.accessor
                          ? col.accessor(item)
                          : (item as any)[col.key]}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={sortedData.length}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
