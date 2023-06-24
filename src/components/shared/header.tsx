export const Header = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) => {
  return (
    <div className="header">
      <p>{title}</p>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
};
