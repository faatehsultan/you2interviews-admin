import Table from '../../components/molecules/Table';
import { CacheKeys } from '../../redux/enums';
import { useCache } from '../../redux/hooks';
import { SESSIONS_LISTING_COLUMNS } from './constants';

export default function Recordings() {
  const globalDataCalls: any = useCache(CacheKeys.GLOBAL_DATA_CALLS);

  return (
    <div>
      <Table
        columns={SESSIONS_LISTING_COLUMNS}
        data={globalDataCalls.value?.sessions?.recorded}
        title="Recordings"
        // showActions
        // newButton
      />
    </div>
  );
}
