type MinusIconProps = {
  size?: number;
  color?: string;
};

export default function MinusIcon({ size, color }: MinusIconProps) {
  return (
    <svg width={size} height={size} fill={color} viewBox="0 0 256 256">
      <path d="M228,128a12,12,0,0,1-12,12H40a12,12,0,0,1,0-24H216A12,12,0,0,1,228,128Z" />
    </svg>
  );
}
