"use client"
import callAPI from "@/hooks/apiHooks";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


export default function Home() {
	const router = useRouter();
	const [assignment, loadAssignment] = useState({ categories: [] });
	useEffect(() => {
		callAPI({ route: "/api/assignments/getAll", method: "GET", data: {} }).then(
			(res) => {
				loadAssignment(res);
			}
		);
	}, []);

	return (
		<>
			{router.query.assignmentId}:
		</>
	);
}
