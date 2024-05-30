import { HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';

export interface Options {
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      };
  observe?: 'body';
  context?: HttpContext;
  params?:
    | HttpParams
    | {
        [param: string]:
          | string
          | number
          | boolean
          | ReadonlyArray<string | number | boolean>;
      };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  transferCache?:
    | {
        includeHeaders?: string[];
      }
    | boolean;
}

export interface Products {
  items: Product[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

export interface Product {
  id?: number;
  price: string;
  name: string;
  image: string;
  rating: number;
}

export interface PaginationParams {
  [param: string]:
    | string
    | number
    | boolean
    | ReadonlyArray<string | number | boolean>;
  page: number;
  perPage: number;
}

export interface Articles {
  _id: string;
  title: string;
  images: string[];
  content: string;
  postedBy: string;
  idTopic?:any;
  createdAt: string;
  updatedAt: string;
  __v: number;
  views: number;
  slug: string;
  user?: User;
}

export interface PaginatedArticles {
  data: {
    data: Articles[]; 
    totalPages: number; 
    currentPage: number; 
    totalItems: number;
  };
}


export interface User {
  _id: string;
  username: string;
  avatar?: string;
  email: string;
  password: string;
  role:string;
  slug: string;
  articles?:string[];
  followers?:string[]
  createdAt: string;
  updatedAt: string;
  
}
export interface Topics {
  _id: string;
  name: string;
  articles?: any;
  slug: string;
  createdAt: string;
  updatedAt: string;
  data?:any
}
export interface Episodes {
  _id?: string;
  title: string;
  description?: string;
  audioUrl: string;
  duration: string;
  idPodcast: string;
  createdAt: string;
  updatedAt: string;
  
}

