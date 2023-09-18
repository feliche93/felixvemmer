<script>
	import Subtitle from '$ui/Subtitle.svelte';
	import Title from '$ui/Title.svelte';
</script>

<div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
	<!-- <div class="hidden sm:mb-8 sm:flex sm:justify-center">
		<div
			class="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20"
		>
			Announcing our next round of funding. <a href="#" class="font-semibold text-indigo-600"
				><span class="absolute inset-0" aria-hidden="true" />Read more
				<span aria-hidden="true">&rarr;</span></a
			>
		</div>
	</div> -->
	<div class="text-center">
		<Title />
		<Subtitle />
		<div class="mt-10 flex items-center justify-center gap-x-6" />
	</div>
</div>
