export interface FormattedPagination {
  currentPage: number;
  limit: number;
  totalPages: number;
};

export interface Response {
  data?: any;
  datetime: number;
  request: string;
  message: string;
  status: number;
};

export interface SetUserGroup {
  groupName: string;
  userPoolId: string;
  username: string;
}

export interface ParsedListItem {
  value: string;
  label: string;
  email: string;
  id: number;
}
