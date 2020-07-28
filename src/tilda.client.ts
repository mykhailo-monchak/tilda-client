import { TildaProject, TildaPage, TildaPageData, TildaProjectData } from './tilda.types';
import axios, { AxiosResponse } from 'axios';

export class TildaClient {
  constructor(private readonly publicKey: string, private readonly secretKey: string) {}

  public async getProject(projectId: string): Promise<TildaProjectData> {
    const res: AxiosResponse<TildaResponse<TildaProjectData>> = await axios.get(
      `https://api.tildacdn.info/v1/getproject/?publickey=${this.publicKey}&secretkey=${this.secretKey}&projectid=${projectId}`,
    );

    if (res.status === 200 && res.data.status === 'FOUND') {
      return res.data.result;
    } else {
      throw Error(res.data.message);
    }
  }

  public async getProjectsList(): Promise<TildaProject[]> {
    const res: AxiosResponse<TildaResponse<TildaProject[]>> = await axios.get(
      `https://api.tildacdn.info/v1/getprojectslist/?publickey=${this.publicKey}&secretkey=${this.secretKey}`,
    );

    if (res.status === 200 && res.data.status === 'FOUND') {
      return res.data.result;
    } else {
      throw Error(res.data.message);
    }
  }

  public async getPage(pageId: string): Promise<TildaPageData> {
    const res: AxiosResponse<TildaResponse<TildaPageData>> = await axios.get(
      `https://api.tildacdn.info/v1/getpage/?publickey=${this.publicKey}&secretkey=${this.secretKey}&pageid=${pageId}`,
    );

    if (res.status === 200 && res.data.status === 'FOUND') {
      return res.data.result;
    } else {
      throw Error(res.data.message);
    }
  }

  public async getPagesList(projectId: string): Promise<TildaPage[]> {
    const res: AxiosResponse<TildaResponse<TildaPage[]>> = await axios.get(
      `https://api.tildacdn.info/v1/getpageslist/?publickey=${this.publicKey}&secretkey=${this.secretKey}&projectid=${projectId}`,
    );

    if (res.status === 200 && res.data.status === 'FOUND') {
      return res.data.result;
    } else {
      throw Error(res.data.message);
    }
  }
}

interface TildaResponse<T> {
  status: 'FOUND' | 'ERROR';
  result: T;
  errorside: string;
  message: string;
}
