<script>
  export let value = "";
  export let disabled = false;
  export let editOnlyOnce = true;

  const handleInput = () => {
    if (editOnlyOnce) {
      disabled = true;
    }
  };

  let focus = false;

  const hidePencil = () => {
    focus = true;
  };
</script>

<style>
  input[type="text"] {
    text-align: center;
    margin: 0;
    width: 95%;
    border: none;
    background: none;
    color: #777;
    text-transform: uppercase;
    box-sizing: border-box;
    border-bottom: 2px solid transparent;
    margin-bottom: -2px;
  }

  input[type="text"]:focus {
    background: #fff5f5;
    outline: none;
    border-bottom: 2px solid #ffa7a7;
  }

  input[type="submit"] {
    display: none;
  }

  label {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    padding-left: 0.7em;
  }

  .hidden {
    display: none;
  }
</style>

<form on:submit|preventDefault={handleInput}>
  {#if disabled}
    <input type="text" bind:value disabled />
  {:else}
    <div style="position:relative">
      <label class:hidden={focus}>&#x270E;</label>
      <input
        type="text"
        bind:value
        on:focusout={handleInput}
        on:focus={hidePencil} />
    </div>
  {/if}
  <input type="submit" />
</form>
