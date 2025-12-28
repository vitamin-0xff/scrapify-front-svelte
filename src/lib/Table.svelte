<script lang="ts">
    import type { TableHeader } from "../api/types";
    import { selectedElements } from "../store/selected-elements.svelte";

  export let headers: TableHeader[] = []
  export let rows: Record<string, any>[] = []
  export let onAddClick: () => void;
  export let onActionClick: (actionTtype: string, row: Record<string, any>) => void;
</script>

<div class="overflow-x-auto">
  <table class="table-fixed min-w-full text-center text-sm">
    <thead class="bg-gray-800">
      <tr>
        {#each headers as header}
          <th
            class="px-3 py-3 font-medium text-gray-300 {header.class || ''}"
          >
            {header.label}
          </th>
        {/each}
        <th>
            Actions
        </th>
      </tr>
    </thead>

    <tbody>
      {#if rows.length === 0}
        <tr>
          <td
            colspan={headers.length + 1}
            class="px-1 py-4 text-center text-gray-500"
          >
            No data available.
          </td>
        </tr>
      {:else}
        {#each rows as row}
          <tr class="hover:bg-[#131313] transition-all hover:text-gray-100">
            {#each headers as header}
              <td class="px-3 py-4">
                {row[header.key]}
              </td>
            {/each}
            <td>
                <button class="button-ghost" onclick={() => {
                    onActionClick("delete", row);
                }}>
                    delete
                </button>
            </td>
          </tr>
        {/each}
      {/if}
      <tr>
        <td colspan={headers.length + 1} class="text-center">
          <button onclick={onAddClick} class="button-ghost m-1">
            <p class="">
            + Add
            </p>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
