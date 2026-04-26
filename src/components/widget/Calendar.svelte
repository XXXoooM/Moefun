<script lang="ts">
  export let postDates: string[] = [];

  let currentDate = new Date();
  let today = new Date();

  // Parse post dates into a set of 'YYYY-MM-DD' for quick lookup
  $: postDateStrings = new Set<string>(
    postDates.map((dateStr) => {
      const d = new Date(dateStr);
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
        d.getDate()
      ).padStart(2, "0")}`;
    })
  );

  let daysInMonth: { date: number; isCurrentMonth: boolean; hasPost: boolean; isToday: boolean; dateString: string }[] = [];

  $: {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayIndex = new Date(year, month, 1).getDay(); // 0 is Sunday
    const lastDate = new Date(year, month + 1, 0).getDate();
    const prevLastDate = new Date(year, month, 0).getDate();

    let grid = [];

    // Prev month days
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      grid.push({
        date: prevLastDate - i,
        isCurrentMonth: false,
        hasPost: false,
        isToday: false,
        dateString: "",
      });
    }

    // Current month days
    for (let i = 1; i <= lastDate; i++) {
        const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
        const isToday =
            year === today.getFullYear() &&
            month === today.getMonth() &&
            i === today.getDate();

      grid.push({
        date: i,
        isCurrentMonth: true,
        hasPost: postDateStrings.has(dateString),
        isToday: isToday,
        dateString: dateString,
      });
    }

    // Next month days to complete 6 rows (42 days)
    const nextDays = 42 - grid.length;
    for (let i = 1; i <= nextDays; i++) {
      grid.push({
        date: i,
        isCurrentMonth: false,
        hasPost: false,
        isToday: false,
        dateString: "",
      });
    }

    daysInMonth = grid;
  }

  function prevMonth() {
    currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
  }

  function nextMonth() {
    currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
  }

  const weekDays = ["日", "一", "二", "三", "四", "五", "六"];
</script>

<div class="px-1 py-2">
  <div class="flex justify-between items-center mb-4 px-2">
    <button 
      class="flex items-center justify-center w-8 h-8 rounded-lg text-neutral-600 dark:text-neutral-400 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
      on:click={prevMonth} 
      aria-label="上个月"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 18l-6-6l6-6"/></svg>
    </button>
    <div class="font-bold text-[0.95rem] text-neutral-800 dark:text-neutral-200">
      {currentDate.getFullYear()} 年 {currentDate.getMonth() + 1} 月
    </div>
    <button 
      class="flex items-center justify-center w-8 h-8 rounded-lg text-neutral-600 dark:text-neutral-400 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
      on:click={nextMonth} 
      aria-label="下个月"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 18l6-6l-6-6"/></svg>
    </button>
  </div>

  <div class="grid grid-cols-7 gap-1 text-center">
    {#each weekDays as day}
      <div class="text-xs font-semibold text-neutral-500 dark:text-neutral-500 mb-2">{day}</div>
    {/each}

    {#each daysInMonth as day}
      <div class="flex flex-col items-center justify-start h-9 relative group">
        <!-- svelte-ignore a11y-click-events-have-key-events // we could add links later -->
        <div 
          class="flex items-center justify-center w-7 h-7 text-[0.85rem] rounded-full transition-all duration-200 z-10
                 {day.isCurrentMonth ? 'text-neutral-700 dark:text-neutral-300' : 'text-neutral-300 dark:text-neutral-700 opacity-50'}
                 {day.isToday ? 'bg-[var(--primary)] text-white dark:text-white font-bold shadow-md shadow-[var(--primary)]/30' : ''}
                 {!day.isToday && day.hasPost ? 'bg-[var(--primary)]/10 text-[var(--primary)] font-semibold' : ''}
                 {!day.isToday && !day.hasPost && day.isCurrentMonth ? 'hover:bg-black/5 dark:hover:bg-white/10' : ''}"
        >
          {day.date}
        </div>
        {#if day.hasPost}
          <div class="absolute bottom-[2px] w-1 h-1 rounded-full bg-[var(--primary)]"></div>
        {/if}
      </div>
    {/each}
  </div>
</div>
