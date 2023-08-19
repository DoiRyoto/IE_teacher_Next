"use client";

import ListPapersWithHeaderSideBar from "@/components/listPapersWithHeaderSideBar";

export default function Home({
  params: { keyword },
}: {
  params: { keyword: string };
}) {
  return (
    <ListPapersWithHeaderSideBar mode="search" keyword_or_id={keyword}/>
  );
}