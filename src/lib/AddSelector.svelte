<script lang="ts">
    import type { _Node, _NodeAPI } from "../api/types";
    import { selectedElements } from "../store/selected-elements.svelte";
  
  let {onCloseRequest} = $props<{onCloseRequest: () => void}>();
  let name: string = $state("");
  let nameError: string | null = $state(null);

  let selector: string = $state("");
  let selectorError: string | null = $state(null);

  let isItArray: boolean = $state(false);

  const checkInput = () => {
    nameError = null;
    selectorError = null;

    if(name.length < 3) {
      nameError = "Name must be at least 3 characters long.";
    }

    if(!selector.trim().match(/^[\.\d\w_#-]+$/i)) {
      selectorError = "Selector not valid.";
    }
    return !nameError && !selectorError;
  }

    const onAdd = () => {
        if(!checkInput()) {
        return;
        }
    
        const newSelector: _NodeAPI = {
        name,
        fullSelector: selector,
        isItArray,
        };

        selectedElements.update((elements) => {
        for (const element of elements) {
            if (element.name === newSelector.name) {
            nameError = "An element with this name already exists.";
            return elements;
            }
            if (element.fullSelector === newSelector.fullSelector) {
            selectorError = "An element with this selector already exists.";
            return elements;
            }
        }
            return [...elements, newSelector];
        });

        if(!nameError && !selectorError) {
            onCloseRequest();
            // reset fields
            name = "";
            selector = "";
            isItArray = false;
        }

    }

</script>

  <div class="space-y-3 text-sm">
    <div>
      <div class="text-gray-500">Name</div>
      <div>
        <input type="text" bind:value={name} class="input-text" placeholder="friendly display name"/>
      </div>
      {#if nameError}
        <p class="error-text">{nameError}</p>
      {/if}
    </div>

    <div>
      <div class="text-gray-500">Selector</div>
      <input type="text" bind:value={selector} class="input-text" placeholder="Selector name" />
      {#if selectorError}
        <p class="error-text">{selectorError}</p>
      {/if}
    </div>
    <div>
        <p class="text-gray-500">
            is it an array?
        </p>
        <div class="flex gap-2">
            <input id="isArray" type="checkbox" bind:checked={isItArray} />
            <label class="text-gray-200 mr-2" for="isArray">array?</label>
        </div>
  </div>
      <div class="flex gap-2">
      <button class="button-ghost" onclick={() => {
        console.log("Closing dialog");
        onCloseRequest(); 
      }}>
        Close
      </button>
      <button class="button-primary" onclick={() => {
        onAdd();
      }}>
        Save
      </button>
      </div>
  </div>