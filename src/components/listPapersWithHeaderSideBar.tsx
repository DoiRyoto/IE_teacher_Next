"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Stack
} from "@chakra-ui/react";
import HeaderPapers from "@/components/header_papers";
import SidebarWithHeader from "@/components/sidebar";
import { paperData } from "@/app/utils/type";
import { deleteLike, getLikes, updateLike } from "@/app/lib/firebase/likes";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/store";
import { User } from "firebase/auth";
import GridPapers from "./gridPapers";

export default function ListPapersWithHeaderSideBar(params: {mode: string, keyword_or_id: string, user: User | null}) {
  const [papers, setPapers] = useState<paperData[]>([]);

  useEffect(() => {
    if (params.user){
      fetchDataWithLogin(params.user.uid)
    } else {
      fetchData()
    }

    async function fetchDataWithLogin(UID: string) {
      if(params.mode == "search"){
        const response = await fetch(`/api/search/${params.keyword_or_id}`);
        const data = await response.json();
        getLike(UID)
        setPapers(data.data.data);
      } else if(params.mode == "reference") {
        const response = await fetch(`/api/reference/${params.keyword_or_id}`);
        const data = await response.json();
        getLike(UID)
        setPapers(data.data.reference_papers);
      } else if (params.mode == "favorites") {
        const docRef = doc(db, "users", params.keyword_or_id)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          setPapers(docSnap.data().likes as paperData[])
        }
      }
    }

    async function fetchData() {
      if(params.mode == "search"){
        const response = await fetch(`/api/search/${params.keyword_or_id}`);
        const data = await response.json();
        setPapers(data.data.data);
      } else if(params.mode == "reference") {
        const response = await fetch(`/api/reference/${params.keyword_or_id}`);
        const data = await response.json();
        setPapers(data.data.reference_papers);
      } else if (params.mode == "favorites") {
        const docRef = doc(db, "users", params.keyword_or_id)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          setPapers(docSnap.data().likes as paperData[])
        }
      }
    }

    async function getLike(UID: string) {
      const likes = await getLikes(UID)
      adaptLikes(likes.map((obj) => obj.paperId))
    }

    function adaptLikes(lp: string[]) {
      setPapers((prevState) => prevState.map((obj) => lp.includes(obj.paperId) ? {...obj, isLike: true}: {...obj, isLike: false}))
    }
  
  }, [params.user?.uid]);

  const pushLikeButton = async (paper: paperData) => {
    if(!params.user){
      return console.log("No User")
    }

    if(paper.isLike){
      await deleteLike(params.user.uid, paper)
      setPapers((prevState) => prevState.map((obj) => obj.paperId == paper.paperId ? {...obj, isLike: false}: obj))
    } else {
      await updateLike(params.user.uid, paper)
      setPapers((prevState) => prevState.map((obj) => obj.paperId == paper.paperId ? {...obj, isLike: true}: obj))
    }
  }

  return (
    <Box>
      <Stack direction={"column"} height="100%">
        <HeaderPapers />
        <Stack direction={"row"} mt={"20"}>
          <Box>
            <SidebarWithHeader />
          </Box>
          <Box p={4}>
            <GridPapers user={params.user} papers={papers} onClickLikeButton={pushLikeButton}/>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
}
