import React from 'react'

export default function Card({ title, children }) {
    return (
        <div>
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                    <div className="border-b border-gray-200 bg-white p-6">
                        <div className="text-xl font-semibold text-gray-700">
                            {title}
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

const Form = ({ handleSubmit, children }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className="mt-2">
                <div className="grid grid-cols-2 gap-4">{children}</div>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
                <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                    Simpan Data
                </button>
            </div>
        </form>
    )
}

export { Card, Form }
