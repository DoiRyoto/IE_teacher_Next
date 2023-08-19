"use client";

import ListPapersWithHeaderSideBar from "@/components/listPapersWithHeaderSideBar";

export default function Home({
  params: { keyword },
}: {
  params: { keyword: string };
}) {
  console.log("こいつが呼ばれる search")
  return (
    <ListPapersWithHeaderSideBar mode="search" keyword_or_id={keyword}/>
  );
}