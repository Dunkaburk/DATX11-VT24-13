"use client"
import callAPI from "@/hooks/apiHooks";
import styles from "./page.module.css";
import { useState, useEffect } from "react";

export default function Home() {
  const [ass, useAss] = useState('');

  useEffect(() => {
    callAPI({ route: "/api/student/getAll", method: "GET", data: {} }).then((res) => useAss(res));
  }, []);

  return (
    <main className={styles.main}>
      {ass}
    </main>
  );
}
