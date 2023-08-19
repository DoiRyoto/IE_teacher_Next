"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Flex,
  Card,
  CardHeader,
  Heading,
  CardBody,
  Stack,
  StackDivider,
  Text,
  SimpleGrid,
  IconButton,
  Spacer,
} from "@chakra-ui/react";
import {
  FiStar,
} from 'react-icons/fi'
import HeaderPapers from "@/components/header_papers";
import Link from "next/link";
import SidebarWithHeader from "@/components/sidebar";
import { useAuthContext } from "@/libs/provider/authContextProvider";
import { paperData } from "@/app/utils/type";
import { deleteLike, getLikes, updateLike } from "@/app/libs/firebase/likes";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/libs/firebase/store";
import styles from "@/styles/animation.module.css"

function colorCitationCount (count: string | null) {
  if(count) {
    if(Number(count) > 10000) {
      return styles.gold
    } else if (Number(count) > 5000) {
      return styles.silver
    } else if (Number(count) > 1000) {
      return styles.bronze
    }
  }
} 

export default function ListPapersWithHeaderSideBar({
  mode, keyword_or_id,
}: {
  mode: string, keyword_or_id: string
}) {
  const [papers, setPapers] = useState<paperData[]>([]);
  const user = useAuthContext()

  useEffect(() => {
    if (user.user){
      fetchDataWithLogin(user.user.uid)
    } else {
      fetchData()
    }

    async function fetchDataWithLogin(UID: string) {
      if(mode == "search"){
        const response = await fetch(`/api/search/${keyword_or_id}`);
        const data = await response.json();
        getLike(UID)
        setPapers(data.data.data);
      } else if(mode == "reference") {
        const response = await fetch(`/api/reference/${keyword_or_id}`);
        const data = await response.json();
        getLike(UID)
        setPapers(data.data.reference_papers);
      } else if (mode == "favorites") {
        const docRef = doc(db, "users", keyword_or_id)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          setPapers(docSnap.data().likes as paperData[])
        }
      }
    }

    async function fetchData() {
      if(mode == "search"){
        const response = await fetch(`/api/search/${keyword_or_id}`);
        const data = await response.json();
        setPapers(data.data.data);
      } else if(mode == "reference") {
        const response = await fetch(`/api/reference/${keyword_or_id}`);
        const data = await response.json();
        setPapers(data.data.reference_papers);
      } else if (mode == "favorites") {
        const docRef = doc(db, "users", keyword_or_id)
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
  
  }, [user.user?.uid]);

  const pushLikeButton = async (paper: paperData) => {
      if(!user.user){
        return console.log("No User")
      }

      if(paper.isLike){
        await deleteLike(user.user.uid, paper)
        setPapers((prevState) => prevState.map((obj) => obj.paperId == paper.paperId ? {...obj, isLike: false}: obj))
      } else {
        await updateLike(user.user.uid, paper)
        setPapers((prevState) => prevState.map((obj) => obj.paperId == paper.paperId ? {...obj, isLike: true}: obj))
      }
    }

  const myCallback = (run: any) => {
    return run()
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
            <SimpleGrid columns={{base: 1, md: 2, xl: 3}} spacing={4}>
              {myCallback(() => {
                const list = [];
                for (const paper of papers) {
                  list.push(
                      <Box key={paper.paperId} >
                        <Card className={colorCitationCount(paper.citationCount)}>
                          <Link href={`/reference/${paper.paperId}`}>
                            <CardHeader _hover={{
                            color: "blue.400",
                            fontSize: "xl",
                            cursor: "pointer",
                            }}>
                              <Heading size="md">{paper.title}</Heading>
                            </CardHeader>
                          </Link>
                          <CardBody>
                            <Stack divider={<StackDivider />} spacing="4">
                              <Box>
                                <Heading size="xs" textTransform="uppercase">
                                  TLDR
                                </Heading>
                                <Text pt="2" fontSize="sm">
                                  {paper.tldr}
                                </Text>
                              </Box>
                              <Stack direction={"row"} spacing="4">
                                <Box>
                                  <Heading size="xs" textTransform="uppercase">
                                    Citations
                                  </Heading>
                                  <Text pt="2" fontSize="sm">
                                    {paper.citationCount}
                                  </Text>
                                </Box>
                                <Box>
                                  <Heading size="xs" textTransform="uppercase">
                                    Year
                                  </Heading>
                                  <Text pt="2" fontSize="sm">
                                    {paper.year}
                                  </Text>
                                </Box>
                                <Spacer />
                                {user.user && (
                                  <Box>
                                    <IconButton aria-label='like' icon={<FiStar />} onClick={() => pushLikeButton(paper)} bg={"white"} color={paper.isLike ?  "red": "black"}/>
                                  </Box>
                                )
                                }
                              </Stack>
                            </Stack>
                          </CardBody>
                        </Card>
                      </Box>
                  );
                }

                return list;
              })}
            </SimpleGrid>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
}
