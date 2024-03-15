"use client";
import callAPI from "@/hooks/apiHooks";
import styles from "./index.module.css";
import { useState, useEffect } from "react";
import Card from "@/components/Card";
import Link from "next/link";
type module = { name: string; }

export default function Home() {
  const [module, useModule] = useState([]); // https://www.youtube.com/watch?v=v0nvwwdeV6I
  const [task, useTask] = useState([]);
  const changeCategory = (category: string) => {
    callAPI({
      route: `/api/category/get/${category}`,
      method: "GET",
      data: {},
    }).then((res) => {
      useTask(res);
      console.log(res);
    });
  };
  useEffect(() => {
    callAPI({ route: "/api/module/getModules", method: "GET", data: {} }).then(
      (res) => {
        useModule(res);
      }
    );
  }, []);

  return (
    <main className={styles.main}>
      <div
        className={
          task.length > 0
            ? styles.assignmentWheel
            : styles.assignmentList
        }>
        {module.length > 0 ? (
          module.map((mod: module) => (
            <Card
              title={mod.name}
              onClick={(mod) => {
                changeCategory(mod);
              }}
              id={mod.name}
              key={mod.name}
            />
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
      {task.length > 0 ? (
        task.map((tas) => (
          <Link href={`/assignments/${tas}`}>
            <Card title={tas} id={tas} key={tas} />
          </Link>
        ))
      ) : (
        <></>
      )}
    </main>
  );
}
