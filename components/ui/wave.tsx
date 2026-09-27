type Tone = "foam" | "sand" | "deep";

interface WaveProps {
  /** Colour of the water: match the section the wave belongs to (or the next one, for "inside"). */
  tone: Tone;
  /**
   * top: rises above the section's top edge. bottom: hangs below its bottom edge.
   * inside: sits on the section's own bottom edge. The parent must be positioned.
   */
  edge?: "top" | "bottom" | "inside";
  /** lg: taller swell, for the bottom of full-screen heroes. */
  size?: "md" | "lg";
  className?: string;
}

/** The logo's wave, in two layers drifting at different speeds. Styles live in globals.css (.wave). */
export function Wave({ tone, edge = "top", size = "md", className }: WaveProps) {
  return (
    <div aria-hidden className={className ? `wave ${className}` : "wave"} data-tone={tone} data-edge={edge} data-size={size}>
      <div className="wave-layer" data-layer="back" />
      <div className="wave-layer" />
    </div>
  );
}
