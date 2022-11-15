import axios from '@/lib/axios'
import React, { useEffect } from 'react'

export default function InputSelect({
    placeholder,
    id,
    label,
    value,
    children,
    ...props
}) {
    // const [selected, setSelected] = React.useState(value)

    return (
        <div className="">
            <label
                htmlFor={id}
                className="block mb-2 text-sm font-medium text-gray-600">
                {label}
            </label>
            <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                id={id}
                value={value}
                {...props}>
                <option value="">{placeholder}</option>
                {children}
            </select>
        </div>
    )
}
