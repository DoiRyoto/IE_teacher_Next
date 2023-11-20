"use client"

import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

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

    router.push(`/search?query=${word}`)
  }

  const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing || e.key !== 'Enter') {
      return
    }
    
    if (!word.length) {
      setValid(true)
      return
    }

    router.push(`/search?query=${word}`)
  }

  return (
    <div className='w-[90%]'>
      <div className='flex flex-row gap-3 h-12'>
        <input title="検索バー" placeholder='Input Paper title or Keyword' className="w-full px-4 py-2 text-black rounded" onChange={changeWord} value={word} onKeyDown={keyDownHandler}/>
        <button onClick={clickHandler} title='検索ボタン'>
          <Search className='h-full w-12 p-2 bg-slate-800 rounded'/>
        </button>
      </div>
      {valid && <p className="text-red-600">Please enter at least one character.</p>}
    </div>
  )
}

export default SearchBarTop