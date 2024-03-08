"use client"
import callAPI from "@/hooks/apiHooks";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import Card from "@/components/Card";

export default function Home() {
  const [cat, useCat] = useState({ "categories": [] }); // https://www.youtube.com/watch?v=v0nvwwdeV6I

  useEffect(() => {
    callAPI({ route: "/api/category/getAll", method: "GET", data: {} }).then((res) => useCat(res));
  }, []);

  return (
    <main className={styles.main}>
      {(cat.categories) ?
        cat.categories.map((category) => (<Card title={category} onClick={() => { console.log("Hej =)"); }} id={""} key={category} />)) : <div>Loading...</div>}
    </main>
  );
}
