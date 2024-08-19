import { API_SERVICES, useAPIQuery } from '../../api';
import Table from '../../components/molecules/Table';
import { USER_LISTING_COLUMNS } from './constants';

export default function Users() {
  const usersQuery = useAPIQuery(API_SERVICES.USER.list);

  return (
    <div>
      <Table
        columns={USER_LISTING_COLUMNS}
        data={usersQuery.data}
        loading={usersQuery.isLoading}
        title="Users"
        // showActions
        // newButton
      />
    </div>
  );
}
