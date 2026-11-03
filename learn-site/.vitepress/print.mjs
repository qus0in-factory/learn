export const printHead = [
  ['style', {}, `
    @media print {
      .VPNav, .VPLocalNav, .VPDocAside, .VPSidebar, .VPFooter,
      button, .appearance, .pdf-download { display: none !important; }
      .VPDoc { padding: 0 !important; }
    }
    @page { size: A4; margin: 16mm; }
  `],
]
