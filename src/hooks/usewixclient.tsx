"use client"

import { WixClientContext } from "@/context/wixcontext"
import { useContext } from "react"
import { WixClient } from "@/context/wixcontext"

export const useWixClient = (): WixClient => {
    const context = useContext(WixClientContext)
    if (!context) throw new Error("useWixClient must be used within a WixClientContextProvider")
    return context
}
