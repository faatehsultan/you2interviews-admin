import Table from '../../components/molecules/Table';
import { CacheKeys } from '../../redux/enums';
import { useCache } from '../../redux/hooks';
import { USER_LISTING_COLUMNS } from './constants';

export default function Users() {
  const globalDataCalls: any = useCache(CacheKeys.GLOBAL_DATA_CALLS);

  return (
    <div>
      <Table
        columns={USER_LISTING_COLUMNS}
        data={globalDataCalls.value?.users}
        title="Users"
        // showActions
        // newButton
      />
    </div>
  );
}
