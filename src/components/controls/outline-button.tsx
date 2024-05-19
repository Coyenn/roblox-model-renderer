export interface OutlineButtonProps {
  onClick: () => void;
  active?: boolean;
}

export default function OutlineButton(props: OutlineButtonProps) {
  const { onClick, active } = props;
  const activeClassNames =
    "bg-neutral-900 text-white hover:bg-neutral-950 border border-neutral-900 hover:border-neutral-950";
  const inactiveClassNames =
    "bg-transparent border border-neutral-900 hover:bg-neutral-600 text-neutral-900 hover:text-white hover:border-neutral-700";

  return (
    <button
      className={`flex items-center gap-2 p-2 px-4 py-2 transition-colors ${
        active ? activeClassNames : inactiveClassNames
      }`}
      onClick={onClick}
    >
      Outline
    </button>
  );
}
