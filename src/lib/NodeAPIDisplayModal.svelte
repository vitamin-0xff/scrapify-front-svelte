<script lang="ts">
  import type { _Node, _NodeAPI } from "../api/types";
  export let data: _Node;
  let name = "";
  let isItArray = false;
</script>

  <div class="space-y-3 text-sm">
    <div>
      <div class="text-gray-500">Name</div>
      <div>
        <input type="text" bind:value={name} class="input-text" placeholder="friendly display name"/>
      </div>
    </div>

    <div>
      <div class="text-gray-500">Selector</div>
      <p>
        {data.name ? data.name : ''}{data.selectorContent}
      </p>
    </div>

    <div>
      <div class="text-gray-500">Selector type</div>
        {data._type}
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
  </div>
