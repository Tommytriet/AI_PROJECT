<script lang="ts">
import { onMount } from "svelte";

// Stagewise configuration
const stagewiseConfig = {
	plugins: [],
};

onMount(async () => {
	// Only initialize in development mode
	if (import.meta.env.DEV) {
		try {
			const { initToolbar } = await import("@stagewise/toolbar");
			initToolbar(stagewiseConfig);
		} catch (error) {
			console.warn("Failed to initialize Stagewise toolbar:", error);
		}
	}
});
</script>

<!-- This component has no visual elements as the toolbar is injected by the stagewise library --> 