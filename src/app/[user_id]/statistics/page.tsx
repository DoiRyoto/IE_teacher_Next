"use client";

import MyWordCloud from "./myWordCloud";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/store";
import { paperData } from "@/app/utils/type";
import { ParentSize } from '@visx/responsive';
import { Box, Stack } from "@chakra-ui/react";
import HeaderPapers from "@/components/header_papers";
import SidebarWithHeader from "@/components/sidebar";

export default function Home({
  params: { user_id },
}: {
  params: { user_id: string };
}) {
  const [words, setWords] = useState<string>("")
  useEffect(() => {
    async function fetchData() {
        const docRef = doc(db, "users", user_id)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          const likes = docSnap.data().likes as paperData[]
          setWords(likes.map((obj) => obj.tldr).join(" "))
        }
      }

    fetchData()
  
  }, []);

  return (
    <Box>
      <Stack direction={"column"} height="100%">
        <HeaderPapers />
        <Stack direction={"row"} mt={"20"}>
          <Box>
            <SidebarWithHeader />
          </Box>
          <Box width={"100%"}>
            <ParentSize>
              {({ width, height }) => <MyWordCloud width={width} height={height} text={words} />}
            </ParentSize>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
}