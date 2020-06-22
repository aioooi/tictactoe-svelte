<script>
  export let stats = {
    computer: 0,
    draw: 0,
    player: 0,
  }

  export let name = "Player";
</script>

<style>

</style>

<div>
  <table>
    <tr>
      <td>{name}</td>
      <td>Computer</td>
      <td>Draws</td>
    </tr>
    <tr>
      <td>{stats.player}</td>
      <td>{stats.computer}</td>
      <td>{stats.draw}</td>
    </tr>
  </table>
</div>