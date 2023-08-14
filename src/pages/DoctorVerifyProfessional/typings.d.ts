declare namespace DoctorVerifyProfessional {
  interface DoctorItem {
    verifyId: number;
    doctorId: string;
    doctorName: string;
    hospitalId: string;
    hospitalName: string;
    deptId: string;
    deptName: string;
    deptDescription: string;
    doctorTitleName: string;
    hasCredentialPhoto: true;
    hasLicensePhoto: true;
    status: string;
    submitUserId: string;
    submitUserName: string;
    submitStamp: string;
    verifyUserId: string;
    verifyUserName: string;
    verifyStamp: string;
  }

  interface Model {
    verifyId: number;
    status: string;
    workplaceInfo: {
      hospitalId: string;
      doctorId: string;
      doctorName: string;
      gender: string;
      deptId: string;
      deptDescription: string;
      hospitalPosition: string;
      doctorTitle: string;
      hospitalName: string;
      deptGroupId: string;
      deptGroupName: string;
      deptName: string;
      doctorType: string;
      doctorTitleName: string;
    };
    submitInfo: {
      doctorId: string;
      indentityCode: string;
      credentialPhotoUrl: string;
      credentialPhotoUrl2: string;
      credentialPhotoUrl3: string;
      licensePhotoUrl: string;
      licensePhotoUrl2: string;
      licensePhotoUrl3: string;
      submitUserId: string;
      submitUserName: string;
      submitStamp: string;
    };
    approveInfo: {
      professionalInfo: {
        licenseIssueAgency: string;
        licenseIssueDate: string;
        doctorId: string;
        birthday: string;
        indentityCode: string;
        credentialCode: string;
        licenseCode: string;
        issueDate: string;
        issueAgency: string;
        graduateSchool: string;
        graduateDegree: string;
        graduateMajor: string;
        licenseType: string;
        licenseArea: string;
        licenseSite: string;
        licenseScope: string;
        credentialIssueDate: string;
        credentialIssueAgency: string;
      };
      verifyRemark: string;
      verifyUserId: string;
      verifyUserName: string;
      verifyStamp: string;
    };
  }

  interface Form {
    formData: {
      doctorId: string;
      birthday: string;
      indentityCode: string;
      credentialCode: string;
      licenseCode: string;
      issueDate: string;
      issueAgency: string;
      graduateSchool: string;
      graduateDegree: string;
      graduateMajor: string;
      licenseType: string;
      licenseArea: string;
      licenseSite: string;
      verifyId: number;
      verifyRemark: string;
    };
    workplaceInfo: {
      hospitalId: string;
      doctorId: string;
      doctorName: string;
      gender: string;
      deptId: string;
      deptDescription: string;
      hospitalPosition: string;
      doctorTitle: string;
      hospitalName: string;
      deptGroupId: string;
      deptGroupName: string;
      deptName: string;
      doctorType: string;
      doctorTitleName: string;
    };
    submitInfo: {
      doctorId: string;
      indentityCode: string;
      credentialPhotoUrl: string;
      credentialPhotoUrl2: string;
      credentialPhotoUrl3: string;
      licensePhotoUrl: string;
      licensePhotoUrl2: string;
      licensePhotoUrl3: string;
      submitUserId: string;
      submitUserName: string;
      submitStamp: string;
    };
  }
}
