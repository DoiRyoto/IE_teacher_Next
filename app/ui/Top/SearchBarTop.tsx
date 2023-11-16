"use client"

import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useRef, useState } from 'react'

const SearchBarTop = () => {
  const [word, setWord] = useState<string>("")
  const router = useRouter()
  const [valid, setValid] = useState<boolean>(false) // TODO: より詳細なバリデーションチェック
  
  const changeWord = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    setWord(e.target.value)
  }

  const clickHandler = () => {
    if (!word.length) {
      setValid(true)
      return
    }

    router.push(`/search?q=${word}`)
  }

  const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing || e.key !== 'Enter') {
      return
    }
    
    if (!word.length) {
      setValid(true)
      return
    }

    router.push(`/search?q=${word}`)
  }

  return (
    <div>
      <div className='flex flex-row gap-3 h-12'>
        <input placeholder='Input Paper title or Keyword' className="w-full px-4 py-2 text-black rounded" onChange={changeWord} value={word} onKeyDown={keyDownHandler}/>
        <Search className='h-full w-12 p-2 bg-slate-800 rounded hover:cursor-pointer' onClick={clickHandler}/>
      </div>
      {valid && <text className="text-red-600">Please enter at least one character.</text>}
    </div>
  )
}

export default SearchBarTop