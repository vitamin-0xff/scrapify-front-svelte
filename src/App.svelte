<script lang="ts">
    import type { _Node } from "./api/types";
  import "./app.css";
    import AddSelector from "./lib/AddSelector.svelte";
  import Card from "./lib/Card.svelte";
    import Diaglog from "./lib/Diaglog.svelte";
    import NodeAPIDisplayModal from "./lib/NodeAPIDisplayModal.svelte";
    import Table from "./lib/Table.svelte";
    import TreeNode from "./lib/TreeNode.svelte";
    import { currentSelectedComponent, selectedElements } from "./store/selected-elements.svelte";
  let areWeLoading = $state(false);
  let urlFormattingError: string | null = $state(null);
  let url: string =  $state("");
  let response = $state<null | _Node>(null);
  let _currentSelectedComponent = $state<_Node | null>(null);
  let isAddSelectorOpen = $state(false);
  let selectedElementsSnapshot = $state<Array<import("./api/types")._NodeAPI>>([]);
  let rootElementSelector = $state<string>("");

  const initState = () => {
    areWeLoading = false;
    urlFormattingError = null;
  };

  $effect(() => {
    selectedElements.subscribe((selectedElements) => {
      selectedElementsSnapshot = selectedElements;
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
            class="input-text flex-2/3"
          />
          <input type="text" bind:value={rootElementSelector} placeholder="Root Element Selector (required)" class="input-text flex-1/3" />
        </div>
        {#if urlFormattingError}
          <p class="error-text">{urlFormattingError}</p>
        {/if}
          <div class="table mt-4 w-full">
              <p class="text-white">
                Elements
              </p>
            <p class="text-mute text-sm mb-2">
              Elements you have selected to scrape
            </p>
           <Table 
              headers={[{label: "Name", key: "name"}, {label: "Selector", key: "fullSelector"}, {label: "Is Array", key: "isItArray"}]}
              rows={selectedElementsSnapshot}
              onAddClick={() => isAddSelectorOpen = true}
              onActionClick={(actionTtype: string, row: Record<string, any>) => {
                if(actionTtype === "delete") {
                  console.log("Delete action clicked for row:", row);
                  selectedElements.update((elements) => {
                      return elements.filter(element => element.name !== row.name);
                  })
                }
                if(actionTtype === "edit") {
                  console.log("Edit action clicked for row:", row);
                }
              }}
             />
          </div>
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
  <Diaglog title="Current Selected Target" open={isAddSelectorOpen} closeOnBackdrop={false} closeOnEsc={true}>
    <AddSelector onCloseRequest={() => isAddSelectorOpen = false } />
  </Diaglog>
</main>


<style></style>
