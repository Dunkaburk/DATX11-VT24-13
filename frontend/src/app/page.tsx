"use client"
import callAPI from "@/hooks/apiHooks";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import Card from "@/components/Card";

export default function Home() {
  const [cat, useCat] = useState({ "categories": [] }); // https://www.youtube.com/watch?v=v0nvwwdeV6I
  const [assignment, useAssignment] = useState({ "assignments": [] });
  const changeCategory = (category: string) => {
    callAPI({ route: `/api/category/get/${category}`, method: "GET", data: {} }).then((res) => useAssignment(res));
    console.log(assignment);
  }
  useEffect(() => {
    callAPI({ route: "/api/category/getAll", method: "GET", data: {} }).then((res) => useCat(res));
  }, []);
  /* useEffect(() => {

  }, []); */


  return (
    <main className={styles.main}>
      {(cat.categories) ?
        cat.categories.map((category) => (<Card title={category} onClick={(categor) => { changeCategory(categor) }} id={category} key={category} />)) : <div>Loading...</div>}
    </main>
  );
}
