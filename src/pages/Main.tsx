import { ParentComponent } from "solid-js"

export const MainPage: ParentComponent = (props) => {

	return (
		<main class="min-h-screen w-full bg-neutral-950 text-neutral-100 flex flex-col justify-center items-center p-6">
			{ props.children }
		</main>
	)
}