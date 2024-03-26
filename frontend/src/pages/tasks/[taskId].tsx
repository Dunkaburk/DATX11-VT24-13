"use client"
import callAPI from "@/hooks/apiHooks";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


export default function Home() {
	const router = useRouter();
	const [task, loadTask] = useState({ modules: [] });
	useEffect(() => {
		callAPI({ route: `/api/task/getTask/${router.query.taskId}`, method: "GET", data: {} }).then(
			(res) => {
				loadTask(res);
			}
		);
	}, []);

	return (
		<>
			{router.query.taskId}:
		</>
	);
}
