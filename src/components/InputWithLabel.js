import React from 'react'

export default function InputWithLabel({
    placeholder,
    id,
    label,
    value,
    error,
    helper,
    ...props
}) {
    return (
        <div className="">
            <label
                htmlFor={id}
                className="block mb-2 text-sm font-medium text-gray-600">
                {label}
            </label>
            <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                id={id}
                placeholder={placeholder}
                value={value}
                {...props}
            />
            <small className="text-gray-500">{helper}</small>
            {error}
        </div>
    )
}
