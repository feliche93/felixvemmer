<script lang="ts">
	import Hero from '$lib/compoents/hero/Hero.svelte';
	import Button from '$ui/Button.svelte';
	import Subtitle from '$ui/Subtitle.svelte';
	import Title from '$ui/Title.svelte';
</script>

<Title>
	Welcome to my <span
		class="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
		>personal website</span
	>
</Title>
<Subtitle>
	Hey there! 👋 I'm Felix Vemmer, the person behind this blog. Here, you'll find
	straight-to-the-point insights and practical advice on Python, TypeScript, and all things
	full-stack.
</Subtitle>
<Button size={'lg'} variant={'primary'}>Test</Button>

<Hero />
