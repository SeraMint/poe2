type ChildProps = {
  show: boolean;
};

export const Loading: React.FC<ChildProps> = ({ show }) => {
  return show ? (
    <div className="fixed inset-0 z-[9999] bg-white flex items-center justify-center select-none">
      <p>로딩 중...</p>
    </div>
  ) : undefined;
};
