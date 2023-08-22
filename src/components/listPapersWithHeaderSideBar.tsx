'use client'

import { Box, Stack } from '@chakra-ui/react'
import { User } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import React, { useState, useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import GridPapers from './gridPapers'
import { deleteLike, getLikes, updateLike } from '@/app/lib/firebase/likes'
import { paperData } from '@/app/utils/type'
import HeaderPapers from '@/components/header_papers'
import SidebarWithHeader from '@/components/sidebar'
import { db } from '@/lib/firebase/store'

export default function ListPapersWithHeaderSideBar(params: {
  mode: string
  keyword_or_id: string
  user: User | null
}) {
  const [papers, setPapers] = useState<paperData[]>([])
  const [offset, setOffset] = useState<number>(0)
  const firstRender = useRef(true)
  const isEnd = useRef(false)
  const [isLoading, setIsLoading] = useState(false)
  const single = 20
  const { ref, inView: isScrollEnd } = useInView()

  useEffect(() => {
    async function fetchData() {
      if (params.mode == 'search') {
        const response = await fetch(
          `/api/search/${params.keyword_or_id}/${String(offset)}`,
        )
        const data = await response.json()
        if (data.data)
          if (data.data.data.length == 0) {
            isEnd.current = true
          }
        if (params.user) {
          getLike(params.user.uid)
        }
        setPapers(data.data.data)
        setIsLoading(false)
      } else if (params.mode == 'reference') {
        const response = await fetch(
          `/api/reference/${params.keyword_or_id}/${String(offset)}`,
        )
        const data = await response.json()
        if (data.data.reference_papers.length == 0) {
          isEnd.current = true
        }
        if (params.user) {
          getLike(params.user.uid)
        }
        setPapers(data.data.reference_papers)
        setIsLoading(false)
      } else if (params.mode == 'favorites') {
        const docRef = doc(db, 'users', params.keyword_or_id)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          setPapers(docSnap.data().likes as paperData[])
        }
        setIsLoading(false)
      }
    }

    setIsLoading(true)
    fetchData()
  }, [params.user?.uid])

  async function getLike(UID: string) {
    const likes = await getLikes(UID)
    adaptLikes(likes.map((obj) => obj.paperId))
  }

  function adaptLikes(lp: string[]) {
    setPapers((prevState) =>
      prevState.map((obj) =>
        lp.includes(obj.paperId)
          ? { ...obj, isLike: true }
          : { ...obj, isLike: false },
      ),
    )
  }

  const pushLikeButton = async (paper: paperData) => {
    if (!params.user) {
      return console.log('No User')
    }

    if (paper.isLike) {
      await deleteLike(params.user.uid, paper)
      setPapers((prevState) =>
        prevState.map((obj) =>
          obj.paperId == paper.paperId ? { ...obj, isLike: false } : obj,
        ),
      )
    } else {
      await updateLike(params.user.uid, paper)
      setPapers((prevState) =>
        prevState.map((obj) =>
          obj.paperId == paper.paperId ? { ...obj, isLike: true } : obj,
        ),
      )
    }
  }

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
    } else {
      if (!isEnd.current) {
        fetchData()
        setIsLoading(true)
      }
    }

    async function fetchData() {
      if (params.mode == 'search') {
        const response = await fetch(
          `/api/search/${params.keyword_or_id}/${String(offset + single)}`,
        )
        const data = await response.json()
        if (data.data.data.length == 0) {
          isEnd.current = true
        }
        if (params.user) {
          getLike(params.user.uid)
        }
        setPapers([...papers, ...data.data.data])
        setIsLoading(false)
        setOffset(offset + single)
      } else if (params.mode == 'reference') {
        const response = await fetch(
          `/api/reference/${params.keyword_or_id}/${String(offset + single)}`,
        )
        const data = await response.json()
        if (data.data.reference_papers.length == 0) {
          isEnd.current = true
        }
        if (params.user) {
          getLike(params.user.uid)
        }
        setPapers([...papers, ...data.data.reference_papers])
        setIsLoading(false)
        setOffset(offset + single)
      } else if (params.mode == 'favorites') {
        const docRef = doc(db, 'users', params.keyword_or_id)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          setPapers(docSnap.data().likes as paperData[])
        }
        setIsLoading(false)
      }
    }
  }, [isScrollEnd])

  return (
    <Box>
      <Stack direction={'column'} height="100%">
        <HeaderPapers />
        <Stack direction={'row'} mt={'20'}>
          <Box>
            <SidebarWithHeader />
          </Box>
          <Box p={4}>
            <GridPapers
              user={params.user}
              papers={papers}
              onClickLikeButton={pushLikeButton}
            />
            {!isEnd.current && !isLoading && (
              <div ref={ref} aria-hidden={true} />
            )}
          </Box>
        </Stack>
      </Stack>
    </Box>
  )
}
