<script>
  export let value = "";
  export let disabled = false;
  export let editOnlyOnce = true;

  const handleInput = () => {
    if (editOnlyOnce) {
      disabled = true;
    }
  }
</script>

<style>
  input[type=text] {
    text-align: center;
    margin: 0;
    width: 80%;
    border: none;
    background: none;
    color: #777;
    text-transform: uppercase;
    box-sizing: border-box;
    border-bottom: 2px solid transparent;
    margin-bottom: -2px;
  }

  input[type=text]:focus {
    background: #fff5f5;
    border-bottom: 2px solid #ffa7a7;
  }

  input[type=submit] {
    display: none;
  }
</style>

<form on:submit|preventDefault={handleInput}>
{#if disabled}
  <input type="text" bind:value disabled />
{:else}
  <label>&#x270E;</label>
  <input type="text" bind:value />
{/if}
  <input type="submit">
</form>
