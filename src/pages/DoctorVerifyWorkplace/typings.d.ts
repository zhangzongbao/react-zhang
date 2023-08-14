declare namespace DoctorVerifyWorkplace {
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
    hasVerifyPhoto: true;
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
    registInfo: {
      userId: string;
      doctorName: string;
      hospitalName: string;
      deptDescription: string;
      wechatApp: string;
      registStamp: string;
      inviteCode: string;
      registFrom: string;
      inviteInfo: string;
    };
    submitInfo: {
      keyId: number;
      repId: string;
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
      verifyPhotoUrl: string;
      verifyPhotoUrl2: string;
      verifyPhotoUrl3: string;
      submitUserId: string;
      submitUserName: string;
      submitStamp: string;
    };
    approveInfo: {
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
      verifyRemark: string;
      verifyUserId: string;
      verifyUserName: string;
      verifyStamp: string;
    };
    projectList: [
      {
        projectId: string;
        projectName: string;
        status: string;
      },
    ];
  }

  interface Form {
    formData: {
      hospitalId: string;
      doctorId: string;
      doctorName: string;
      gender: string;
      deptId: string;
      deptDescription: string;
      hospitalPosition: string;
      doctorTitle: string;
      verifyId: number;
      projectIds: [string];
      verifyRemark: string;
    };
    registInfo: {
      userId: string;
      doctorName: string;
      hospitalName: string;
      deptDescription: string;
      wechatApp: string;
      registStamp: string;
      inviteCode: string;
      registFrom: string;
      inviteInfo: string;
    };
    submitInfo: {
      keyId: number;
      repId: string;
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
      verifyPhotoUrl: string;
      verifyPhotoUrl2: string;
      verifyPhotoUrl3: string;
      submitUserId: string;
      submitUserName: string;
      submitStamp: string;
    };
    repProjectList: [
      {
        projectId: string;
        projectName: string;
        keyInfo: string;
        slogan: string;
        logoUrl: string;
        sort: number;
      },
    ];
    doctorTitleOptions: [
      {
        key: string;
        text: string;
        sort: number;
      },
    ];
    deptOptions: [
      {
        key: string;
        text: string;
        sort: number;
      },
    ];
  }
}
