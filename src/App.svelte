<script>
  import Game from './Game.svelte';

  export let name;
  
  let handicap = 1002936;
</script>

<main>
	<h1>Hello {name}!</h1>
	<Game {handicap}/>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 400px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>