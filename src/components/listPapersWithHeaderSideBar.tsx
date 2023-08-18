"use client";

import React, { useState, useEffect } from "react";
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
  const [likePapers, setLikePapers] = useState<paperData[]>([]);
  const [uid, setUid] = useState<string>("");
  const user = useAuthContext()

  useEffect(() => {
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
        getLike()
      }
    }

    async function getLike() {
      const docRef = doc(db, "users", keyword_or_id)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setPapers(docSnap.data().likes as paperData[])
      }
    }
    
    fetchData()
  }, []);

  useEffect(() => {
    if (user.user){
      setUid(user.user.uid)
      getL()
    } else {
      setUid("")
    }

    async function getL() {
      if (user.user){
        const likes = await getLikes(user.user.uid)
        adaptLikes(likes.map((obj) => obj.paperId))
        setLikePapers(likes)
      }
    }

    async function adaptLikes(lp: string[]) {
      await setPapers((prevState) => prevState.map((obj) => lp.includes(obj.paperId) ? {...obj, isLike: true}: {...obj, isLike: false}))
    }
  }, [user.user?.uid]);

  const pushLikeButton = async (paper: paperData) => {
      if(uid == ""){
        return console.log("No User")
      }

      if(paper.isLike){
        await deleteLike(uid, paper)
        setPapers((prevState) => prevState.map((obj) => obj.paperId == paper.paperId ? {...obj, isLike: false}: obj))
      } else {
        await updateLike(uid, paper)
        setPapers((prevState) => prevState.map((obj) => obj.paperId == paper.paperId ? {...obj, isLike: true}: obj))
      }
    }

  const myCallback = (run: any) => {
    return run();
  };

  return (
    <Box>
      <Stack direction={"column"} height="100%">
        <HeaderPapers />
        <Stack direction={"row"}>
          <Box mt={"20"}>
            <SidebarWithHeader />
          </Box>
          <Box p={4} mt={"20"}>
            <SimpleGrid columns={2} spacing={4}>
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
