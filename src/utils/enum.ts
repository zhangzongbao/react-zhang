export enum dataStatus {
  INACTIVE,
  ACTIVE,
  DRAFT,
}

export enum sortStatus {
  ascend,
  descend,
}

export enum chapterType {
  SPLIT,
  TITLE,
  TEXT,
  IMAGE,
  VIDEO,
  FILE,
}

export enum wechatUserFilterType {
  ALL,
  SUBSCRIBE,
  UN_SUBSCRIBE,
  NEW,
  SUBSCRIBE_TODAY,
  SUBSCRIBE_3_DAY,
  SUBSCRIBE_7_DAY,
  SUBSCRIBE_15_DAY,
  SUBSCRIBE_30_DAY,
  MODIFY_TODAY,
  MODIFY_3_DAY,
  MODIFY_7_DAY,
  MODIFY_15_DAY,
  MODIFY_30_DAY,
  MODIFY_90_DAY,
  MODIFY_BEFORE_TODAY,
  MODIFY_BEFORE_3_DAY,
  MODIFY_BEFORE_7_DAY,
  MODIFY_BEFORE_15_DAY,
  MODIFY_BEFORE_30_DAY,
  MODIFY_BEFORE_90_DAY,
}

export enum wechatPersonFilterType {
  ALL,
  SUBSCRIBE,
  USER,
  REP,
  DOCTOR,
  WINGWELL,
  MARKED,
  MOBILE,
}

export enum verifyType {
  BLANK,
  DRAFT,
  SUBMITTED,
  SUCCESSFUL,
  REFUSED,
  CANCELED,
}

export const verifyTypeText: any = {
  BLANK: '未填写',
  DRAFT: '未提交',
  SUBMITTED: '待审核',
  SUCCESSFUL: '审批通过',
  REFUSED: '审批驳回',
  CANCELED: '审批取消',
};
