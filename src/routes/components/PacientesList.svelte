<!-- <script>
    import { navigate } from 'svelte-routing';
  
    async function addPaciente(event) {
      event.preventDefault();
      const formData = new FormData(event.target);
      const data = Object.fromEntries(formData);
  
      await fetch('http://localhost:5000/paciente', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
  
      navigate('/');
    }
  </script>
  
  <form on:submit={addPaciente}>
    <h1>Nuevo Paciente</h1>
    <input type="text" name="nombre" placeholder="Nombre" required>
    <input type="number" name="edad" placeholder="Edad" required>
    <input type="text" name="enfermedad" placeholder="Enfermedad" required>
    <button type="submit">Añadir Paciente</button>
  </form>
 -->

 <script>
  import { createEventDispatcher } from 'svelte';

  export let pacientes;
  const dispatch = createEventDispatcher();

  function selectPaciente(id) {
    dispatch('select', id);
  }
</script>

<ul class="list-group">
  {#each $pacientes as paciente}
    <button class="list-group-item list-group-item-action paciente-item" on:click={() => selectPaciente(paciente.id)}>
      {paciente.nombre} - {paciente.edad} - {paciente.enfermedad}
    </button>
  {/each}
</ul>

<style>
  .paciente-item {
    cursor: pointer;
    margin: 0.5rem 0;
    padding: 0.5rem;
  }
  .paciente-item:hover {
    background-color: #f0f0f0;
  }
</style>
