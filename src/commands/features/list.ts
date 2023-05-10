import {Command, Flags} from '@oclif/core'
import {baseGrowthBookCliFlags} from '../../utils/cli'
import {DEFAULT_GROWTHBOOK_BASE_URL, DEFAULT_GROWTHBOOK_PROFILE} from '../../utils/constants'
import {getGrowthBookProfileConfigAndThrowForCommand} from '../../utils/config'
import {FeaturesRepository} from '../../repositories/features.repository'

export default class FeaturesList extends Command {
  static description = 'Get all features'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
    ...baseGrowthBookCliFlags,
    limit: Flags.integer({
      description: 'Limit for pagination',
      required: false,
      default: 100,
    }),
    offset: Flags.integer({
      description: 'Offset for pagination',
      required: false,
      default: 0,
    }),
  }

  static args = {}

  async run(): Promise<void> {
    const {
      flags: {
        profile,
        apiBaseUrl,
        limit,
        offset,
      },
    } = await this.parse(FeaturesList)
    const profileUsed = profile || DEFAULT_GROWTHBOOK_PROFILE
    const {apiKey, apiBaseUrl: configApiBaseUrl} = getGrowthBookProfileConfigAndThrowForCommand(profileUsed, this)
    const baseUrlUsed = apiBaseUrl || configApiBaseUrl || DEFAULT_GROWTHBOOK_BASE_URL

    const featuresRepo = new FeaturesRepository({
      apiKey,
      apiBaseUrl: baseUrlUsed,
    })

    const features = await featuresRepo.listFeatures(limit, offset)

    this.logJson(features)
  }
}
