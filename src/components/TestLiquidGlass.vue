<script lang="ts" setup>


</script>

<template>
	<div class='test'>
		<div class='card'>
			<div class='card_inner'>
				here
			</div>
		</div>
	</div>
</template>

<style>
.test {
	width: 100vw;
	height: 100svh;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
}

.test .card {
	position: relative;
	width: 30rem;
	height: 10rem;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	border-radius: 99em ;
	background-color: color-mix(in srgb, #bbbbbc 12%, transparent);
	box-shadow: inset 0 0 0 1px
			color-mix(
				in srgb,
				#fff calc(0.3 * 10%),
				transparent
			),
		inset 1.8px 3px 0px -2px color-mix(in srgb, #fff
					calc(0.3 * 90%), transparent),
		inset -2px -2px 0px -2px color-mix(in srgb, #fff
					calc(0.3 * 80%), transparent),
		inset -3px -8px 1px -6px color-mix(in srgb, #fff
					calc(0.3 * 60%), transparent),
		inset -0.3px -1px 4px 0px
			color-mix(
				in srgb,
				#000 calc(2 * 12%),
				transparent
			),
		inset -1.5px 2.5px 0px -2px
			color-mix(
				in srgb,
				#000 calc(2 * 20%),
				transparent
			),
		inset 0px 3px 4px -2px color-mix(in srgb, #000
					calc(2 * 20%), transparent),
		inset 2px -6.5px 1px -4px
			color-mix(
				in srgb,
				#000 calc(2 * 10%),
				transparent
			),
		0px 1px 5px 0px
			color-mix(
				in srgb,
				#000 calc(2 * 10%),
				transparent
			),
		0px 6px 16px 0px
			color-mix(
				in srgb,
				#000 calc(2 * 8%),
				transparent
			);

}

.card_inner {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	width: calc(100% - 1rem);
	height: calc(100% - 1rem);
	border-radius: 99em;
	background-color: color-mix(in srgb, #bbbbbc 36%, transparent);
	z-index: -1;
	box-shadow: inset 0 0 0 1px
			color-mix(
				in srgb,
				#fff calc(0.3 * 10%),
				transparent
			),
		inset 2px 1px 0px -1px color-mix(in srgb, #fff
					calc(0.3 * 90%), transparent),
		inset -1.5px -1px 0px -1px color-mix(in srgb, #fff
					calc(0.3 * 80%), transparent),
		inset -2px -6px 1px -5px color-mix(in srgb, #fff
					calc(0.3 * 60%), transparent),
		inset -1px 2px 3px -1px
			color-mix(
				in srgb,
				#000 calc(2 * 20%),
				transparent
			),
		inset 0px -4px 1px -2px
			color-mix(
				in srgb,
				#000 calc(2 * 10%),
				transparent
			),
		0px 3px 6px 0px
			color-mix(
				in srgb,
				#000 calc(2 * 8%),
				transparent
			);
}
</style>

