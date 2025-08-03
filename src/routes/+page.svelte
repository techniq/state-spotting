<script>
	import { Chart, GeoPath, Layer } from 'layerchart';
	import { geoAlbersUsa } from 'd3-geo';
	import { feature } from 'topojson-client';
	import { cls } from '@layerstack/tailwind';

	let { data } = $props();
	const states = feature(data.geojson, data.geojson.objects.states);

	const selectedState = $state({
		Alabama: true,
		Alaska: false,
		Arizona: true,
		Arkansas: true,
		California: true,
		Colorado: true,
		Connecticut: true,
		Delaware: true,
		Florida: true,
		Georgia: true,
		Hawaii: false,
		Idaho: true,
		Illinois: true,
		Indiana: true,
		Iowa: true,
		Kansas: true,
		Kentucky: true,
		Louisiana: true,
		Maine: true,
		Maryland: true,
		Massachusetts: true,
		Michigan: true,
		Minnesota: true,
		Mississippi: true,
		Missouri: true,
		Montana: true,
		Nebraska: true,
		Nevada: true,
		'New Hampshire': true,
		'New Jersey': true,
		'New Mexico': false,
		'New York': true,
		'North Carolina': true,
		'North Dakota': true,
		Ohio: true,
		Oklahoma: true,
		Oregon: false,
		Pennsylvania: true,
		'Rhode Island': true,
		'South Carolina': true,
		'South Dakota': true,
		Tennessee: true,
		Texas: true,
		Utah: false,
		Vermont: false,
		Virginia: true,
		Washington: true,
		'West Virginia': true,
		Wisconsin: true,
		Wyoming: true
	});
	// Ontario
</script>

<div class="h-[800px] p-4">
	<Chart
		geo={{
			projection: geoAlbersUsa,
			fitGeojson: states
		}}
	>
		<Layer type="svg">
			{#each states.features as state}
				<GeoPath
					geojson={state}
					class={cls(
						'stroke-surface-300',
						// @ts-expect-error
						selectedState[state.properties.name]
							? 'fill-success hover:fill-success/90'
							: 'fill-surface-content/10 hover:fill-surface-content/20'
						// : 'fill-surface-300 hover:fill-surface-300/90'
						// 'fill-danger hover:fill-danger/90'
					)}
					onclick={() => {
						// @ts-expect-error
						selectedState[state.properties.name] = !selectedState[state.properties.name];
					}}
				/>
			{/each}
		</Layer>
	</Chart>
</div>
