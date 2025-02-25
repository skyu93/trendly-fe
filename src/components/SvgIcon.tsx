interface Props {
  id: string;
  size?: number;
  color?: string;
  className?: string;
}

export default function SvgIcon({ id, size = 24, color, className, ...props }: Props) {
  return (
    <svg width={size} height={size} className={`${className ?? ''}${color ? ` text-${color}` : ''}`} {...props}>
      <use href={`/icons.svg#${id}`} />
    </svg>
  );
}
