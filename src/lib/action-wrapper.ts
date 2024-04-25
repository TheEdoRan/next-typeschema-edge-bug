import { Infer, InferIn, Schema, validate } from "@typeschema/main";

export const defineAction = <const S extends Schema, const Data>(
	s: S,
	serverCodeFn: (parsedInput: Infer<S>) => Promise<Data>
) => {
	return async (clientInput: InferIn<S>) => {
		// `validate` causes an error with the edge runtime.
		// If you try to comment this out and use the line below, it works.
		const parsedInput = await validate(s, clientInput);
		// const parsedInput = { success: true, data: clientInput, issues: [] };

		if (!parsedInput.success) {
			console.error("Invalid input:", parsedInput.issues);
			return { validationError: parsedInput.issues };
		}

		return serverCodeFn(parsedInput.data);
	};
};
