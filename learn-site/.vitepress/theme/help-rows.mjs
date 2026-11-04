export function helpRows(element) {
  return [...element.closest('.share-course').querySelectorAll('.share-actions a, .share-actions button')]
    .filter(item => item.getClientRects().length)
    .map(item => ({ text: item.getAttribute('aria-label'),
      icon: [...item.querySelector('.share-icon').classList].find(name => name !== 'share-icon') }))
}
