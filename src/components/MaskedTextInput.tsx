import { useState } from "react"
import TextInput, { TextInputProps } from "./TextInput"

type MaskedTextInputProps = TextInputProps & {
    mask: string,
    maskChar?: string,
}


const MaskedTextInput = ({ mask, maskChar = "#", onChange, value, ...props }: MaskedTextInputProps) => {

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        const rawValue = value.replace(new RegExp(maskChar, "g"), "")
        const event = {
            target: {
                ...e.target,
                value: rawValue,
            },
        } as React.ChangeEvent<HTMLInputElement>
        onChange?.(event)
    }

    const maskedValue = `${value}`.replace(new RegExp(`.{${mask.length}}`, "g"), (match) => {
        return match.split("").join(maskChar)
    })

    return (
        <TextInput
            {...props}
            value={maskedValue}
            onChange={handleInputChange}
        />
    )
}

export default MaskedTextInput