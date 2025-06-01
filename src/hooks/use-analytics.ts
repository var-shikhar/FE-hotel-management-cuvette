import { useGetDashbaordAnalyticsQuery } from "../redux/slice/dashboard-slice"

const useAnalytics = () => {
  const { data, isLoading } = useGetDashbaordAnalyticsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  })
  return { data, isLoading }
}

export default useAnalytics
