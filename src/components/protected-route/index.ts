type ProtectedRouteProps = {
  children: React.ReactElement;
  // isPublic: boolean;
};

export const ProtectedRoute = ({
  children
  // isPublic
}: ProtectedRouteProps) => children;

export default ProtectedRoute;
