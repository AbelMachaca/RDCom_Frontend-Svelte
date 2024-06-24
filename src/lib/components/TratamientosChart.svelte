<script>
	import { onMount, tick } from 'svelte';
	import { selectedPaciente } from '../stores';
	import Chart from 'chart.js/auto';

	let chart;

	export function drawTratamientosChart() {
		drawChart();
	}

	async function drawChart() {
		const paciente = $selectedPaciente;
		const res = await fetch(`https://demo-rdcom.vercel.app/tratamientos/${paciente.id}`);
		const tratamientosData = await res.json();

		const nombresTratamientos = tratamientosData.map((tratamiento) => tratamiento.nombre);
		const duracionesTratamientos = tratamientosData.map((tratamiento) => {
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
				datasets: [
					{
						label: 'Duración del Tratamiento (días)',
						data: duracionesTratamientos,
						backgroundColor: 'rgba(75, 192, 192, 0.2)',
						borderColor: 'rgba(75, 192, 192, 1)',
						borderWidth: 1
					}
				]
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

	$: if ($selectedPaciente) {
		drawChart();
	}
</script>

<div class="chart-container">
	<canvas id="tratamientosChart"></canvas>
</div>
