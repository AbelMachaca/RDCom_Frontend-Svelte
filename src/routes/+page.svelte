<!-- <script>
  import { onMount, tick } from 'svelte';
  import { writable, get } from 'svelte/store';
  import Chart from 'chart.js/auto';

  let pacientes = writable([]);
  let selectedPaciente = writable(null);
  let tratamientos = writable([]);
  let chart;

  onMount(async () => {
    const res = await fetch('http://localhost:5000/pacientes');
    const data = await res.json();
    pacientes.set(data);
  });

  async function addPaciente(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    await fetch('http://localhost:5000/paciente', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const res = await fetch('http://localhost:5000/pacientes');
    const updatedData = await res.json();
    pacientes.set(updatedData);
    event.target.reset();
  }

  async function selectPaciente(id) {
    const resPaciente = await fetch(`http://localhost:5000/paciente/${id}`);
    const pacienteData = await resPaciente.json();
    selectedPaciente.set(pacienteData);

    const resTratamientos = await fetch(`http://localhost:5000/tratamientos/${id}`);
    const tratamientosData = await resTratamientos.json();
    tratamientos.set(tratamientosData);

    drawTratamientosChart();
  }

  async function addTratamiento(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const paciente = get(selectedPaciente);

    data.paciente_id = paciente.sf_id;
    data.sf_id = paciente.sf_id;

    await fetch('http://localhost:5000/tratamiento', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const res = await fetch(`http://localhost:5000/tratamientos/${paciente.id}`);
    const updatedTratamientos = await res.json();
    tratamientos.set(updatedTratamientos);
    event.target.reset();

    drawTratamientosChart();
  }

  async function drawTratamientosChart() {
    const paciente = get(selectedPaciente);
    const res = await fetch(`http://localhost:5000/tratamientos/${paciente.id}`);
    const tratamientosData = await res.json();

    const nombresTratamientos = tratamientosData.map(tratamiento => tratamiento.nombre);
    const duracionesTratamientos = tratamientosData.map(tratamiento => {
        const fechaInicio = new Date(tratamiento.fecha_inicio);
        const fechaFin = new Date(tratamiento.fecha_fin);
        const duracionEnDias = Math.floor((fechaFin - fechaInicio) / (1000 * 60 * 60 * 24));
        return duracionEnDias;
    });

    await tick();

    const ctx = document.getElementById('tratamientosChart').getContext('2d');
    if (chart) {
      chart.destroy();
    }
    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: nombresTratamientos,
            datasets: [{
                label: 'Duración del Tratamiento (días)',
                data: duracionesTratamientos,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
  }
</script>

<style>
  .form-section {
    margin-bottom: 2rem;
  }
  .paciente-item {
    cursor: pointer;
    margin: 0.5rem 0;
    padding: 0.5rem;
  }
  .paciente-item:hover {
    background-color: #f0f0f0;
  }
  .detalle {
    margin-top: 2rem;
  }
  .chart-container {
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

<main class="container mt-5">
  <h1 class="mb-4">Gestión de Pacientes</h1>

  <div class="form-section">
    <form on:submit={addPaciente} class="form-inline">
      <div class="form-group mr-2">
        <input class="form-control" type="text" name="nombre" placeholder="Nombre" required>
      </div>
      <div class="form-group mr-2">
        <input class="form-control" type="number" name="edad" placeholder="Edad" required>
      </div>
      <div class="form-group mr-2">
        <input class="form-control" type="text" name="enfermedad" placeholder="Enfermedad" required>
      </div>
      <button class="btn btn-primary" type="submit"><i class="fas fa-plus"></i> Añadir Paciente</button>
    </form>
  </div>

  <h2 class="mb-4">Lista de Pacientes</h2>
  <ul class="list-group">
    {#each $pacientes as paciente}
      <button class="list-group-item list-group-item-action paciente-item" on:click={() => selectPaciente(paciente.id)}>
        {paciente.nombre} - {paciente.edad} - {paciente.enfermedad}
      </button>
    {/each}
  </ul>

  {#if $selectedPaciente}
    <div class="detalle card mt-4">
      <div class="card-header">
        <h5>Detalles del Paciente</h5>
        <button class="btn btn-secondary btn-sm" on:click={() => selectedPaciente.set(null)}><i class="fas fa-arrow-left"></i> Volver</button>
      </div>
      <div class="card-body">
        <p><strong>Nombre:</strong> {$selectedPaciente.nombre}</p>
        <p><strong>Edad:</strong> {$selectedPaciente.edad}</p>
        <p><strong>Enfermedad:</strong> {$selectedPaciente.enfermedad}</p>
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

          <h5>Tratamientos del Paciente</h5>
          <div class="chart-container">
            <canvas id="tratamientosChart"></canvas>
          </div>
        </div>
      </div>
    </div>
  {/if}
</main>
 -->

 <script>
  import { onMount } from 'svelte';
  import { pacientes } from '../lib/stores';
  import PacienteForm from '../lib/components/PacienteForm.svelte';
  import PacienteList from '../lib/components/PacienteList.svelte';
  import PacienteDetails from '../lib/components/PacienteDetails.svelte';
/*   import TratamientoForm from '../lib/components/TratamientoForm.svelte';
  import TratamientosChart from '../lib/components/TratamientosChart.svelte'; */
  import Sidebar from '../lib/components/Sidebar.svelte';

  

  onMount(async () => {
    const res = await fetch('http://localhost:5000/pacientes');
    const data = await res.json();
    pacientes.set(data);
  });
</script>



<div class="app">
  <Sidebar />
  <div style="width: 100%;">
    <div class="asd">
    <main class="container mt-5">


      <div class="detalle card mt-4">
      <div class="card-header pt-4">
        <h2 class="mb-4">Lista de Pacientes</h2>
      </div>

      <PacienteList />
      <div class="card-header">
        <h1 class="mb-4 mt-4">Gestión de Pacientes</h1>
        <div class="form-section">
          <PacienteForm />
        </div>
      </div>
      <PacienteDetails />
    </div>

      <!-- <div class="card mt-4">
        <div class="card-header">
          <h5>Tratamientos</h5>
        </div>
        <div class="card-body">
          <TratamientoForm onTratamientoAdded={handleTratamientoAdded} />
          <h5>Tratamientos del Paciente</h5>
          <TratamientosChart bind:this={chartComponent} />
        </div>
      </div> -->
    </main>
  </div>
  </div>
</div>


<!-- <main class="container mt-5">
  <h1 class="mb-4">Gestión de Pacientes</h1>
  <div class="form-section">
    <PacienteForm />
  </div>
  <h2 class="mb-4">Lista de Pacientes</h2>
  <PacienteList />
  <PacienteDetails /> -->
  <!-- <div class="card mt-4">
    <div class="card-header">
      <h5>Tratamientos</h5>
    </div>
    <div class="card-body">
      <TratamientoForm onTratamientoAdded={handleTratamientoAdded} />
      <h5>Tratamientos del Paciente</h5>
      <TratamientosChart bind:this={chartComponent} />
    </div>
  </div> -->
<!-- </main> -->

<style>
  .app {
    display: flex;
  }
  .asd{
    margin-left: 250px; 
    padding: 1rem;
  }
  h1, h2{
    font-family: 'Raleway', sans-serif;
    font-size: 30px;
    font-weight: 800;
    line-height: 25px;
    color: #060221;

  }
  
  </style>


