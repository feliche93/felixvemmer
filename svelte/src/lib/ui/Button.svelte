<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { cva, type VariantProps } from 'class-variance-authority';

	const buttonVariants = cva('btn', {
		variants: {
			variant: {
				default: '',
				primary: 'btn-primary',
				secondary: 'btn-secondary',
				accent: 'btn-accent',
				ghost: 'btn-ghost',
				link: 'btn-link',
				info: 'btn-info',
				success: 'btn-success',
				warning: 'btn-warning',
				error: 'btn-error',
				primaryOutline: 'btn-outline btn-primary',
				secondaryOutline: 'btn-outline btn-secondary',
				accentOutline: 'btn-outline btn-accent',
				infoOutline: 'btn-outline btn-info',
				successOutline: 'btn-outline btn-success',
				warningOutline: 'btn-outline btn-warning',
				errorOutline: 'btn-outline btn-error',
				glass: 'btn-glass'
			},
			size: {
				default: '',
				xs: 'btn-xs',
				sm: 'btn-sm',
				lg: 'btn-lg',
				responsive: 'responsive'
			},
			shape: {
				default: '',
				circle: 'btn-circle',
				square: 'btn-square'
			}
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
			shape: 'default'
		}
	});

	interface $$Props extends HTMLButtonAttributes, VariantProps<typeof buttonVariants> {}

	export let size: $$Props['size'] = 'default';
	export let variant: $$Props['variant'] = 'default';
	export let shape: $$Props['shape'] = 'default';
</script>

<button {...$$props} class={buttonVariants({ size, variant, shape, class: $$props.class })}>
	<slot />
</button>
