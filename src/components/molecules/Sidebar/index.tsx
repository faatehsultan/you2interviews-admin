import { Badge, Icon, IconButton, Image } from '@chakra-ui/react';
import { Sidebar as ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link, useLocation } from 'react-router-dom';
import {
  BsPeopleFill,
  BsChevronLeft,
  BsChevronRight,
  BsBoxArrowLeft,
} from 'react-icons/bs';
import { MdLiveTv } from 'react-icons/md';
import { BiSolidVideoRecording } from 'react-icons/bi';
import { img_logo } from '../../../assets';
import { useCache } from '../../../redux/hooks';
import { CacheKeys } from '../../../redux/enums';
import { API_SERVICES, useAPIQuery, useUserAuth } from '../../../api';
import { useEffect } from 'react';

export default function Sidebar() {
  const location = useLocation();

  const sidebarCache = useCache(CacheKeys.SIDEBAR_OPEN, true);
  const globalDataCalls = useCache(CacheKeys.GLOBAL_DATA_CALLS, {});

  const { logout } = useUserAuth();

  const usersQuery = useAPIQuery(API_SERVICES.USER.list);
  const sessionsQuery = useAPIQuery(API_SERVICES.SESSIONS.list);

  useEffect(() => {
    globalDataCalls.set({
      users: usersQuery.data,
      sessions: sessionsQuery.data,
    });
  }, [usersQuery.data, sessionsQuery.data]);

  return (
    <ProSidebar className="h-screen" collapsed={!sidebarCache.value}>
      <Menu className="flex flex-col justify-between items-center h-screen">
        <div className="flex flex-col justify-between h-screen items-center py-5">
          <div>
            <div className="flex justify-center items-center">
              <Image
                src={img_logo}
                alt="logo"
                width={150}
                className="mt-7 mx-10 px-2 pb-5"
              />
            </div>
            <MenuItem
              icon={<Icon as={BsPeopleFill} />}
              component={<Link to="/users" />}
              className={location?.pathname == '/users' ? 'bg-gray-100' : ''}
            >
              Users
              <Badge color={'green.400'} ml={2}>
                {usersQuery.data?.length}
              </Badge>
            </MenuItem>
            <MenuItem
              icon={<Icon as={MdLiveTv} />}
              component={<Link to="/live-sessions" />}
              className={
                location?.pathname == '/live-sessions' ? 'bg-gray-100' : ''
              }
            >
              Live Sessions
              <Badge color={'green.400'} ml={2}>
                {sessionsQuery.data?.live?.length}
              </Badge>
            </MenuItem>
            <MenuItem
              icon={<Icon as={BiSolidVideoRecording} />}
              component={<Link to="/recordings" />}
              className={
                location?.pathname == '/recordings' ? 'bg-gray-100' : ''
              }
            >
              Recordings
              <Badge color={'green.400'} ml={2}>
                {sessionsQuery.data?.recorded?.length}
              </Badge>
            </MenuItem>
            <MenuItem
              icon={<Icon as={BsBoxArrowLeft} color={'red.400'} />}
              color={'red.400'}
              onClick={logout}
            >
              <span className="text-red-400">Logout</span>
            </MenuItem>
          </div>
          <div className="w-full hidden">
            <MenuItem>
              <IconButton
                width="100%"
                icon={
                  <Icon
                    as={sidebarCache.value ? BsChevronLeft : BsChevronRight}
                  />
                }
                aria-label="Show"
                onClick={() => sidebarCache.set(!sidebarCache.value)}
              />
            </MenuItem>
          </div>
        </div>
      </Menu>
    </ProSidebar>
  );
}
