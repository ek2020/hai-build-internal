export interface IProject {
  project: string;
  metadata: IProjectMetadata;
}

export interface IProjectMetadata {
  name?: string;
  description: string;
  frontend?: boolean;
  backend?: boolean;
  database?: boolean;
  deployment?: boolean;
  createReqt?: boolean;
  id: string;
  createdAt: string;
}

export interface ISolutionResponse {
  brd?: { [key in string]: string }[];
  nfr?: { [key in string]: string }[];
  prd?: { [key in string]: string }[];
  uir?: { [key in string]: string }[];
  createReqt: boolean;
  description: string;
  name: string;
}

export interface IBreadcrumb {
  label: string;
  url?: string;
  state?: {
    [key: string]: any;
  };
  tooltipLabel?: string;
}
