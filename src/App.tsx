import { createSignal, type Component } from "solid-js";

import { MainPage } from "./pages/Main";
import { RandomVerb } from "./components";

const App: Component = () => {
	const [score, setScore] = createSignal(0);

	const add = () => setScore((prev) => prev + 1);
	const restart = () => setScore(0);

	return (
		<MainPage>
			<div class="w-full max-w-md mx-auto mb-6">
				<div class="text-center space-y-2">
					<p class="text-sm uppercase tracking-wider text-neutral-400">Puntaje</p>
					<p class="text-3xl font-bold text-neutral-50">{score()}</p>
				</div>
			</div>
			
			<RandomVerb done={add} faild={restart} />
		</MainPage>
	);
};

export default App;
