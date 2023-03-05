import React from 'react'

export default function Message({ children, colorBg, colorText }) {
    return (
        <div className={`${colorBg} mt-4  p-4 rounded-md shadow-md`}>
            <div className={`${colorText} font-semibold `}>Catatan :</div>
            <div className={`${colorText}`}>{children}</div>
        </div>
    )
}
