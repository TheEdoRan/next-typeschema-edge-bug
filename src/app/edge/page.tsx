"use client";

import { useState } from "react";
import { testAction } from "../actions";
import Link from "next/link";

export const runtime = "edge";

export default function Home() {
	const [username, setUsername] = useState("");
	const [result, setResult] = useState({});

	return (
		<main className="flex flex-col items-center justify-between p-24">
			<h1 className="text-4xl">TypeSchema Edge Test</h1>
			<input
				onChange={(e) => setUsername(e.target.value)}
				className="border py-1 px-2 rounded mt-4"
				type="text"
				name="username"
				placeholder="Username"
			/>
			<button
				onClick={async (e) => {
					e.preventDefault();
					const res = await testAction({ username });
					setResult(res);
					console.log("result:", res);
				}}
				type="button"
				className="mt-4 rounded bg-black text-white px-3 py-2">
				Submit
			</button>
			<Link className="text-blue-500 text-lg mt-4" href="/">
				Go to Node Test
			</Link>
			<div className="mt-6 w-full max-w-md">
				<p className="text-lg">Result:</p>
				<pre>{JSON.stringify(result, null, 1)}</pre>
			</div>
		</main>
	);
}
