export async function diagramTheme(page) {
  return page.evaluate(() => {
    const css = getComputedStyle(document.documentElement);
    const get = key => {
      const node = document.createElement('span');
      node.style.color = css.getPropertyValue(key).trim();
      document.body.append(node);
      const color = getComputedStyle(node).color;
      node.remove();
      return color;
    };
    return { startOnLoad: false, theme: 'base', flowchart: { htmlLabels: false },
      themeVariables: { fontFamily: 'Learn Sans', fontSize: '30px',
        primaryColor: get('--soft'), primaryTextColor: get('--ink'),
        primaryBorderColor: get('--brand'), lineColor: get('--brand'),
        edgeLabelBackground: get('--paper') } };
  });
}
