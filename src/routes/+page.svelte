<script>
	import { Chart, GeoPath, Layer, Text } from 'layerchart';
	import { geoAlbersUsa } from 'd3-geo';
	import { feature } from 'topojson-client';
	import { cls } from '@layerstack/tailwind';
	import { cubicOut } from 'svelte/easing';

	let { data } = $props();
	const states = feature(data.geojson, data.geojson.objects.states);

	const selectedState = $state({
		Alabama: false,
		Alaska: false,
		Arizona: false,
		Arkansas: false,
		California: false,
		Colorado: false,
		Connecticut: false,
		Delaware: false,
		Florida: false,
		Georgia: false,
		Hawaii: false,
		Idaho: false,
		Illinois: false,
		Indiana: false,
		Iowa: false,
		Kansas: false,
		Kentucky: false,
		Louisiana: false,
		Maine: false,
		Maryland: false,
		Massachusetts: false,
		Michigan: false,
		Minnesota: false,
		Mississippi: false,
		Missouri: false,
		Montana: false,
		Nebraska: false,
		Nevada: false,
		'New Hampshire': false,
		'New Jersey': false,
		'New Mexico': false,
		'New York': false,
		'North Carolina': false,
		'North Dakota': false,
		Ohio: false,
		Oklahoma: false,
		Oregon: false,
		Pennsylvania: false,
		'Rhode Island': false,
		'South Carolina': false,
		'South Dakota': false,
		Tennessee: false,
		Texas: false,
		Utah: false,
		Vermont: false,
		Virginia: false,
		Washington: false,
		'West Virginia': false,
		Wisconsin: false,
		Wyoming: false
	});
	// Ontario

	const abbreviations = {
		Alabama: 'AL',
		Alaska: 'AK',
		Arizona: 'AZ',
		Arkansas: 'AR',
		California: 'CA',
		Colorado: 'CO',
		Connecticut: 'CT',
		Delaware: 'DE',
		Florida: 'FL',
		Georgia: 'GA',
		Hawaii: 'HI',
		Idaho: 'ID',
		Illinois: 'IL',
		Indiana: 'IN',
		Iowa: 'IA',
		Kansas: 'KS',
		Kentucky: 'KY',
		Louisiana: 'LA',
		Maine: 'ME',
		Maryland: 'MD',
		Massachusetts: 'MA',
		Michigan: 'MI',
		Minnesota: 'MN',
		Mississippi: 'MS',
		Missouri: 'MO',
		Montana: 'MT',
		Nebraska: 'NE',
		Nevada: 'NV',
		'New Hampshire': 'NH',
		'New Jersey': 'NJ',
		'New Mexico': 'NM',
		'New York': 'NY',
		'North Carolina': 'NC',
		'North Dakota': 'ND',
		Ohio: 'OH',
		Oklahoma: 'OK',
		Oregon: 'OR',
		Pennsylvania: 'PA',
		'Rhode Island': 'RI',
		'South Carolina': 'SC',
		'South Dakota': 'SD',
		Tennessee: 'TN',
		Texas: 'TX',
		Utah: 'UT',
		Vermont: 'VT',
		Virginia: 'VA',
		Washington: 'WA',
		'West Virginia': 'WV',
		Wisconsin: 'WI',
		Wyoming: 'WY'
	};
</script>

<div class="h-[800px] p-4">
	<Chart
		geo={{
			projection: geoAlbersUsa,
			fitGeojson: states
		}}
		transform={{
			mode: 'canvas',
			initialScrollMode: 'scale',
			motion: { type: 'tween', duration: 800, easing: cubicOut }
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

			{#each states.features as state}
				{#if selectedState[state.properties.name]}
					<GeoPath geojson={state}>
						{#snippet children({ geoPath })}
							{@const [x, y] = geoPath?.centroid(state) ?? [0, 0]}
							<Text
								{x}
								{y}
								dy={-4}
								value={abbreviations[state.properties.name]}
								textAnchor="middle"
								verticalAnchor="middle"
								class="pointer-events-none stroke-surface-100 stroke-2 text-lg"
							/>
							<Text
								{x}
								{y}
								dy={6}
								value={state.properties.name}
								textAnchor="middle"
								verticalAnchor="middle"
								class="pointer-events-none fill-surface-content stroke-surface-100 stroke-2 text-[8px]"
							/>
						{/snippet}
					</GeoPath>
				{/if}
			{/each}
		</Layer>
	</Chart>
</div>
