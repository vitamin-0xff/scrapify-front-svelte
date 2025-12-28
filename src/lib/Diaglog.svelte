<script lang="ts">
  import { onMount, onDestroy, createEventDispatcher } from "svelte"

  export let open = false
  export let title = ""
  export let closeOnBackdrop = true
  export let closeOnEsc = true

  const dispatch = createEventDispatcher()

  function close() {
    dispatch("close")
  }

  function onKeydown(e: KeyboardEvent) {
    if (closeOnEsc && e.key === "Escape") {
      close()
    }
  }

  onMount(() => {
    window.addEventListener("keydown", onKeydown)
  })

  onDestroy(() => {
    window.removeEventListener("keydown", onKeydown)
  })
</script>

{#if open}
  <div class="fixed inset-0 z-50 flex items-center justify-center">
    <!-- backdrop -->
    <div
      class="absolute inset-0 bg-black/40"
      onclick={() => closeOnBackdrop && close()}
    ></div>

    <!-- dialog -->
    <div
      class="relative z-10 w-full max-w-lg rounded bg-gray-800 shadow-lg"
      role="dialog"
      aria-modal="true"
    >
      {#if title}
        <div class="border-b px-4 py-2 font-medium text-lg">
          {title}
        </div>
      {/if}

      <div class="p-4">
        <slot />
      </div>
      {#if $$slots.actions}
      <div class="border-t px-4 py-2 flex justify-end gap-2">
        <slot name="actions" />
      </div>
      {/if}
    </div>
  </div>
{/if}
