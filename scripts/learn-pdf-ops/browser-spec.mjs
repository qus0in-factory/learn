const executables = {
  chromium: 'chrome-linux/chrome',
  'chromium-headless-shell': 'chrome-linux/headless_shell',
  ffmpeg: 'ffmpeg-linux',
};
export function browserSpec(manifest, directory) {
  const browser = manifest.browsers.find(b =>
    `${b.name.replaceAll('-', '_')}-${b.revision}` === directory);
  if (!browser || !executables[browser.name]) throw Error('Pinned browser manifest mismatch');
  return { directory, version: browser.browserVersion ?? null,
    executable: `${directory}/${executables[browser.name]}` };
}
