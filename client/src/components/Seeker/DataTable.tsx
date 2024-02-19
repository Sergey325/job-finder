import {
    Column,
    Table,
    useReactTable,
    ColumnFiltersState,
    getCoreRowModel,
    getFilteredRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFacetedMinMaxValues,
    getPaginationRowModel,
    sortingFns,
    getSortedRowModel,
    FilterFn,
    SortingFn,
    ColumnDef,
    flexRender,
    FilterFns,
} from '@tanstack/react-table'

import {
    RankingInfo,
    rankItem,
    compareItems,
} from '@tanstack/match-sorter-utils'

declare module '@tanstack/table-core' {
    interface FilterFns {
        fuzzy: FilterFn<unknown>
    }

    interface FilterMeta {
        itemRank: RankingInfo
    }
}

import {useEffect, useMemo, useReducer, useState} from "react";

type Seeker = {
    id: string,
    firstName: string
    lastName: string
    jobPosition: string
    qualification: string
    phoneNumber: string
    email: string
    cvUrl: string
}

const defaultData: Seeker[] = [
    {
        id: "1",
        firstName: "John",
        lastName: "Doe",
        jobPosition: "Software Engineer",
        qualification: "Bachelor's Degree in Computer Science",
        phoneNumber: "123-456-7890",
        email: "john.doe@example.com",
        cvUrl: "https://example.com/johndoe_cv"
    },
    {
        id: "2",
        firstName: "Alice",
        lastName: "Smith",
        jobPosition: "Data Scientist",
        qualification: "Master's Degree in Data Science",
        phoneNumber: "987-654-3210",
        email: "alice.smith@example.com",
        cvUrl: "https://example.com/alicesmith_cv"
    },
    {
        id: "3",
        firstName: "Michael",
        lastName: "Johnson",
        jobPosition: "Web Developer",
        qualification: "Bachelor's Degree in Web Development",
        phoneNumber: "456-789-0123",
        email: "michael.johnson@example.com",
        cvUrl: "https://example.com/michaeljohnson_cv"
    },
    {
        id: "4",
        firstName: "Emily",
        lastName: "Brown",
        jobPosition: "UX Designer",
        qualification: "Bachelor's Degree in Design",
        phoneNumber: "789-012-3456",
        email: "emily.brown@example.com",
        cvUrl: "https://example.com/emilybrown_cv"
    },
    {
        id: "5",
        firstName: "David",
        lastName: "Martinez",
        jobPosition: "Data Analyst",
        qualification: "Bachelor's Degree in Statistics",
        phoneNumber: "012-345-6789",
        email: "david.martinez@example.com",
        cvUrl: "https://example.com/davidmartinez_cv"
    },
    {
        id: "6",
        firstName: "Sarah",
        lastName: "Wilson",
        jobPosition: "Marketing Manager",
        qualification: "Bachelor's Degree in Marketing",
        phoneNumber: "345-678-9012",
        email: "sarah.wilson@example.com",
        cvUrl: "https://example.com/sarahwilson_cv"
    },
    {
        id: "7",
        firstName: "Daniel",
        lastName: "Thompson",
        jobPosition: "Project Manager",
        qualification: "Master's Degree in Business Administration",
        phoneNumber: "678-901-2345",
        email: "daniel.thompson@example.com",
        cvUrl: "https://example.com/danielthompson_cv"
    },
    {
        id: "8",
        firstName: "Jessica",
        lastName: "Garcia",
        jobPosition: "HR Specialist",
        qualification: "Bachelor's Degree in Human Resources",
        phoneNumber: "901-234-5678",
        email: "jessica.garcia@example.com",
        cvUrl: "https://example.com/jessicagarcia_cv"
    },
    {
        id: "9",
        firstName: "Matthew",
        lastName: "Roberts",
        jobPosition: "Financial Analyst",
        qualification: "Bachelor's Degree in Finance",
        phoneNumber: "234-567-8901",
        email: "matthew.roberts@example.com",
        cvUrl: "https://example.com/matthewroberts_cv"
    },
    {
        id: "10",
        firstName: "Olivia",
        lastName: "Lee",
        jobPosition: "Software Developer",
        qualification: "Bachelor's Degree in Computer Engineering",
        phoneNumber: "567-890-1234",
        email: "olivia.lee@example.com",
        cvUrl: "https://example.com/oliviale_cv"
    }
];

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    // Rank the item
    const itemRank = rankItem(row.getValue(columnId), value)

    // Store the itemRank info
    addMeta({
        itemRank,
    })

    // Return if the item should be filtered in/out
    return itemRank.passed
}

