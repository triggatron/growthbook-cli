import {BaseApiRepository, BaseRepository, Pagination} from './base.repository'
import {Metric, MetricsApi} from '../generated/api'
import {AxiosResponse} from 'axios'

type ListMetricsResponse = Pagination & {
  metrics: Metric[]
}

export class MetricsRepository extends BaseRepository implements BaseApiRepository<MetricsApi> {
  public async getMetric(id: string): Promise<Metric> {
    const metricsApi = this.api()
    const result = await metricsApi.getMetric(id)

    return result.data.metric
  }

  public async listMetrics(limit: number, offset: number, projectId?: string): Promise<ListMetricsResponse> {
    const metricsApi = this.api()
    const result: AxiosResponse<ListMetricsResponse> = await metricsApi.listMetrics(limit, offset, projectId)

    return result.data
  }

  api(): MetricsApi  {
    return new MetricsApi(this.apiConfig())
  }
}
