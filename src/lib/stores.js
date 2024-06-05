import { writable } from 'svelte/store';

export const pacientes = writable([]);
export const selectedPaciente = writable(null);
export const tratamientos = writable([]);
