"use server";

import { defineAction } from "@/lib/action-wrapper";
import { z } from "zod";

const schema = z.object({
	username: z.string().min(3).max(10),
});

export const testAction = defineAction(schema, async (input) => {
	return {
		message: `Hi ${input.username}!`,
	};
});
