import { goHomePage } from '@/services/UserController';
import { Button, Tooltip } from 'antd';

const RightContentRenderComponent = () => {
  return (
    <Tooltip title="返回平台" placement="left">
      <Button
        className="margin-right16"
        type="link"
        onClick={goHomePage}
        icon={
          <svg fontSize={20} className="icon" aria-hidden="true">
            <use xlinkHref="#icon-platform-home" />
          </svg>
        }
      />
    </Tooltip>
  );
};

export default RightContentRenderComponent;
