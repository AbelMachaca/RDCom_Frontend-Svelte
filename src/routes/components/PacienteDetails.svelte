<!-- <script>
    import { onMount } from 'svelte';
    import { Link } from 'svelte-routing';
    let pacientes = [];
  
    onMount(async () => {
      const res = await fetch('http://localhost:5000/pacientes');
      pacientes = await res.json();
      console.log(pacientes);
    });
  </script>
  
  <h1>Pacientes</h1>
  <Link to="nuevo-paciente">Añadir Paciente</Link>
  <ul>
    {#each pacientes as paciente}
      <li>
        <Link to={`paciente/${paciente.id}`}>{paciente.nombre} - {paciente.edad} - {paciente.enfermedad}</Link>
      </li>
    {/each}
  </ul>
   -->
   

   <script>
    import { onMount, tick } from 'svelte';
    import { writable, get } from 'svelte/store';
    import TratamientosChart from './TratamientosChart.svelte';
  
    export let selectedPaciente;
  
    let paciente = writable({});
    let tratamientos = writable([]);
  
    onMount(async () => {
      const id = get(selectedPaciente);
      const resPaciente = await fetch(`https://demo-rdcom.vercel.app/paciente/${id}`);
      const pacienteData = await resPaciente.json();
      paciente.set(pacienteData);
  
      const resTratamientos = await fetch(`https://demo-rdcom.vercel.app/tratamientos/${id}`);
      const tratamientosData = await resTratamientos.json();
      tratamientos.set(tratamientosData);
    });
  
    async function addTratamiento(event) {
      event.preventDefault();
      const formData = new FormData(event.target);
      const data = Object.fromEntries(formData);
      const pacienteData = get(paciente);
  
      data.paciente_id = pacienteData.sf_id;
      data.sf_id = pacienteData.sf_id;
  
      await fetch('https://demo-rdcom.vercel.app/tratamiento', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
  
      const res = await fetch(`https://demo-rdcom.vercel.app/tratamientos/${pacienteData.id}`);
      const updatedTratamientos = await res.json();
      tratamientos.set(updatedTratamientos);
      event.target.reset();
    }
  </script>
  
  <div class="detalle card mt-4">
    <div class="card-header">
      <h5>Detalles del Paciente</h5>
      <button class="btn btn-secondary btn-sm" on:click={() => selectedPaciente.set(null)}><i class="fas fa-arrow-left"></i> Volver</button>
    </div>
    <div class="card-body">
      <p><strong>Nombre:</strong> {$paciente.nombre}</p>
      <p><strong>Edad:</strong> {$paciente.edad}</p>
      <p><strong>Enfermedad:</strong> {$paciente.enfermedad}</p>
    </div>
  
    <div class="card mt-4">
      <div class="card-header">
        <h5>Tratamientos</h5>
      </div>
      <div class="card-body">
        <ul class="list-group mb-4">
          {#each $tratamientos as tratamiento}
            <li class="list-group-item">
              {tratamiento.nombre} - {tratamiento.descripcion} (Desde: {tratamiento.fecha_inicio} Hasta: {tratamiento.fecha_fin})
            </li>
          {/each}
        </ul>
  
        <form on:submit={addTratamiento} class="form-inline mb-4">
          <div class="form-group mr-2">
            <input class="form-control" type="text" name="nombre" placeholder="Nombre del tratamiento" required>
          </div>
          <div class="form-group mr-2">
            <input class="form-control" type="text" name="descripcion" placeholder="Descripción" required>
          </div>
          <div class="form-group mr-2">
            <input class="form-control" type="date" name="fecha_inicio" required>
          </div>
          <div class="form-group mr-2">
            <input class="form-control" type="date" name="fecha_fin" required>
          </div>
          <button class="btn btn-primary" type="submit"><i class="fas fa-plus"></i> Añadir Tratamiento</button>
        </form>
  
        <TratamientosChart tratamientos={$tratamientos} />
      </div>
    </div>
  </div>
  
  <style>
    .detalle {
      margin-top: 2rem;
    }
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .card-header h5 {
      margin: 0;
    }
  </style>
  