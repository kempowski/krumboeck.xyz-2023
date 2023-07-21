<script>
    import { onMount } from "svelte";
	import { adresse, showWork } from '../stores.js';
    import Galerie from "./Galerie.svelte";
    import Credits from "./Credits.svelte";
    import SvelteMarkdown from 'svelte-markdown';


    export let idProject;
    // console.log(idProject)

    let workDataStr = `${adresse}/api/projects/${idProject}?populate=*`
    let coverURL = "";
    $: gal = "";

    let workData = [];
    $: parsing = "";
    $: meta = "";

    onMount(async function(){
        const response = await fetch(workDataStr);
        const data = await response.json();
        workData = data.data.attributes;
        gal = workData.Galerie.data;
        coverURL = adresse + workData.Cover.data.attributes.url;
        parsing = workData.Description;
        meta = workData.metaInfos;
        console.log(meta)
    })

    // $: console.log(meta)


    let hideWork = () =>{
        showWork.set(0);
        // console.log("hih")
    }

    let links = document.querySelectorAll("#description p a");
    // for (var i = 0; i < links.length; i++) {
    //     if (links[i].hostname != window.location.hostname) {
    //         links[i].target = "_blank";
    //     }
    // }
</script>

<div id="workPageContent">
    <div id="back" on:click={hideWork}>zurück</div>
    <!-- svelte-ignore a11y-missing-attribute -->
    <img src={coverURL}>
    <div id="titel">
        <h1>{workData.Titel}</h1>
        <h2>{workData.kurzBezeichnung}</h2>
        <h3>{workData.zeitraum}</h3>
    </div>

    <div id="description">
        {#if parsing.length > 0}
            <SvelteMarkdown source={parsing}/>
        {/if}
    </div>

    <Galerie {idProject}/>
    
    {#if meta !== null}
        <Credits {meta}/>
    {/if}

    
</div>

<style>
    *{
        color: #202020;
        margin: 0;
        text-align: left;
        font-family: "radikal";
    }
    #back{
        position: fixed;
        top: 2rem;
        left: 2rem;
        font-size: 20px;
        cursor: pointer;
    }
    #workPageContent{
        max-width: 1200px;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
        grid-template-rows: auto;
        grid-gap: 20px;
        margin: auto;
    }
    img {
        width: 100%;
        grid-column: 1/8;
    }
    #titel{
        align-self: end;
        grid-column: 8/11;

    }
    h3{
        letter-spacing: 0.15rem;
    }
    #description{
        grid-column: 3/11;
        font-size: 20px;
        margin-top: 50px;
        margin-bottom: 50px;
    }
    :global(#description p a) {
        text-decoration: underline;
        text-decoration-thickness: 1px;
        transition: all 0.2s linear;
    }
    :global(#description p a:hover){
        text-decoration-thickness: 3px;
    }
</style>