<!-- <script>
    import { onMount } from 'svelte';
    import DoctorList from '../lib/components/DoctorList.svelte';

  
    let doctores = [];
  
    onMount(async () => {
      try {
        const res = await fetch('%sveltekit.assets%/doctores.json'); 
        if (!res.ok) {
          throw new Error('Failed to fetch doctores.json');
        }
        doctores = await res.json();
      } catch (error) {
        console.error('Error fetching doctores.json:', error);
      }
    });
  </script>
  
  <div class="container mt-5">
    <h2 class="mb-4">Lista de Doctores</h2>
    <DoctorList {doctores} />
  </div>
   -->