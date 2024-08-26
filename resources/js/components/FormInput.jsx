export function Input({
    formLabel,
    value,
    name,
    placeholder,
    handleChange,
    type,
    error,
}) {
    return (
        <>
            <div>
                {formLabel ? (
                    <label
                        htmlFor={name}
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        {formLabel}
                    </label>
                ) : null}
                <input
                    type={type}
                    id={name}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={placeholder || ""}
                    value={value}
                    onChange={handleChange}
                />
                {error ? (
                    <>
                        <small className="absolute flex justify-between w-full pt-1 text-xs transition text-pink-500 font-light italic">
                            <span>{error}</span>
                        </small>
                        <br />
                    </>
                ) : null}
            </div>
        </>
    );
}

export function InputSelect({
    handleChange,
    name,
    children,
    error,
    formLabel,
    value,
}) {
    return (
        <>
            {formLabel ? (
                <label
                    htmlFor={name}
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    {formLabel}
                </label>
            ) : null}
            <select
                id={name}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={value}
                onChange={handleChange}
            >
                <option value="">Choose</option>
                {children}
            </select>
            {error ? (
                <>
                    <small className="absolute flex justify-between w-full pt-1 text-xs transition text-pink-500 font-light italic">
                        <span>{error}</span>
                    </small>
                    <br />
                </>
            ) : null}
        </>
    );
}
