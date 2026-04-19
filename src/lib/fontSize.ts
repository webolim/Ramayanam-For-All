export function getFontSizeClass(step: number, type: 'text' | 'h1' | 'h2' | 'subtext' | 'ui' = 'text') {
  // Base sizes mappings:
  // Downshifted by 3 steps from previous mapping to make default sizes normal
  
  const h1Sizes = ['text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl', 'text-4xl', 'text-5xl', 'text-6xl', 'text-7xl', 'text-[5rem]'];
  const h2Sizes = ['text-[10px]', 'text-[12px]', 'text-sm', 'text-base', 'text-lg', 'text-2xl', 'text-3xl', 'text-4xl', 'text-5xl', 'text-6xl', 'text-7xl'];
  const textSizes = ['text-[10px]', 'text-[12px]', 'text-sm', 'text-[15px]', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl', 'text-4xl', 'text-5xl'];
  const subtextSizes = ['text-[9px]', 'text-[10px]', 'text-[11px]', 'text-[12px]', 'text-[13px]', 'text-[14px]', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl'];
  const uiSizes = ['text-[8px]', 'text-[9px]', 'text-[10px]', 'text-[11px]', 'text-[12px]', 'text-sm', 'text-[15px]', 'text-base', 'text-lg', 'text-xl', 'text-2xl'];

  // Clamp step between -5 and 5
  const clampedStep = Math.max(-5, Math.min(5, step));
  // Shift to 0-based index (0 to 10)
  const index = clampedStep + 5;

  if (type === 'h1') return h1Sizes[index];
  if (type === 'h2') return h2Sizes[index];
  if (type === 'subtext') return subtextSizes[index];
  if (type === 'ui') return uiSizes[index];
  return textSizes[index];
}
