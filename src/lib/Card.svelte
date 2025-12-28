<script lang="ts">
    export let title
    export let subTitle
    export let className = ""
</script>

<article class="{`card ${className}`}">
    <div class="card-header">
        <p class="card-text-title text-xl">
            {title}
        </p>
        <p class="card-text-sub-title">
            {subTitle}
        </p>
    </div>
    <div class="card-content">
        <p class="card-text-content">
            <slot></slot>
        </p>
    </div>
</article>

<style>

.card {
  padding: 1rem;
  background-color: #222;
  border: 1px solid #aaa;
  border-radius: 8px;
}

.card-header {
  margin-bottom: 8px;
}

.card-text-title {
  color: white;
  font-size: 1.2rem;
}

.card-text-sub-title {
  color: #bbb;
  font-size: 0.8rem;
}

.card-text-content {
  color: #ccc;
  font-size: 1rem;
}
</style>