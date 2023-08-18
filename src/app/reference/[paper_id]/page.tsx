"use client";

import ListPapersWithHeaderSideBar from "@/components/listPapersWithHeaderSideBar";

export default function Home({
  params: { paper_id },
}: {
  params: { paper_id: string };
}) {
  return (
    <ListPapersWithHeaderSideBar mode="reference" keyword_or_id={paper_id}/>
  );
}
