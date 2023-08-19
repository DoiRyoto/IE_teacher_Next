"use client";

import ListPapersWithHeaderSideBar from "@/components/listPapersWithHeaderSideBar";

export default function Home({
  params: { user_id },
}: {
  params: { user_id: string };
}) {
  return (
    <ListPapersWithHeaderSideBar mode="favorites" keyword_or_id={user_id}/>
  );
}