import type { GeometryCollection, Topology } from 'topojson-specification';

export async function load({ fetch }) {
	return {
		geojson: (await fetch('https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json').then((r) =>
			r.json()
		)) as Topology<{
			states: GeometryCollection<{ name: string }>;
		}>
	};
}
