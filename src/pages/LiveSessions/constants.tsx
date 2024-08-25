import { ColumnProps } from '../../components/molecules/Table';

export const SESSIONS_LISTING_COLUMNS: ColumnProps[] = [
  { key: 'title', label: 'Title', width: '40%' },
  { key: 'channel_name', label: 'ID', width: '30%' },
  { key: 'createdAt', label: 'Created At', width: '30%' },
];
