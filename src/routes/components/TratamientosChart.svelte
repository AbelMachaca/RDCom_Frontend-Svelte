<!-- <script>
    export let pacienteId;
  
    async function addTratamiento(event) {
      event.preventDefault();
      const formData = new FormData(event.target);
      const data = Object.fromEntries(formData);
      data.paciente_id = pacienteId;
  
      await fetch('http://localhost:5000/tratamiento', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
  
      event.target.reset();
    }
  </script>
  
  <form on:submit={addTratamiento}>
    <h3>Nuevo Tratamiento</h3>
    <input type="text" name="nombre" placeholder="Nombre" required>
    <input type="text" name="descripcion" placeholder="Descripción" required>
    <input type="date" name="fecha_inicio" required>
    <input type="date" name="fecha_fin" required>
    <button type="submit">Añadir Tratamiento</button>
  </form>
   -->

<script>
  import { onMount } from 'svelte';
  import Chart from 'chart.js/auto';

  export let tratamientos = [];

  let chart;

  onMount(() => {
    if (Array.isArray(tratamientos) && tratamientos.length > 0) {
      drawChart();
    }
  });

  $: if (Array.isArray(tratamientos) && tratamientos.length > 0) {
    drawChart();
  }

  function drawChart() {
    const nombresTratamientos = tratamientos.map(tratamiento => tratamiento.nombre);
    const duracionesTratamientos = tratamientos.map(tratamiento => {
      const fechaInicio = new Date(tratamiento.fecha_inicio);
      const fechaFin = new Date(tratamiento.fecha_fin);
      const duracionEnDias = Math.floor((fechaFin - fechaInicio) / (1000 * 60 * 60 * 24));
      return duracionEnDias;
    });

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

<div class="chart-container">
  <canvas id="tratamientosChart"></canvas>
</div>

<style>
  .chart-container {
    margin-top: 2rem;
  }
</style>

  