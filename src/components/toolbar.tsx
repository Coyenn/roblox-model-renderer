export interface ToolbarProps {
  children?: React.ReactNode;
}

export default function Toolbar(props: ToolbarProps) {
  const { children } = props;

  return (
    <div className="absolute right-0 top-0 z-10 m-2 flex items-center gap-2">
      {children}
    </div>
  );
}