const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
    let dir = 0

    // Only sort by rank if the column has ranking information
    if (rowA.columnFiltersMeta[columnId]) {
        dir = compareItems(
            rowA.columnFiltersMeta[columnId]?.itemRank!,
            rowB.columnFiltersMeta[columnId]?.itemRank!
        )
    }

    // Provide an alphanumeric fallback for when the item ranks are equal
    return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir
}


// const columns = [
//     columnHelper.accessor(row => `${row.firstName} ${row.lastName}`, {
//         id: 'fullName',
//         cell: info => info.getValue(),
//         header: () => 'ПІБ'
//     }),
//     columnHelper.accessor('jobPosition', {
//         id: 'jobPosition',
//         cell: info => info.getValue(),
//         header: () => 'Посада'
//     }),
//     columnHelper.accessor('qualification', {
//         id: 'qualification',
//         cell: info => info.getValue(),
//         header: () => 'Кваліфікація'
//     }),
//     columnHelper.accessor('phoneNumber', {
//         id: 'phoneNumber',
//         cell: info => info.getValue(),
//         header: () => 'Номер телефону'
//     }),
//     columnHelper.accessor('email', {
//         id: 'email',
//         cell: info => info.getValue(),
//         header: () => 'Пошта'
//     }),
//     columnHelper.accessor('cvUrl', {
//         id: 'cvUrl',
//         cell: info => info.getValue(),
//         header: () => 'CV'
//     }),
//
// ];


