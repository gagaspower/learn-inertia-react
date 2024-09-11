export default function Tables({ columns, data }) {
    return (
        <>
            <div className="w-full overflow-x-auto">
                <table
                    className="w-full text-left border border-separate rounded border-slate-200"
                    cellSpacing="0"
                >
                    <thead>
                        <tr>
                            {columns.map((col) => {
                                return (
                                    <th
                                        key={col.key}
                                        scope="col"
                                        className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100"
                                    >
                                        {col.label}
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.length > 0 ? (
                            data.map((d, index) => {
                                return (
                                    <tr
                                        className="transition-colors duration-300 hover:bg-slate-50"
                                        key={index}
                                    >
                                        {columns.map((column) => {
                                            return (
                                                <td
                                                    key={column.key}
                                                    className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 "
                                                >
                                                    {column.formatter
                                                        ? column.formatter(d)
                                                        : d[column.key]}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })
                        ) : (
                            <tr className="transition-colors duration-300 hover:bg-slate-50">
                                <td
                                    colSpan={columns.length}
                                    className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 text-center"
                                >
                                    Tidak ada data
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}
