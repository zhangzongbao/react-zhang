declare namespace Navigation {
  type site = {
    pageIds: string[];
    siteId: string;
    siteName: string;
    sort: number;
    systemId: string;
  };

  type Campaign = {
    projectId: string;
    projectName: string;
    campaignId: string;
    campaignName: string;
    campaignType: string;
    campaignPath: string;
    beginDate: string;
    endDate: string;
    logoUrl: string;
    posterUrl: string;
    wechatAppId: string;
    inheritArea: boolean;
    inheritHospital: true;
    inheritDept: boolean;
    sort: number;
    checked?: boolean;
  };

  type Project = {
    projectId: string;
    projectName: string;
    ownerName: string;
    logoUrl: string;
    keyInfo: string;
    slogan: string;
    sort: number;
  };

  type ProjectItem = {
    projectId: string;
    projectName: string;
    ownerName: string;
    keyInfo: string;
    slogan: string;
    logoUrl: string;
    sort: number;
  };

  type CampaignItem = {
    projectId: string;
    projectName: string;
    campaignId: string;
    campaignName: string;
    campaignType: string;
    campaignPath: string;
    beginDate: string;
    endDate: string;
    logoUrl: string;
    posterUrl: string;
    wechatAppId: string;
    inheritArea: boolean;
    inheritHospital: boolean;
    inheritDept: boolean;
  };

  interface PanelData {
    projectList: ProjectItem[];
    campaignList: CampaignItem[];
  }
}
