<script>
    import { onMount } from "svelte";
	import { adresse } from '../stores.js';

    export let idProject;

    let galDataStr = `${adresse}/api/projects/${idProject}?populate=Galerie`;
    let galitems = [];
    $: galLoad = false;

    onMount(async function(){
        const response = await fetch(galDataStr);
        const data = await response.json();
        let galData = data.data.attributes;
        galitems = galData.Galerie.data;
        // console.log(galitems);
        if( galitems == null){
            galitems = false;
        } else {
            galLoad = true;
        }
    })

</script>

{#if galLoad}
    <div id="gal">
        <div id="big">
            <img src="{adresse + galitems[0].attributes.url}">
        </div>
        <div id="small">
            {#each galitems as galitem, ix}
                {#if ix !== 0}
                    <img  class="galSmall" src="{adresse + galitem.attributes.url}">
                {/if}
            {/each}
        </div>
    </div>
{/if}
    
<style>
    @media (min-width: 768px) {
        #gal {
            width: 100%;
            grid-column: 2/10;
        }

        #gal img{
            width: 100%;
        }
        #big{
                width: 100%;
            }
        #small{
            width: 100%;
            display: flex;
            justify-content: space-between;
            margin-top: -20px;
        }
        .galSmall {
            width: 100%;
        }
    }
    @media (max-width: 767px) {
        
    }
</style>