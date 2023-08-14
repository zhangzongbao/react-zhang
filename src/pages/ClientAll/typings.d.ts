declare namespace ClientAll {
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
    registStatus: string;
    workplaceCount: string;
    isProfessionalVerified: string;
    sorter: (a: any, b: any) => void;
    status: string;
    validReadTimes: number;
    validReadCount: number;
    readCount: number;
    isContact: number;
    isFriendContact: number;
    hospitalId: string;
  }

  interface AddDoctorWorkplace {
    workplacePhotoUrl2: string;
    workplacePhotoUrl: string;
    workplacePhotoUrl3: string;
    deptId: string;
    isFirst: number | boolean;
    isVerified: number | boolean;
    hospitalId: string;
    doctorId: string;
    deptDescription: string;
    hospitalPosition: string;
  }
  interface UpdateDoctorInfo {
    doctorTypeId: string;
    doctorTitleId: string;
    gender: string;
    birthday: string | any;
    email: string;
    highestDegree: string;
    graduateYear: string | any;
    graduateSchool: string;
    graduateMajor: string;
    workingYear: string;
    patientCount: string;
    remark: string;
    doctorId: string | any;
    doctorName: string;
  }
  interface UpdateDoctorProfessional {
    indentityCode: string;
    credentialCode: string;
    credentialPhotoUrl: string;
    credentialPhotoUrl2: string;
    credentialPhotoUrl3: string;
    credentialIssueDate: string;
    credentialIssueAgency: string;
    licenseCode: string;
    licenseIssueDate: string;
    licenseIssueAgency: string;
    licenseScope: string;
    licenseSite: string;
    licenseType: string;
    licensePhotoUrl: string;
    licensePhotoUrl2: string;
    licensePhotoUrl3: string;
    doctorId: string | any;
  }
}
