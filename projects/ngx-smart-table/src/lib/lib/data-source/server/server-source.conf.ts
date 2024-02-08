export class ServerSourceConf {

  protected static readonly SORT_FIELD_KEY = '_sort';
  protected static readonly SORT_DIR_KEY = '_order';
  protected static readonly PAGER_PAGE_KEY = '_page';
  protected static readonly PAGER_LIMIT_KEY = '_limit';
  protected static readonly FILTER_FIELD_KEY = '#field#';
  protected static readonly FILTER_FIELD_OPERATOR = '#operator#';
  protected static readonly TOTAL_KEY = 'x-total-count';
  protected static readonly DATA_KEY = '';

  endPoint: string;
  method: string;
  req: any;

  sortFieldKey: string;
  sortDirKey: string;
  pagerPageKey: string;
  pagerLimitKey: string;
  filterFieldKey: string;
  filterFieldOperator: string;
  totalKey: string;
  dataKey: string;

  constructor(
    { 
      endPoint = '', method = '', req = null,
      sortFieldKey = '', sortDirKey = '',
      pagerPageKey = '', pagerLimitKey = '', filterFieldKey = '', totalKey = '', dataKey = '', filterFieldOperator = '' 
    } = {}) {

    this.endPoint = endPoint ? endPoint : '';
    this.method = method ? method : 'get';
    this.req = req  ? req : {};


    this.sortFieldKey = sortFieldKey ? sortFieldKey : ServerSourceConf.SORT_FIELD_KEY;
    this.sortDirKey = sortDirKey ? sortDirKey : ServerSourceConf.SORT_DIR_KEY;
    this.pagerPageKey = pagerPageKey ? pagerPageKey : ServerSourceConf.PAGER_PAGE_KEY;
    this.pagerLimitKey = pagerLimitKey ? pagerLimitKey : ServerSourceConf.PAGER_LIMIT_KEY;
    this.filterFieldKey = filterFieldKey ? filterFieldKey : ServerSourceConf.FILTER_FIELD_KEY;
    this.filterFieldOperator = filterFieldOperator ? filterFieldOperator : ServerSourceConf.FILTER_FIELD_OPERATOR;
    this.totalKey = totalKey ? totalKey : ServerSourceConf.TOTAL_KEY;
    this.dataKey = dataKey ? dataKey : ServerSourceConf.DATA_KEY;
  }
}
