"use client"
import { useRouter } from "next/router";


export default function Home() {
	const router = useRouter();
	return (
		<>Hej {router.query.assignmentId}
		</>
	);
}
