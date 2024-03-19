import CodeEditor from "@/components/CodeEditor";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box } from '@chakra-ui/react';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Component {...pageProps} />
		</>
	);
}