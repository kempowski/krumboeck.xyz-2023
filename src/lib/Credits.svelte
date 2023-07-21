<script>
    import { onMount } from "svelte";
    import SvelteMarkdown from 'svelte-markdown';

    export let meta;
    console.log(meta)
</script>

<div id="credits">
    <SvelteMarkdown source={meta}/>
</div>

<style>
    #credits{
        grid-row: 4;
        grid-column: 6/10;
        font-size: 12px;
        letter-spacing: 1px;
    }
</style>