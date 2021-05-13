export interface TildaResponse<T> {
  status: 'FOUND' | 'ERROR';
  result: T;
  errorside: string;
  message: string;
}

export interface TildaProject {
  id: string;
  title: string;
  descr: string;
}

export interface TildaProjectData extends TildaProject {
  customdomain: string;
  css: string[];
  js: string[];
}

export interface TildaProjectExport extends TildaProject {
  customdomain: string;
  export_csspath: string;
  export_jspath: string;
  export_imgpath: string;
  indexpageid: string;
  css: Array<{
    from: string;
    to: string;
  }>;
  js: Array<{
    from: string;
    to: string;
  }>;
  images: Array<{
    from: string;
    to: string;
  }>;
  htaccess: string;
}

export interface TildaPage {
  id: string;
  projectid: string;
  title: string;
  descr: string;
  img: string;
  featureimg: string;
  alias: string;
  date: string;
  sort: string;
  published: string;
  filename: string;
}

export interface TildaPageData extends TildaPage {
  html: string;
}

export interface TildaPageExport extends TildaPage {
  images: Array<{
    from: string;
    to: string;
  }>;
  html: string;
}
