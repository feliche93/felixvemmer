/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { OpenAPIConfig } from './core/OpenAPI';
import { FetchHttpRequest } from './core/FetchHttpRequest';

import { ActionsService } from './services/ActionsService';
import { ActivityLogService } from './services/ActivityLogService';
import { AnnotationsService } from './services/AnnotationsService';
import { AppMetricsService } from './services/AppMetricsService';
import { BatchExportsService } from './services/BatchExportsService';
import { CohortsService } from './services/CohortsService';
import { DashboardsService } from './services/DashboardsService';
import { DashboardTemplatesService } from './services/DashboardTemplatesService';
import { DataManagementService } from './services/DataManagementService';
import { DomainsService } from './services/DomainsService';
import { EarlyAccessFeatureService } from './services/EarlyAccessFeatureService';
import { EventDefinitionsService } from './services/EventDefinitionsService';
import { EventsService } from './services/EventsService';
import { ExperimentsService } from './services/ExperimentsService';
import { ExplicitMembersService } from './services/ExplicitMembersService';
import { ExportsService } from './services/ExportsService';
import { ExternalDataSchemasService } from './services/ExternalDataSchemasService';
import { ExternalDataSourcesService } from './services/ExternalDataSourcesService';
import { FeatureFlagsService } from './services/FeatureFlagsService';
import { FunnelService } from './services/FunnelService';
import { GroupsService } from './services/GroupsService';
import { GroupsTypesService } from './services/GroupsTypesService';
import { HooksService } from './services/HooksService';
import { IngestionWarningsService } from './services/IngestionWarningsService';
import { InsightsService } from './services/InsightsService';
import { IntegrationsService } from './services/IntegrationsService';
import { InvitesService } from './services/InvitesService';
import { IsGeneratingDemoDataService } from './services/IsGeneratingDemoDataService';
import { MembersService } from './services/MembersService';
import { OrganizationsService } from './services/OrganizationsService';
import { PersonsService } from './services/PersonsService';
import { PipelineDestinationsService } from './services/PipelineDestinationsService';
import { PipelineDestinationsConfigsService } from './services/PipelineDestinationsConfigsService';
import { PipelineTransformationsService } from './services/PipelineTransformationsService';
import { PipelineTransformationsConfigsService } from './services/PipelineTransformationsConfigsService';
import { PluginConfigsService } from './services/PluginConfigsService';
import { PluginsService } from './services/PluginsService';
import { ProjectsService } from './services/ProjectsService';
import { PromptsService } from './services/PromptsService';
import { PropertyDefinitionsService } from './services/PropertyDefinitionsService';
import { QueryService } from './services/QueryService';
import { ResetTokenService } from './services/ResetTokenService';
import { ResourceAccessService } from './services/ResourceAccessService';
import { RolesService } from './services/RolesService';
import { ScheduledChangesService } from './services/ScheduledChangesService';
import { SearchService } from './services/SearchService';
import { SessionRecordingPlaylistsService } from './services/SessionRecordingPlaylistsService';
import { SessionRecordingsService } from './services/SessionRecordingsService';
import { SubscriptionsService } from './services/SubscriptionsService';
import { SurveysService } from './services/SurveysService';
import { TagsService } from './services/TagsService';
import { TrendService } from './services/TrendService';
import { UploadedMediaService } from './services/UploadedMediaService';
import { WarehouseSavedQueriesService } from './services/WarehouseSavedQueriesService';
import { WarehouseTablesService } from './services/WarehouseTablesService';
import { WarehouseViewLinkService } from './services/WarehouseViewLinkService';
import { WarehouseViewLinksService } from './services/WarehouseViewLinksService';

type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;

export class client {

    public readonly actions: ActionsService;
    public readonly activityLog: ActivityLogService;
    public readonly annotations: AnnotationsService;
    public readonly appMetrics: AppMetricsService;
    public readonly batchExports: BatchExportsService;
    public readonly cohorts: CohortsService;
    public readonly dashboards: DashboardsService;
    public readonly dashboardTemplates: DashboardTemplatesService;
    public readonly dataManagement: DataManagementService;
    public readonly domains: DomainsService;
    public readonly earlyAccessFeature: EarlyAccessFeatureService;
    public readonly eventDefinitions: EventDefinitionsService;
    public readonly events: EventsService;
    public readonly experiments: ExperimentsService;
    public readonly explicitMembers: ExplicitMembersService;
    public readonly exports: ExportsService;
    public readonly externalDataSchemas: ExternalDataSchemasService;
    public readonly externalDataSources: ExternalDataSourcesService;
    public readonly featureFlags: FeatureFlagsService;
    public readonly funnel: FunnelService;
    public readonly groups: GroupsService;
    public readonly groupsTypes: GroupsTypesService;
    public readonly hooks: HooksService;
    public readonly ingestionWarnings: IngestionWarningsService;
    public readonly insights: InsightsService;
    public readonly integrations: IntegrationsService;
    public readonly invites: InvitesService;
    public readonly isGeneratingDemoData: IsGeneratingDemoDataService;
    public readonly members: MembersService;
    public readonly organizations: OrganizationsService;
    public readonly persons: PersonsService;
    public readonly pipelineDestinations: PipelineDestinationsService;
    public readonly pipelineDestinationsConfigs: PipelineDestinationsConfigsService;
    public readonly pipelineTransformations: PipelineTransformationsService;
    public readonly pipelineTransformationsConfigs: PipelineTransformationsConfigsService;
    public readonly pluginConfigs: PluginConfigsService;
    public readonly plugins: PluginsService;
    public readonly projects: ProjectsService;
    public readonly prompts: PromptsService;
    public readonly propertyDefinitions: PropertyDefinitionsService;
    public readonly query: QueryService;
    public readonly resetToken: ResetTokenService;
    public readonly resourceAccess: ResourceAccessService;
    public readonly roles: RolesService;
    public readonly scheduledChanges: ScheduledChangesService;
    public readonly search: SearchService;
    public readonly sessionRecordingPlaylists: SessionRecordingPlaylistsService;
    public readonly sessionRecordings: SessionRecordingsService;
    public readonly subscriptions: SubscriptionsService;
    public readonly surveys: SurveysService;
    public readonly tags: TagsService;
    public readonly trend: TrendService;
    public readonly uploadedMedia: UploadedMediaService;
    public readonly warehouseSavedQueries: WarehouseSavedQueriesService;
    public readonly warehouseTables: WarehouseTablesService;
    public readonly warehouseViewLink: WarehouseViewLinkService;
    public readonly warehouseViewLinks: WarehouseViewLinksService;

