type RoomDetailLayoutProps = {
  children: React.ReactNode;
  modal?: React.ReactNode;
};

const RoomDetailLayout = ({ children, modal }: RoomDetailLayoutProps) => {
  return (
    <>
      {children}
      {modal}
    </>
  );
};

export default RoomDetailLayout;
