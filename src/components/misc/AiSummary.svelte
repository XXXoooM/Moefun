<script lang="ts">
	import { onMount } from "svelte";
	import { aiSummaryConfig } from "../../config";

	export let title: string;
	export let content: string; // First ~500 chars of the post
	export let fallback: string; // Hand-written description

	let summary = "";
	let loading = true;
	let isAiGenerated = false;

	onMount(async () => {
		// If there's already a hand-written description, use it directly
		if (fallback) {
			summary = fallback;
			loading = false;
			return;
		}

		// If AI summary is disabled, fall back to excerpt
		if (!aiSummaryConfig.enable) {
			summary = content || "";
			loading = false;
			return;
		}

		try {
			const res = await fetch(aiSummaryConfig.apiUrl, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					title,
					content: content.slice(0, 500),
				}),
			});

			if (!res.ok) throw new Error(`HTTP ${res.status}`);

			const data = await res.json();
			if (data.summary) {
				summary = data.summary;
				isAiGenerated = true;
			} else {
				summary = content || "";
			}
		} catch (e) {
			// Network error or API failure — use fallback
			summary = content || "";
		} finally {
			loading = false;
		}
	});
</script>

{#if loading}
	<span
		class="inline-block animate-pulse rounded h-4 w-3/4"
		style="background-color: var(--btn-card-bg-hover);"
	></span>
{:else}
	<span>{summary}</span>
	{#if isAiGenerated}
		<span
			class="inline-flex items-center text-[0.65rem] ml-1.5 px-1 py-0.5 rounded-sm opacity-50"
			style="background-color: var(--btn-card-bg-hover);"
			title="AI 生成的摘要"
		>
			✨ AI
		</span>
	{/if}
{/if}