    public readonly request: BaseHttpRequest;

    constructor(config?: Partial<OpenAPIConfig>, HttpRequest: HttpRequestConstructor = FetchHttpRequest) {
        this.request = new HttpRequest({
            BASE: config?.BASE ?? '',
            VERSION: config?.VERSION ?? 'null',
            WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
            CREDENTIALS: config?.CREDENTIALS ?? 'include',
            TOKEN: config?.TOKEN,
            USERNAME: config?.USERNAME,
            PASSWORD: config?.PASSWORD,
            HEADERS: config?.HEADERS,
            ENCODE_PATH: config?.ENCODE_PATH,
        });

        this.actions = new ActionsService(this.request);
        this.activityLog = new ActivityLogService(this.request);
        this.annotations = new AnnotationsService(this.request);
        this.appMetrics = new AppMetricsService(this.request);
        this.batchExports = new BatchExportsService(this.request);
        this.cohorts = new CohortsService(this.request);
        this.dashboards = new DashboardsService(this.request);
        this.dashboardTemplates = new DashboardTemplatesService(this.request);
        this.dataManagement = new DataManagementService(this.request);
        this.domains = new DomainsService(this.request);
        this.earlyAccessFeature = new EarlyAccessFeatureService(this.request);
        this.eventDefinitions = new EventDefinitionsService(this.request);
        this.events = new EventsService(this.request);
        this.experiments = new ExperimentsService(this.request);
        this.explicitMembers = new ExplicitMembersService(this.request);
        this.exports = new ExportsService(this.request);
        this.externalDataSchemas = new ExternalDataSchemasService(this.request);
        this.externalDataSources = new ExternalDataSourcesService(this.request);
        this.featureFlags = new FeatureFlagsService(this.request);
        this.funnel = new FunnelService(this.request);
        this.groups = new GroupsService(this.request);
        this.groupsTypes = new GroupsTypesService(this.request);
        this.hooks = new HooksService(this.request);
        this.ingestionWarnings = new IngestionWarningsService(this.request);
        this.insights = new InsightsService(this.request);
        this.integrations = new IntegrationsService(this.request);
        this.invites = new InvitesService(this.request);
        this.isGeneratingDemoData = new IsGeneratingDemoDataService(this.request);
        this.members = new MembersService(this.request);
        this.organizations = new OrganizationsService(this.request);
        this.persons = new PersonsService(this.request);
        this.pipelineDestinations = new PipelineDestinationsService(this.request);
        this.pipelineDestinationsConfigs = new PipelineDestinationsConfigsService(this.request);
        this.pipelineTransformations = new PipelineTransformationsService(this.request);
        this.pipelineTransformationsConfigs = new PipelineTransformationsConfigsService(this.request);
        this.pluginConfigs = new PluginConfigsService(this.request);
        this.plugins = new PluginsService(this.request);
        this.projects = new ProjectsService(this.request);
        this.prompts = new PromptsService(this.request);
        this.propertyDefinitions = new PropertyDefinitionsService(this.request);
        this.query = new QueryService(this.request);
        this.resetToken = new ResetTokenService(this.request);
        this.resourceAccess = new ResourceAccessService(this.request);
        this.roles = new RolesService(this.request);
        this.scheduledChanges = new ScheduledChangesService(this.request);
        this.search = new SearchService(this.request);
        this.sessionRecordingPlaylists = new SessionRecordingPlaylistsService(this.request);
        this.sessionRecordings = new SessionRecordingsService(this.request);
        this.subscriptions = new SubscriptionsService(this.request);
        this.surveys = new SurveysService(this.request);
        this.tags = new TagsService(this.request);
        this.trend = new TrendService(this.request);
        this.uploadedMedia = new UploadedMediaService(this.request);
        this.warehouseSavedQueries = new WarehouseSavedQueriesService(this.request);
        this.warehouseTables = new WarehouseTablesService(this.request);
        this.warehouseViewLink = new WarehouseViewLinkService(this.request);
        this.warehouseViewLinks = new WarehouseViewLinksService(this.request);
    }
}

