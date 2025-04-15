import * as React from "react"
import
{
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, PlusCircle, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import
{
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import
{
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import ShowEntries from "@/components/ui/showEntries";
import FilterStatus from "@/components/ui/filterStatus"
import { Tabs } from "@/components/ui/tabsHead"
import { TabsContent } from "@/components/ui/tabs"
import useSWR from "swr"
import { fetcher } from "@/lib/utils"
import dayjs from "dayjs"


export type Task = {
  id: string
  taskName: string
  priority: "Low" | "Medium" | "High"
  deadline: Date
}


export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "number",
    header: "No",
    cell: ( { row } ) => (
      <div className="capitalize">{ row.index + 1 }</div>
    ),
    // enableSorting: false,
    // enableHiding: false,
    size: 30,
  },
  {
    accessorKey: "task",
    header: "Task",
    cell: ( { row } ) =>
    {
      const task = row.original.taskName
      return (
        <div className="capitalize">{ task }</div>
      )
    },
    // enableSorting: false,
    // enableHiding: false,
    size: 120,
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ( { row } ) =>
    {
      const priority = row.original.priority
      return (
        <div className="capitalize">{ priority }</div>
      )
    },
  },
  {
    accessorKey: "deadline",
    header: ( { column } ) =>
    {
      return (
        <Button
          variant="ghost"
          onClick={ () => column.toggleSorting( column.getIsSorted() === "asc" ) }
        >
          Deadline
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ( { row } ) =>
    {
      const deadline = dayjs( row.original.deadline ).format("YYYY-MM-DD")
      return (
        <div className="capitalize ms-3">{ deadline }</div>
      )
    },
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ( { row } ) =>
    {
      const payment = row.original

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
              onClick={ () => navigator.clipboard.writeText( payment.id ) }
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export default function HomePage ()
{
  const { data: tasks } = useSWR(
    "http://localhost:5000/tasks/",
    fetcher
  );

  const [ sorting, setSorting ] = React.useState<SortingState>( [] )
  const [ columnFilters, setColumnFilters ] = React.useState<ColumnFiltersState>(
    []
  )
  const [ columnVisibility, setColumnVisibility ] =
    React.useState<VisibilityState>( {} )
  const [ rowSelection, setRowSelection ] = React.useState( {} )
  const [ tab, setTab ] = React.useState<string>( "onGoing" );

  const table = useReactTable( {
    data: tasks ?? [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  } )


  return (
    <div className="bg-white w-full h-full rounded-lg shadow-lg p-5 items-center overflow-hidden flex flex-col">
      <div className="grid grid-cols-12 w-full mb-4 gap-2">
        <div className="col-span-3">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search tasks..."
              value={ ( table.getColumn( "task" )?.getFilterValue() as string ) ?? "" }
              onChange={ ( event ) =>
                table.getColumn( "task" )?.setFilterValue( event.target.value )
              }
              className="pl-9"
            />
          </div>
        </div>
        <div className="col-span-6"></div>
        <div className="col-span-3">
          <a
            href="/add"
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-md"
          >
            <PlusCircle size={ 20 } />
            Add New Task
          </a>
        </div>
      </div>
      <div className="grid grid-cols-12 w-full mb-4 gap-2">
        <div className="col-span-3 bg-slate-900 rounded-md text-white p-1 flex gap-3">
          <div className="ms-2">
            Low : 13
          </div>
          |
          <div className="">
            Medium : 12
          </div>
          |
          <div className="">
            High : 11
          </div>
        </div>
        <div className="col-span-6"></div>
        <div className="col-span-1">
          <FilterStatus
            size="default"
            className="text-xs"
            table={ table }
            column="priority"
            status={ [
              {
                value: "low",
                label: "Low",
              },
              {
                value: "medium",
                label: "Medium",
              },
              {
                value: "high",
                label: "High",
              },
            ] }
          />
        </div>
        <div className="col-span-2 flex justify-end">
          <ShowEntries size="default" className="text-[13px]" table={ table } />
        </div>
      </div>
      <div className="flex-none w-full flex justify-between items-center mb-2">
        <Tabs
          onValueChange={ ( e ) =>
          {
            setTab( e );
            console.log( tab );
          } }
          head={ [
            {
              value: "onGoing",
              label: "On Going",
            },
            {
              value: "complete",
              label: "Complete",
            },
          ] }
          className="w-full h-full overflow-hidden flex flex-col"
          defaultValue="onGoing"
        >
          <>
            <TabsContent
              value="onGoing"
              className="w-full overflow-auto h-full"
            >
              <Table>
                <TableHeader>
                  { table.getHeaderGroups().map( ( headerGroup ) => (
                    <TableRow key={ headerGroup.id }>
                      { headerGroup.headers.map( ( header ) =>
                      {
                        return (
                          <TableHead key={ header.id }
                            style={ {
                              minWidth: header.column.columnDef.size,
                              maxWidth: header.column.columnDef.size,
                            } }>
                            { header.isPlaceholder
                              ? null
                              : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              ) }
                          </TableHead>
                        )
                      } ) }
                    </TableRow>
                  ) ) }
                </TableHeader>
                <TableBody>
                  { table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map( ( row ) => (
                      <TableRow
                        key={ row.id }
                        data-state={ row.getIsSelected() && "selected" }
                      >
                        { row.getVisibleCells().map( ( cell ) => (
                          <TableCell key={ cell.id }>
                            { flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            ) }
                          </TableCell>
                        ) ) }
                      </TableRow>
                    ) )
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={ columns.length }
                        className="h-24 text-center"
                      >
                        No results.
                      </TableCell>
                    </TableRow>
                  ) }
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent
              value="complete"
              className="w-full overflow-auto h-full"
            >
              <Table>
                <TableHeader>
                  { table.getHeaderGroups().map( ( headerGroup ) => (
                    <TableRow key={ headerGroup.id }>
                      { headerGroup.headers.map( ( header ) =>
                      {
                        return (
                          <TableHead key={ header.id }>
                            { header.isPlaceholder
                              ? null
                              : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              ) }
                          </TableHead>
                        )
                      } ) }
                    </TableRow>
                  ) ) }
                </TableHeader>
                <TableBody>
                  { table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map( ( row ) => (
                      <TableRow
                        key={ row.id }
                        data-state={ row.getIsSelected() && "selected" }
                      >
                        { row.getVisibleCells().map( ( cell ) => (
                          <TableCell key={ cell.id }>
                            { flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            ) }
                          </TableCell>
                        ) ) }
                      </TableRow>
                    ) )
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={ columns.length }
                        className="h-24 text-center"
                      >
                        No results.
                      </TableCell>
                    </TableRow>
                  ) }
                </TableBody>
              </Table>
            </TabsContent>
          </>
        </Tabs>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          { table.getFilteredSelectedRowModel().rows.length } of{ " " }
          { table.getFilteredRowModel().rows.length } row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={ () => table.previousPage() }
            disabled={ !table.getCanPreviousPage() }
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={ () => table.nextPage() }
            disabled={ !table.getCanNextPage() }
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

