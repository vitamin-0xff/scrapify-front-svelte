<script lang="ts">
    import type { _Node } from "./api/types";
  import "./app.css";
  import Card from "./lib/Card.svelte";
    import Diaglog from "./lib/Diaglog.svelte";
    import NodeAPIDisplayModal from "./lib/NodeAPIDisplayModal.svelte";
    import TreeNode from "./lib/TreeNode.svelte";
    import { currentSelectedComponent, selectedElements } from "./store/selected-elements.svelte";
  let areWeLoading = $state(false);
  let urlFormattingError: string | null = $state(null);
  let url: string =  $state("");
  let response = $state<null | _Node>(null);
  let _currentSelectedComponent = $state<_Node | null>(null);

  

  const initState = () => {
    areWeLoading = false;
    urlFormattingError = null;
  };

  $effect(() => {
    selectedElements.subscribe((selectedElements) => {
      console.log("Selected elements updated:", selectedElements);     
    });
  });


  $effect(() => {
    currentSelectedComponent.subscribe((currentComponentToBeAdded) => {
      console.log("Current selected component updated:", currentComponentToBeAdded);     
      _currentSelectedComponent = currentComponentToBeAdded;
    });
  });

  const onRequest = async () => {
    initState();
    const urlRegex = /^(https?:\/\/)([\w-]+\.)+[\w-]+(\/?[\w\-._~:\/?#[\]@!$&'()*+,;=]*)?$/i;
    areWeLoading = true;
    await new Promise((r) => setTimeout(r, 500));
    if(!urlRegex.test(url)) {
      urlFormattingError = "Invalid URL format. Please enter a valid URL.";
      console.log("Invalid URL format. Please enter a valid URL.");
      areWeLoading = false;
      return;
    }
    
    try {
      const data = await fetch(`http://localhost:3001/make-request?url=${encodeURIComponent(url)}`);
      const responseText = await data.text();
      const jsonResponse = JSON.parse(responseText) as {data: _Node};
      console.log("Response received:", jsonResponse);
      response = jsonResponse.data;

    }catch (error) {
      urlFormattingError = `Network error: ${error}`;
    }finally {
      areWeLoading = false;
    }

  };
</script>

<main class="">
  <div class="container p-4 m-auto">
    <div class="header mb-4">
      <h1 class="text-4xl font-bold mb-2">Scraper CDR</h1>
      <p class="text-mute">An industry level scraping with CDR capabilities!</p>
    </div>
    <div class="flex gap-2 justify-center w-full">
      <Card
        className="flex-2/3"
        title="Settings"
        subTitle="Configure your scraper here"
      >
        <div class="flex gap-2">
          <input
            bind:value={url}
            type="text"
            placeholder="base url, ex: https://example.com"
            class="input-text"
          />
          <button
            onclick={onRequest}
            disabled={areWeLoading}
            type="button"
            class="button-primary"
          >
            Request
          </button>
        </div>
        {#if urlFormattingError}
          <p class="error-text">{urlFormattingError}</p>
        {/if}
        <textarea
          placeholder="Response will appear here"
          class="input-text mt-4 h-40"
        ></textarea>
      </Card>
      <Card className="flex-1/3" title="Gelban" subTitle="Here we go here" >
      </Card>
    </div>
    <div class="mt-4">
        {#if response}
          <TreeNode node={response} onItemSelected={(node: _Node, parentNode: _Node | undefined) => {
            $inspect("Selected node in App.svelte:", node);
          }} parentNode={null} />
        {:else}
          <p class="text-mute">Response tree will appear here</p>
        {/if}
      </div>

  </div>
  <Diaglog title="Current Selected Component" open={_currentSelectedComponent != null} closeOnBackdrop={false} closeOnEsc={false}>
    <NodeAPIDisplayModal data={_currentSelectedComponent!} />
    <div slot="actions">
      <button class="button-secondary" onclick={() => {
        currentSelectedComponent.set(null);
      }}>
        Close
      </button>
    </div>
  </Diaglog>
</main>


<style></style>
