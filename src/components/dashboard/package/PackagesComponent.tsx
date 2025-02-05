"use client";

import * as React from "react";
import {
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  DeletePackage,
  deliverPackage,
  getPackages,
} from "@/services/packageService";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ForwardDialog from "./ForwardDialog";
import DeleteConfirmationPopup from "../../deleteConfirmation/DeleteConfirmationPopup";
import SuccessAlertMessage from "@/components/Alert/SuccessAlertMessage";
import ErrorMessage from "@/components/Alert/ErrorMessage";
import { useNavigate } from "react-router-dom";
import { Package } from "@/types/package";

export default function PackagesComponent() {
  const [page, setPage] = React.useState(1);
  const [pageSize] = React.useState(10); // Set per-page size

  const { data, isLoading, isError } = useQuery({
    queryKey: ["packages", page],
    queryFn: () => getPackages(page, pageSize),
    placeholderData: (previousData) => previousData,
    refetchInterval: 2000,
  });

  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [selectedPackage, setSelectedPackage] = React.useState<Package | null>(
    null
  );
  const [deletePackageId, setDeletePackageId] = React.useState<string | null>(
    null
  );
  // Function to handle opening the ForwardDialog
  const handleForwardClick = (packageData: Package) => {
    setSelectedPackage(packageData); // Set the selected package
    setIsDialogOpen(true); // Open the dialog
  };
  const queryClient = useQueryClient();
  const deletePackageMutation = useMutation({
    mutationFn: DeletePackage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cities"] });
      setDeletePackageId(null);
    },
  });

  const packages = data?.data ?? [];
  const pagination = data?.meta;

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable<Package>({
    data: packages,
    columns: [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "trackingNumber",
        header: () => (
          <div className="flex items-center">
            Tracking Number <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        ),
        cell: ({ row }) => <div>{row.getValue("trackingNumber")}</div>,
      },
      {
        accessorKey: "packageName",
        header: "Package Name",
        cell: ({ row }) => <div>{row.getValue("packageName")}</div>,
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <div className="capitalize">{row.getValue("status")}</div>
        ),
      },
      {
        id: "actions",
        enableHiding: false,

        cell: ({ row }) => {
          const packageData = row.original;

          const queryClient = useQueryClient();
          // Mutation for accepting the package
          const deliverMutation = useMutation({
            mutationFn: () => deliverPackage(packageData.trackingNumber), // Pass packageId
            onSuccess: () => {
              queryClient.invalidateQueries({ queryKey: ["deliverPackage"] });
            },

            onError: (error: any) => {
              console.log(error.message);
            },
          });
          const navigate = useNavigate();
          const handlePackageDetailPage = () => {
            navigate(`/package-detail/${packageData.id}`);
          };
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() =>
                    navigator.clipboard.writeText(packageData.trackingNumber)
                  }
                >
                  Copy Tracking Number{" "}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleForwardClick(packageData)}
                >
                  Forward
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => deliverMutation.mutate()}
                  disabled={deliverMutation.isPending}
                >
                  {deliverMutation.isPending ? "loading..." : "Deliver Package"}
                </DropdownMenuItem>
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setDeletePackageId(packageData.id)}
                >
                  Delete
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handlePackageDetailPage}>
                  View Details
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
    },
    manualPagination: true,
    pageCount: pagination?.totalPages || 1,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data.</div>;

  return (
    <div className="w-full bg-white p-4 rounded-lg">
      <h3 className=" -mb-5 font-semibold text-xl">Packages</h3>
      {deletePackageMutation.isError && (
        <ErrorMessage user_text={deletePackageMutation.error.message} />
      )}
      {deletePackageMutation.isSuccess && (
        <SuccessAlertMessage
          user_text={"You ave Deleted Package successfully"}
        />
      )}
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter packages..."
          value={
            (table.getColumn("trackingNumber")?.getFilterValue() as string) ??
            ""
          }
          onChange={(event) =>
            table
              .getColumn("trackingNumber")
              ?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={table.getAllColumns().length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </Button>
        <span>
          Page {page} of {pagination?.totalPages ?? 1}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage((old) => old + 1)}
          disabled={page >= (pagination?.totalPages ?? 1)}
        >
          Next
        </Button>
      </div>
      <DeleteConfirmationPopup
        isOpen={deletePackageId !== null}
        onConfirm={() =>
          deletePackageId && deletePackageMutation.mutate(deletePackageId)
        }
        onCancel={() => setDeletePackageId(null)}
        message="Are you sure you want to delete this city? "
      />
      {/* Forward Dialog */}
      <ForwardDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        trackingNumber={selectedPackage?.trackingNumber || ""}
      />
    </div>
  );
}
