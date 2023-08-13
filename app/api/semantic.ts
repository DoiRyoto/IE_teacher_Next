import type { NextApiRequest, NextApiResponse } from 'next'
import axios from "axios"

type Data = {
    paperId: string | null
}

export function getPaperByPaperId() {
    const instance = axios.create({
        baseURL: "https://api.semanticscholar.org/graph/v1/paper/search"
        
    })
}