export default function DataTable() {
    // const rerender = useReducer(() => ({}), {})[1]

    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
        []
    )
    const [globalFilter, setGlobalFilter] = useState('')

    const columns = useMemo<ColumnDef<Seeker, any>[]>(
        () => [
            {
                accessorFn: row => `${row.firstName} ${row.lastName}`,
                id: 'fullName',
                header: 'Full Name',
                cell: info => info.getValue(),
                filterFn: 'fuzzy',
                sortingFn: fuzzySort,
            },
            {
                accessorKey: 'jobPosition',
                header: () => 'Посада',
            },
            {
                accessorKey: 'qualification',
                header: () => 'Кваліфікація',
            },
            {
                accessorKey: 'phoneNumber',
                header: 'Номер',
            },
            {
                accessorKey: 'email',
                header: 'Пошта',
            },
            {
                accessorKey: 'cvUrl',
                header: 'CV',
            },
        ],
        []
    )

    const [data, setData] = useState(() => [...defaultData]);

    const table = useReactTable({
        data,
        columns,
        filterFns: {
            fuzzy: fuzzyFilter,
        },
        state: {
            columnFilters,
            globalFilter,
        },
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: fuzzyFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        // getPaginationRowModel: getPaginationRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        getFacetedMinMaxValues: getFacetedMinMaxValues(),
        debugTable: true,
        debugHeaders: true,
        debugColumns: false,
    })

    // useEffect(() => {
    //     if (table.getState().columnFilters[0]?.id === 'fullName') {
    //         if (table.getState().sorting[0]?.id !== 'fullName') {
    //             table.setSorting([{ id: 'fullName', desc: false }])
    //         }
    //     }
    // }, [table.getState().columnFilters[0]?.id])


    return (
        <div className="p-2">
            <div>
                <DebouncedInput
                    value={globalFilter ?? ''}
                    onChange={value => setGlobalFilter(String(value))}
                    className="p-2 font-lg shadow border border-block"
                    placeholder="Search all columns..."
                />
            </div>
            <div className="h-2"/>
            <table>
                <thead>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => {
                            return (
                                <th key={header.id} colSpan={header.colSpan}>
                                    {header.isPlaceholder ? null : (
                                        <>
                                            <div
                                                {...{
                                                    className: header.column.getCanSort()
                                                        ? 'cursor-pointer select-none'
                                                        : '',
                                                    onClick: header.column.getToggleSortingHandler(),
                                                }}
                                            >
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                                {{
                                                    asc: ' 🔼',
                                                    desc: ' 🔽',
                                                }[header.column.getIsSorted() as string] ?? null}
                                            </div>
                                            {header.column.getCanFilter() ? (
                                                <div>
                                                    <Filter column={header.column} table={table}/>
                                                </div>
                                            ) : null}
                                        </>
                                    )}
                                </th>
                            )
                        })}
                    </tr>
                ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => {
                        return (
                            <tr key={row.id}>
                                {row.getVisibleCells().map(cell => {
                                    return (
                                        <td key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}

// FILTER
function Filter({
                    column,
                    table,
                }: {
    column: Column<any, unknown>
    table: Table<any>
}) {
    const firstValue = table
        .getPreFilteredRowModel()
        .flatRows[0]?.getValue(column.id)

    const columnFilterValue = column.getFilterValue()

    const sortedUniqueValues = useMemo(
        () =>
            typeof firstValue === 'number'
                ? []
                : Array.from(column.getFacetedUniqueValues().keys()).sort(),
        [column.getFacetedUniqueValues()]
    )

    return typeof firstValue === 'number' ? (
        <div>
            <div className="flex space-x-2">
                <DebouncedInput
                    type="number"
                    min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
                    max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
                    value={(columnFilterValue as [number, number])?.[0] ?? ''}
                    onChange={value =>
                        column.setFilterValue((old: [number, number]) => [value, old?.[1]])
                    }
                    placeholder={`Min ${
                        column.getFacetedMinMaxValues()?.[0]
                            ? `(${column.getFacetedMinMaxValues()?.[0]})`
                            : ''
                    }`}
                    className="w-24 border shadow rounded"
                />
                <DebouncedInput
                    type="number"
                    min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
                    max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
                    value={(columnFilterValue as [number, number])?.[1] ?? ''}
                    onChange={value =>
                        column.setFilterValue((old: [number, number]) => [old?.[0], value])
                    }
                    placeholder={`Max ${
                        column.getFacetedMinMaxValues()?.[1]
                            ? `(${column.getFacetedMinMaxValues()?.[1]})`
                            : ''
                    }`}
                    className="w-24 border shadow rounded"
                />
            </div>
            <div className="h-1" />
        </div>
    ) : (
        <>
            <datalist id={column.id + 'list'}>
                {sortedUniqueValues.slice(0, 100).map((value: any) => (
                    <option value={value} key={value} />
                ))}
            </datalist>
            <DebouncedInput
                type="text"
                value={(columnFilterValue ?? '') as string}
                onChange={value => column.setFilterValue(value)}
                placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
                className="w-36 border shadow rounded"
                list={column.id + 'list'}
            />
            <div className="h-1" />
        </>
    )
}

// A debounced input react component
function DebouncedInput({
                            value: initialValue,
                            onChange,
                            debounce = 500,
                            ...props
                        }: {
    value: string | number
    onChange: (value: string | number) => void
    debounce?: number
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
    const [value, setValue] = useState(initialValue)

    useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(value)
        }, debounce)

        return () => clearTimeout(timeout)
    }, [value])

    return (
        <input {...props} value={value} onChange={e => setValue(e.target.value)} />
    )
}