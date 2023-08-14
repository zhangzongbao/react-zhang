import { goHomePage } from '@/services/UserController';
import { Button, Result } from 'antd';

const NotAuthPage = () => {
  return (
    <Result
      status="403"
      title="403"
      subTitle="抱歉，你无权访问该页面"
      extra={
        <Button type="primary" onClick={goHomePage}>
          返回首页
        </Button>
      }
    />
  );
};

export default NotAuthPage;
