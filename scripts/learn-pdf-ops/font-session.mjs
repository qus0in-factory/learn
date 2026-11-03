export function fontSession(fonts) {
  const session = {
    detached: false,
    async detach() { this.detached = true; },
    async send(command) {
      if (command === 'DOM.getDocument') return { root: { nodeId: 1 } };
      if (command === 'DOM.querySelectorAll') return { nodeIds: [2] };
      if (command === 'CSS.getPlatformFontsForNode') return { fonts };
      return {};
    },
  };
  return { session, page: { context: () => ({ newCDPSession: async () => session }) } };
}
