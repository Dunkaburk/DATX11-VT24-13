"use client";
import callAPI from "@/hooks/apiHooks";
import styles from "./index.module.css";
import { useState, useEffect } from "react";
import Card from "@/components/Card";
import Link from "next/link";

export default function Home() {
  const [module, useModule] = useState([]); // https://www.youtube.com/watch?v=v0nvwwdeV6I
  const [task, useTask] = useState([]);
  const changeCategory = (category: string) => {
    console.log(category);
    callAPI({
      route: `/api/moduule/getModules`,
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
          task
            ? styles.assignmentList
            : styles.assignmentWheel
        }>
        {module.length > 0 ? (
          module.map((mod: any) => (
            <Card
              title={mod.name}
              onClick={(mod) => {
                changeCategory(mod);
              }}
              classname={styles.moduleCard}
              id={mod.name}
              key={mod.name}
            />
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>

      {task ? (
        task.map((tas) => (
          <Link key={tas} href={`/assignments/${tas}`}>
            <Card title={tas} id={tas} key={tas} />
          </Link>
        ))
      ) : (
        <></>
      )
      }
    </main >
    
  );
}
