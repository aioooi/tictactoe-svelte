<script>
  export let label = ["a", "b"];
  export let id;

  id = Math.floor(label.length / 2.0);
</script>

<style>
  .grid {
    width: 50vw;
    max-width: 50vh;
    display: grid;
    text-align: center;
    /* set dynamically in html below: */
    /* grid-template-columns: 1fr 1fr 1fr; */
    text-transform: uppercase;
    margin: 3em 0;
    grid-gap: 3px;
    font-size: 12px;
  }

  .radioBtn {
    display: inline-block;
    text-align: center;
  }

  .radioBtn label {
    display: block;
    margin-bottom: 1em;
  }

  input[type="radio"] {
    -moz-appearance: None;
    -webkit-appearance: none;
    border: 1px solid #ccc;
    background-color: #fff;
    border-radius: 25%;
    width: 14px;
    height: 14px;
    cursor: pointer;
  }

  input[type="radio"]:checked {
    background: #ffa7a7;
    border: 1px solid #aaa;
  }

  input[type="radio"]:focus {
    outline: none;
  }
</style>

<div class="grid" style="grid-template-columns: repeat({label.length}, 1fr)">
  {#each label.map((v, i) => {
    return { id: i, label: v };
  }) as l (l.id)}
    <div class="radioBtn">
      <label>{l.label}</label>
      <input type="radio" bind:group={id} value={l.id} />
    </div>
  {/each}
</div>
