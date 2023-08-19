"use client";

import { paperData } from "@/app/utils/type";
import ListPapersWithHeaderSideBar from "@/components/listPapersWithHeaderSideBar";
import { db } from "@/libs/firebase/store";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";

export default function Home({
  params: { user_id },
}: {
  params: { user_id: string };
}) {
  return (
    <ListPapersWithHeaderSideBar mode="favorites" keyword_or_id={user_id}/>
  );
}