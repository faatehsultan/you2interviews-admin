import Table from '../../components/molecules/Table';
import { generateDummyUsers, USER_LISTING_COLUMNS } from './constants';

export default function Users() {
  return (
    <div>
      <Table
        columns={USER_LISTING_COLUMNS}
        data={generateDummyUsers(100)}
        title="Users"
        // newButton
      />
    </div>
  );
}
