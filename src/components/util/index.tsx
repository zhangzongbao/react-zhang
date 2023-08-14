import { ManOutlined } from '@ant-design/icons';

export function getGender(gender: string | undefined, name: string | undefined, id: string | undefined) {
  switch (gender) {
    case 'M':
      return (
        <div>
          {id ? `【${id}】` : null}
          {name} <ManOutlined style={{ color: '#81A5E3' }} />
        </div>
      );
    case 'F':
      return (
        <div>
          {id ? `【${id}】` : null}
          {name} <ManOutlined style={{ color: '#F58CAB' }} />
        </div>
      );
    default:
      return (
        <div>
          {id ? `【${id}】` : null}
          {name}
        </div>
      );
  }
}
