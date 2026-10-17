type ArrowUpIconProps = {
  size?: number;
  color?: string;
};

export default function ArrowUpIcon({ size, color }: ArrowUpIconProps) {
  return (
    <svg width={size} height={size} fill={color} viewBox="0 0 256 256">
      <path d="M208.49,112.49a12,12,0,0,1-17,0L140,61V208a12,12,0,0,1-24,0V61L64.49,112.49a12,12,0,0,1-17-17l72-72a12,12,0,0,1,17,0l72,72A12,12,0,0,1,208.49,112.49Z" />
    </svg>
  );
}
