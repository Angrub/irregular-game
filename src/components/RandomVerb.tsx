import { createSignal } from "solid-js";
import { Verb } from "@/types";
import { verbs as data } from "@/data";

export function RandomVerb(props: Props) {
	const [status, setStatus] = createSignal<"ASKING" | "DONE" | "FAILD">(
		"ASKING"
	);
	const [verbs] = createSignal<Verb[]>(data);
	const [spanishAnswer, setSpanishAnswer] = createSignal<string>("");
	const [pastAnswer, setPastAnswer] = createSignal<string>("");
	const [participleAnswer, setParticipleAnswer] = createSignal<string>("");

	const total = () => verbs().length;
	const randomIndex = () =>
		total() > 0 ? Math.floor(Math.random() * total()) : 0;
	const [currentVerb, setCurrentVerb] = createSignal<Verb>(
		verbs()[randomIndex()]
	);

	const submit = () => {
		const answer1 = checkAnswer(spanishAnswer(), currentVerb().spanish);
		const answer2 = checkAnswer(pastAnswer(), currentVerb().past);
		const answer3 = checkAnswer(participleAnswer(), currentVerb().participle);

		const done = answer1 && answer2 && answer3;

		if (done) {
			props.done();
			setStatus("DONE");
		} else {
			props.faild();
			setStatus("FAILD");
		}
	};

	const checkAnswer = (userInput: string, correctAnswer: string | string[]) => {
		const normalizedInput = normalize(userInput);
		if (Array.isArray(correctAnswer)) {
			for (const opt of correctAnswer) {
				if (opt == normalizedInput) {
					return true;
				}
			}

			return false;
		} else {
			return normalizedInput == correctAnswer;
		}
	};

	const normalize = (value: string) => {
		return stripAccents(value.toLowerCase().trim());
	};

	const stripAccents = (s: string) =>
		s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

	const reset = () => {
		setStatus("ASKING");
		setCurrentVerb(verbs()[randomIndex()]);
		setSpanishAnswer("");
		setPastAnswer("");
		setParticipleAnswer("");
	};

	const showCorrectAnswer = (value: string | string[]) => {
		if (Array.isArray(value)) {
			return value.join(", ");
		}

		return value;
	};

	return (
		<>
			{status() === "ASKING" && (
				<div class="w-full max-w-md mx-auto rounded-xl border border-neutral-800 bg-neutral-900/80 backdrop-blur shadow-lg">
					<div class="px-6 py-4 border-b border-neutral-800">
						<h2 class="text-neutral-100 text-lg font-semibold text-center tracking-tight">
							Verb
						</h2>
					</div>
					<div class="px-6 py-8">
						<div class="text-center space-y-6">
							<div class="space-y-2">
								<p class="text-sm uppercase tracking-wider text-neutral-400">
									Present
								</p>
								<p class="text-4xl font-bold text-neutral-50">
									{currentVerb().present ?? "—"}
								</p>
							</div>

							<form
								onSubmit={(e) => {
									e.preventDefault();
									submit();
								}}
								class="space-y-4"
							>
								<div class="space-y-2">
									<label class="block text-sm font-medium text-neutral-300 text-left">
										Pasado Simple
									</label>
									<input
										type="text"
										value={pastAnswer()}
										onInput={(e) => setPastAnswer(e.currentTarget.value)}
										class="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent"
										placeholder="Ej: went, was/were"
									/>
								</div>

								<div class="space-y-2">
									<label class="block text-sm font-medium text-neutral-300 text-left">
										Participio
									</label>
									<input
										type="text"
										value={participleAnswer()}
										onInput={(e) => setParticipleAnswer(e.currentTarget.value)}
										class="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent"
										placeholder="Ej: gone, been"
									/>
								</div>

								<div class="space-y-2">
									<label class="block text-sm font-medium text-neutral-300 text-left">
										Traducción al Español
									</label>
									<input
										type="text"
										value={spanishAnswer()}
										onInput={(e) => setSpanishAnswer(e.currentTarget.value)}
										class="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent"
										placeholder="Ej: ir, ser ó estar"
									/>
								</div>

								<button
									type="submit"
									class="w-full py-2 px-4 bg-neutral-700 hover:bg-neutral-600 text-neutral-100 font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 focus:ring-offset-neutral-900"
								>
									Verificar Respuestas
								</button>
							</form>
						</div>
					</div>
				</div>
			)}

			{status() === "DONE" && (
				<div class="w-full max-w-md mx-auto rounded-xl border border-green-700 bg-neutral-900/80 backdrop-blur shadow-lg">
					<div class="px-6 py-4 border-b border-green-700 bg-green-900/20">
						<h2 class="text-green-400 text-lg font-semibold text-center tracking-tight">
							¡Correcto!
						</h2>
					</div>
					<div class="px-6 py-8">
						<div class="text-center space-y-6">
							<div class="space-y-4">
								<div class="text-6xl text-green-400">🎉</div>
								<p class="text-neutral-100 text-lg">¡Excelente trabajo!</p>
								<p class="text-neutral-400">
									Has acertado todas las respuestas
								</p>
							</div>

							<div class="space-y-3 text-left">
								<div class="p-3 bg-neutral-800 rounded-lg">
									<p class="text-sm text-neutral-400">Verbo en Presente</p>
									<p class="text-neutral-100 font-medium">
										{showCorrectAnswer(currentVerb().present)}
									</p>
								</div>
								<div class="p-3 bg-neutral-800 rounded-lg">
									<p class="text-sm text-neutral-400">Pasado Simple</p>
									<p class="text-neutral-100 font-medium">
										{showCorrectAnswer(currentVerb().past)}
									</p>
								</div>
								<div class="p-3 bg-neutral-800 rounded-lg">
									<p class="text-sm text-neutral-400">Participio</p>
									<p class="text-neutral-100 font-medium">
										{showCorrectAnswer(currentVerb().participle)}
									</p>
								</div>
								<div class="p-3 bg-neutral-800 rounded-lg">
									<p class="text-sm text-neutral-400">Traducción al Español</p>
									<p class="text-neutral-100 font-medium">
										{showCorrectAnswer(currentVerb().spanish)}
									</p>
								</div>
							</div>

							<button
								onClick={reset}
								class="w-full py-3 px-6 bg-green-600 hover:bg-green-500 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-neutral-900"
							>
								Siguiente Verbo
							</button>
						</div>
					</div>
				</div>
			)}

			{status() === "FAILD" && (
				<div class="w-full max-w-md mx-auto rounded-xl border border-red-700 bg-neutral-900/80 backdrop-blur shadow-lg">
					<div class="px-6 py-4 border-b border-red-700 bg-red-900/20">
						<h2 class="text-red-400 text-lg font-semibold text-center tracking-tight">
							Incorrecto
						</h2>
					</div>
					<div class="px-6 py-8">
						<div class="text-center space-y-6">
							<div class="space-y-4">
								<div class="text-6xl text-red-400">❌</div>
								<p class="text-neutral-100 text-lg">No te rindas</p>
								<p class="text-neutral-400">
									Aquí están las respuestas correctas
								</p>
							</div>

							<div class="space-y-3 text-left">
								<div class="p-3 bg-neutral-800 rounded-lg">
									<p class="text-sm text-neutral-400">Verbo en Presente</p>
									<p class="text-neutral-100 font-medium">
										{showCorrectAnswer(currentVerb().present)}
									</p>
								</div>
								<div class="p-3 bg-neutral-800 rounded-lg">
									<p class="text-sm text-neutral-400">Pasado Simple</p>
									<p class="text-neutral-100 font-medium">
										{showCorrectAnswer(currentVerb().past)}
									</p>
								</div>
								<div class="p-3 bg-neutral-800 rounded-lg">
									<p class="text-sm text-neutral-400">Participio</p>
									<p class="text-neutral-100 font-medium">
										{showCorrectAnswer(currentVerb().participle)}
									</p>
								</div>
								<div class="p-3 bg-neutral-800 rounded-lg">
									<p class="text-sm text-neutral-400">Traducción al Español</p>
									<p class="text-neutral-100 font-medium">
										{showCorrectAnswer(currentVerb().spanish)}
									</p>
								</div>
							</div>

							<button
								onClick={reset}
								class="w-full py-3 px-6 bg-red-600 hover:bg-red-500 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-neutral-900"
							>
								Intentar Otro Verbo
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

interface Props {
	done: () => void;
	faild: () => void;
}
