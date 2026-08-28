import {
  TildaProject,
  TildaPage,
  TildaPageData,
  TildaProjectData,
  TildaResponse,
  throwTildaError,
  parseJsonResponse,
  TildaProjectExport,
  TildaPageExport,
} from '.';
import fetch from 'cross-fetch';

const API_BASE_URL = 'https://api.tildacdn.info/v1';

export class TildaClient {
  constructor(private readonly publicKey: string, private readonly secretKey: string) {}

  private async fetchResult<T>(method: string, params: Record<string, string> = {}): Promise<T> {
    const query = new URLSearchParams({ publickey: this.publicKey, secretkey: this.secretKey, ...params });
    const res: Response = await fetch(`${API_BASE_URL}/${method}/?${query.toString()}`);

    if (res.ok) {
      return (await parseJsonResponse<TildaResponse<T>>(res)).result;
    }
    return throwTildaError(res);
  }

  /**
   * @returns The list of available projects
   */
  public async getProjectsList(): Promise<TildaProject[]> {
    return (await this.fetchResult<TildaProject[]>('getprojectslist')) || [];
  }

  /**
   * @returns The information about the project
   */
  public async getProject(projectId: string): Promise<TildaProjectData> {
    return this.fetchResult<TildaProjectData>('getproject', { projectid: projectId });
  }

  /**
   * @returns The information about the project for export
   */
  public async getProjectExport(projectId: string): Promise<TildaProjectExport> {
    return this.fetchResult<TildaProjectExport>('getprojectexport', { projectid: projectId });
  }

  /**
   * @returns The list of available pages in the project
   */
  public async getPagesList(projectId: string): Promise<TildaPage[]> {
    return (await this.fetchResult<TildaPage[]>('getpageslist', { projectid: projectId })) || [];
  }

  /**
   * @returns The information about the page (+ body html-code)
   */
  public async getPage(pageId: string): Promise<TildaPageData> {
    return this.fetchResult<TildaPageData>('getpage', { pageid: pageId });
  }

  /**
   * @returns The information about the page (+ fullpage html-code)
   */
  public async getPageFull(pageId: string): Promise<TildaPageData> {
    return this.fetchResult<TildaPageData>('getpagefull', { pageid: pageId });
  }

  /**
   * @returns The information about the page for export (+ body html-code)
   */
  public async getPageExport(pageId: string): Promise<TildaPageExport> {
    return this.fetchResult<TildaPageExport>('getpageexport', { pageid: pageId });
  }

  /**
   * @returns The information about the page for export (+ fullpage html-code)
   */
  public async getPageFullExport(pageId: string): Promise<TildaPageExport> {
    return this.fetchResult<TildaPageExport>('getpagefullexport', { pageid: pageId });
  }
}
