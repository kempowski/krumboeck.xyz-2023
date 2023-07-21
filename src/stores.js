import { writable } from 'svelte/store';

// DEVELOMPENT
export const adresse = "http://localhost:1337"
// LIVESERVER
// export const adresse = "http://krumboeck.xyz"

export let showWork = writable(0);
