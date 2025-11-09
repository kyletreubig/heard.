/* Generate a psuedo-random color based on the given string input. */
export function getColorFromString(input: string): string {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  const hue = (Math.abs(hash) * 137) % 360; // Use a large prime to distribute hues
  const saturation = 50 + ((Math.abs(hash) * 53) % 30); // Saturation between 50-79%
  const lightness = 30 + ((Math.abs(hash) * 89) % 20); // Lightness between 30-49%
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

/* Generate a contrasting text color (black or white) based on the background color for readability. */
export function getContrastingTextColor(backgroundColor: string): string {
  // Extract HSL values from the background color
  const hslMatch = backgroundColor.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
  if (!hslMatch) return "#000"; // Default to black if parsing fails

  const lightness = parseInt(hslMatch[3], 10);

  // Use lightness to determine contrast
  return lightness > 70 ? "#000" : "#fff"; // Black text on light backgrounds, white text on dark backgrounds
}
