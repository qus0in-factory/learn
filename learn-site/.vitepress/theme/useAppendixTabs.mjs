import { computed, ref } from 'vue'

export function useAppendixTabs(groups) {
  const selected = ref('')
  const ids = ['', ...groups.map(group => group.id)]
  const items = computed(() => groups
    .filter(group => !selected.value || group.id === selected.value)
    .flatMap(group => group.items))
  function move(event) {
    const index = ids.indexOf(selected.value)
    const next = { ArrowRight: (index + 1) % ids.length,
      ArrowLeft: (index + ids.length - 1) % ids.length,
      Home: 0, End: ids.length - 1 }[event.key]
    if (next === undefined) return
    event.preventDefault()
    selected.value = ids[next]
    event.currentTarget.querySelectorAll('[role=tab]')[next].focus()
  }
  return { selected, items, move }
}
