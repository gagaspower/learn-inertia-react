export function InputDefault({
    formLabel,
    value,
    name,
    placeholder,
    handleChange,
    type,
    error,
    readOnly,
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
                    type={type || "text"}
                    id={name}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={placeholder || ""}
                    value={value}
                    onChange={handleChange}
                    readOnly={readOnly || false}
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

export function SmallInput({
    formLabel,
    value,
    name,
    placeholder,
    handleChange,
    type,
    error,
    readOnly,
}) {
    return (
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
                type={type || "text"}
                id={name}
                className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={value}
                placeholder={placeholder}
                onChange={handleChange}
                readOnly={readOnly || false}
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
    );
}

export function SmallSelect({
    handleChange,
    name,
    children,
    error,
    formLabel,
    value,
}) {
    return (
        <div>
            {formLabel ? (
                <label
                    htmlFor="small"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Small select
                </label>
            ) : null}
            <select
                id={name}
                value={value}
                onChange={handleChange}
                className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
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
        </div>
    );
}
