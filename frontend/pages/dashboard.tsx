import ProtectedRoute from '@/components/ProtectedRoute'
import withAuth from "@/utils/withAuth";

const dashboard = () => {
  return (
    <div>dashboard</div>
  )
}

export default withAuth(dashboard);