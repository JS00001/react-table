type ArrowDownIconProps = {
  size?: number;
  color?: string;
};

export default function ArrowDownIcon({ size, color }: ArrowDownIconProps) {
  return (
    <svg width={size} height={size} fill={color} viewBox="0 0 256 256">
      <path d="M208.49,143.51a12,12,0,0,1,0,17l-72,72a12,12,0,0,1-17,0l-72-72a12,12,0,0,1,17-17L116,195V48a12,12,0,0,1,24,0V195l51.51-51.49A12,12,0,0,1,208.49,143.51Z" />
    </svg>
  );
}
