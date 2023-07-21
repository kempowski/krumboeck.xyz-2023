<script>
  import Work from "./Work.svelte";
  import { onMount } from "svelte";
	import { adresse, showWork } from '../stores.js';
  import { fade } from 'svelte/transition';


  // export let infos, kategorien;

  // DATEN FETCHEN
  const workPoint = "http://localhost:1337/api/projects?populate=*"
  const katPoint = "http://localhost:1337/api/categories"

  let projects = [];
  let kategorien = [];

  onMount(async function(){

      // LISTEN DATEN
      const responseW = await fetch(workPoint);
      const dataW = await responseW.json();
      projects = dataW.data;
      // console.log(projects[0].attributes.categories.data[0].attributes.Name )
      console.log(projects[0].id )

      // KATEGORIEN DATEN
      const responseK = await fetch(katPoint);
      const dataK = await responseK.json();
      kategorien = dataK.data;      
  })

  // UI 
  let showThumb = false;
  let idProject = ""; 
  let hoverIndex = 0;
  let thumbURL = "";


  // WORKPAGE OEFFNEN
  const openWork = function(idp) {
    showWork.set(1);

    idProject = idp;
    console.log(idProject)
  }

  // THUMBNAILS BEI HOVER
  const thumbIn = function(idx) {
    showThumb = true;
    hoverIndex = idx;   
    thumbURL = projects[hoverIndex].attributes.Cover.data.attributes.url;
    // console.log(idx)
  }
  const thumbOut = function(idx) {
    showThumb = false;
    // console.log("exit")

  }

  // KATEGORIEN FILTER
  let clickedOnKat;
  let prevClicked;
  let katAktiveIx = -1;
  const katFilter = function(clicked, ix) {
    clickedOnKat = clicked.attributes.Name;
    if(clickedOnKat == prevClicked) {
      clickedOnKat = "";
    } 
    prevClicked  = clickedOnKat;
    katAktiveIx = katAktiveIx === ix ? -1 : ix;
  }

  let app; 
  let showW;
  showWork.subscribe((value)=>{
    showW = value;
  })

</script>

<div id="content">
  <!-- ZEIGT SEITE DER JEWEILIGEN ARBEIT -->
  {#if showW == 1 }
    <Work {idProject}/>

  {:else}

  <div class="content">
      <!-- ERSTELLT LISTE VON ARBEITEN -->
      {#each projects as project, ix}
          <h1  
            class:filteredWork={clickedOnKat == project.attributes.categories.data[0].attributes.Name} 
            on:click={() => openWork(project.id)} on:mouseover={() => thumbIn(ix)} on:mouseleave={()=> thumbOut(ix)}>
            {project.attributes.Titel}
          </h1>
      {/each}

      <!-- ERSTELLT KATEGORIEN FILTER -->
      <div id="kategorien">
        {#each kategorien as kat, ix}
          <h2 class="noselect Kat" class:activeKat="{ix == katAktiveIx}" on:click={() => katFilter(kat, ix)}>{kat.attributes.Name}</h2>
        {/each}
      </div>
    </div>

    <!-- THUMBNAILS -->
    {#if showThumb}
      <img id="thumbnail" src="{adresse + thumbURL}" alt="" in:fade>
    {/if}

    <a id="about" href="">über mich</a>
  {/if}
  
 
</div>

<style>
  :global(main){
      height: 100vh;
  }
  #content{
    box-sizing: border-box;
    display: flex;
    width: 100vw;
    padding: 2rem;
    /* justify-content: space-between; */
  }
  h1 {
    width: auto;
    text-align: left;
    margin: 0;
    font-family: radikal;
    color: #cecece;
    line-height: 42px;
    font-size: 2rem;
    text-decoration-thickness: 0px;
    transition: all 0.05s linear;
    mix-blend-mode:exclusion;
  }
  h1:hover {
    text-decoration: underline;
    text-decoration-thickness: 3px;
    cursor: crosshair;
  }
  .content{
    width: 40%;
    height: 100%;
  }
  #thumbnail{
    z-index: -1;
    position: absolute;
    top: 50%;
    left: 70%;

    transform: translate(-50%, -50%);
    max-width: 700px;
    height: fit-content;
    align-self: center;
  }
  #kategorien{
    position: absolute;
    bottom: 0;
    left: 0;
    color: #202020;
    display: flex;
    transition: color 0.25s ease;
  }
  #kategorien{
    padding-left: 1.5rem;
    cursor: pointer;
  }
  #kategorien h2{
    margin-right: 2rem;
    padding: 0rem 0.5rem;
  }
  .filteredWork{
    color: blue;
    mix-blend-mode: normal;
  }
  .Kat {
    background-color: rgba(255, 255, 255, 0);
    transition: all 0.2s linear;
    margin: 0 2rem 2rem 0;
    font-family: "radikalB";
    letter-spacing: 0.03rem;
    font-size: 1.5rem;
  }
  .activeKat{
    background-color: #202020;
    color: aliceblue;
  }
  #about{
    position: absolute;
    right: 2rem;
    bottom: 2rem;
    color: #202020;
    font-family: radikal;
    font-size: 1.5rem;
  }
  .noselect {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}
</style>