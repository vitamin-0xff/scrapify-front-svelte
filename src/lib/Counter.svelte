<script lang="ts">
  let count: number = $state(0)
  const increment = () => {
    count += 1
  }

const decrement = () => {
  count -= 1
  console.log("Hello World!")
}
</script>

<button onclick={increment}>
  +
</button>
<div class="display">
  {count}
</div>
<button onclick={decrement}>
  -
</button>
