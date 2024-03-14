"use client";
import callAPI from "@/hooks/apiHooks";
import styles from "./index.module.css";
import { useState, useEffect } from "react";
import Card from "@/components/Card";
import Link from "next/link";

export default function Home() {
  const [cat, useCat] = useState({ categories: [] }); // https://www.youtube.com/watch?v=v0nvwwdeV6I
  const [assignment, useAssignment] = useState({ assignments: [] });
  const changeCategory = (category: string) => {
    callAPI({
      route: `/api/category/get/${category}`,
      method: "GET",
      data: {},
    }).then((res) => {
      useAssignment(res);
      console.log(res);
    });
  };
  useEffect(() => {
    callAPI({ route: "/api/category/getAll", method: "GET", data: {} }).then(
      (res) => {
        useCat(res);
      }
    );
  }, []);

  return (
    <main className={styles.main}>
      <div
        className={
          assignment.assignments.length > 0
            ? styles.assignmentWheel
            : styles.assignmentList
        }>
        {cat.categories ? (
          cat.categories.map((category) => (
            <Card
              title={category}
              onClick={(categor) => {
                changeCategory(categor);
              }}
              id={category}
              key={category}
            />
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
      {assignment.assignments ? (
        assignment.assignments.map((assignment) => (
          <Link href={`/assignments/${assignment}`}>
            <Card title={assignment} id={assignment} key={assignment} />
          </Link>
        ))
      ) : (
        <></>
      )}
    </main>
  );
}
