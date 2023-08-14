declare namespace ProspectiveCustomer {
  interface DoctorItem {
    doctorName: string;
    doctorId: string;
    mobile: string;
    mobileVerify: string;
    deptName: string;
    hospitalName: string;
    registTime: string;
    approveStatus: string;
    registFrom: string;
    doctorUserId: string;
    gender: string;
    inviteRepName: string;
    inviteRepId: string;
    inviteCode: string;
    pageIndex: number;
    pageSize: number;
    name: string;
    appId: string;
    workplaceApproveStatus: string;
    lastSendStamp: string;
    doctorKeyId: string;
  }

  interface CreateDoctorArchivesParams {
    workplacePhotoUrl2: string;
    workplacePhotoUrl: string;
    workplacePhotoUrl3: string;
    deptName: string;
    deptId: string;
    doctorTitleName: string;
    doctorTitleId: string;
    hospitalName: string;
    hospitalId: string;
    doctorId: string;
    doctorUserId: string;
    doctorKeyId: string;
  }

  interface Inform {
    repId: string;
    doctorId: string;
  }
}
