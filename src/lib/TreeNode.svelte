<script lang="ts">
    import { type _Node } from "../api/types";
    import { currentSelectedComponent, selectedElements } from "../store/selected-elements.svelte";
   import TreeNode from "./TreeNode.svelte"
  
  let {node, depth = 0, parentNode = null, onItemSelected} = $props<{
    onItemSelected: (node: _Node, parentNode?: _Node) => void;
    node: _Node
    parentNode: _Node | null,
    depth?: number
  }>();

  let isSelected: boolean = $state(false);

  $effect(() => {
    if((node._type === "link" || node._type === "text") && isSelected) {
        $inspect(`Node selected ${node}`, "isSelected");
        currentSelectedComponent.set(node);
    }
  }); 
</script>

<div class="relative pl-4">
  {#if depth > 0}
    <div class="absolute left-0 top-0 bottom-0 w-px bg-[var(--background-color, #121212)]"></div>
  {/if}

  <div class="flex items-start gap-2 py-1">
    <div class="text-xs text-gray-500 w-12 select-none">
      {depth}
    </div>

    {#if node._type === "element"}
      <div class="bg-[var(--background-color, #121212)] border border-gray-200 rounded px-2 py-1 w-full">
        <div class="flex items-center gap-2">
            <div class="text-sm font-medium text-gray-400">
            &lt;{node.name}&gt;
            </div>
        </div>
        <div class="text-xs text-gray-200">
          {node.selectorContent}
        </div>

        {#if (node.children?.length ?? 0) > 0}
          <div class="mt-2 space-y-1">
            {#each node.children as child}
              <TreeNode node={child} depth={depth + 1} parentNode={node} onItemSelected={onItemSelected} />
            {/each}
          </div>
        {/if}
      </div>

    {:else if node._type === "text"}
      <div class="text-sm text-green-700 bg-[var(--background-color, #121212)] border border-green-200 rounded px-2 py-1">
        <div class="flex gap-2">
            <input type="checkbox" bind:checked={isSelected}/>
            <p>
                 &lt;{node.name}&gt;
            </p>
            <div class="">:</div>
        <div class="text-xs text-gray-200">
            {node.selectorContent}
            </div>
        </div>
        <div>
            {node.textContent}
        </div>
      </div>

    {:else if node._type === "link"}
      <div class="flex flex-col gap-2">
      <div class="text-sm text-blue-70 bg-[var(--background-color, #121212)]0 border border-blue-200 rounded px-2 py-1">
        &lt;a&gt; {node.selectorContent}
        <div class="flex gap-2 items-center">
            <div>
                <input type="checkbox" bind:checked={isSelected} value="{parentNode?.name ?? "" + parentNode?.selectorContent + node.selectorContent}"/>
            </div>
            <p>
                 href="{node.href}"
            </p>
        </div>
        <div>
        </div>
        {#if node.textContent}
      <div class="text-xs mt-1 text-gray-200">
        <div class="flex gap-2">
            <div>
                <input type="checkbox" bind:checked={isSelected}/>
            </div>
            <p>
                {node.textContent}
            </p>
        </div>
        </div>
        {/if}
      </div>
      </div>

    {/if}
  </div>
</div>
