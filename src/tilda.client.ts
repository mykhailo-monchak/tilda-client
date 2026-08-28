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

export class TildaClient {
  constructor(private readonly publicKey: string, private readonly secretKey: string) {}

  /**
   * @returns The list of available projects
   */
  public async getProjectsList(): Promise<TildaProject[]> {
    const res: Response = await fetch(
      `https://api.tildacdn.info/v1/getprojectslist/?publickey=${this.publicKey}&secretkey=${this.secretKey}`,
    );

    if (res.ok) {
      return (await parseJsonResponse<TildaResponse<TildaProject[]>>(res)).result || [];
    } else {
      await throwTildaError(res);
    }
  }

  /**
   * @returns The information about the project
   */
  public async getProject(projectId: string): Promise<TildaProjectData> {
    const res: Response = await fetch(
      `https://api.tildacdn.info/v1/getproject/?publickey=${this.publicKey}&secretkey=${this.secretKey}&projectid=${projectId}`,
    );

    if (res.ok) {
      return (await parseJsonResponse<TildaResponse<TildaProjectData>>(res)).result;
    } else {
      await throwTildaError(res);
    }
  }

  /**
   * @returns The information about the project for export
   */
  public async getProjectExport(projectId: string): Promise<TildaProjectExport> {
    const res: Response = await fetch(
      `https://api.tildacdn.info/v1/getprojectexport/?publickey=${this.publicKey}&secretkey=${this.secretKey}&projectid=${projectId}`,
    );

    if (res.ok) {
      return (await parseJsonResponse<TildaResponse<TildaProjectExport>>(res)).result;
    } else {
      await throwTildaError(res);
    }
  }

  /**
   * @returns The list of available pages in the project
   */
  public async getPagesList(projectId: string): Promise<TildaPage[]> {
    const res: Response = await fetch(
      `https://api.tildacdn.info/v1/getpageslist/?publickey=${this.publicKey}&secretkey=${this.secretKey}&projectid=${projectId}`,
    );

    if (res.ok) {
      return (await parseJsonResponse<TildaResponse<TildaPage[]>>(res)).result || [];
    } else {
      await throwTildaError(res);
    }
  }

  /**
   * @returns The information about the page (+ body html-code)
   */
  public async getPage(pageId: string): Promise<TildaPageData> {
    const res: Response = await fetch(
      `https://api.tildacdn.info/v1/getpage/?publickey=${this.publicKey}&secretkey=${this.secretKey}&pageid=${pageId}`,
    );

    if (res.ok) {
      return (await parseJsonResponse<TildaResponse<TildaPageData>>(res)).result;
    } else {
      await throwTildaError(res);
    }
  }

  /**
   * @returns The information about the page (+ fullpage html-code)
   */
  public async getPageFull(pageId: string): Promise<TildaPageData> {
    const res: Response = await fetch(
      `https://api.tildacdn.info/v1/getpagefull/?publickey=${this.publicKey}&secretkey=${this.secretKey}&pageid=${pageId}`,
    );

    if (res.ok) {
      return (await parseJsonResponse<TildaResponse<TildaPageData>>(res)).result;
    } else {
      await throwTildaError(res);
    }
  }

  /**
   * @returns The information about the page for export (+ body html-code)
   */
  public async getPageExport(pageId: string): Promise<TildaPageExport> {
    const res: Response = await fetch(
      `https://api.tildacdn.info/v1/getpageexport/?publickey=${this.publicKey}&secretkey=${this.secretKey}&pageid=${pageId}`,
    );

    if (res.ok) {
      return (await parseJsonResponse<TildaResponse<TildaPageExport>>(res)).result;
    } else {
      await throwTildaError(res);
    }
  }

  /**
   * @returns The information about the page for export (+ fullpage html-code)
   */
  public async getPageFullExport(pageId: string): Promise<TildaPageExport> {
    const res: Response = await fetch(
      `https://api.tildacdn.info/v1/getpagefullexport/?publickey=${this.publicKey}&secretkey=${this.secretKey}&pageid=${pageId}`,
    );

    if (res.ok) {
      return (await parseJsonResponse<TildaResponse<TildaPageExport>>(res)).result;
    } else {
      await throwTildaError(res);
    }
  }
}
