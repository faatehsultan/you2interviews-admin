import { Button, Icon, IconButton, Image } from '@chakra-ui/react';
import { Sidebar as ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
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

export default function Sidebar() {
  const sidebarCache = useCache(CacheKeys.SIDEBAR_OPEN, true);

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
            >
              Users
            </MenuItem>
            <MenuItem icon={<Icon as={MdLiveTv} />} component={<Link to="/" />}>
              Live Sessions
            </MenuItem>
            <MenuItem
              icon={<Icon as={BiSolidVideoRecording} />}
              component={<Link to="/" />}
            >
              Recordings
            </MenuItem>
            <MenuItem
              icon={<Icon as={BsBoxArrowLeft} color={'red.400'} />}
              color={'red.400'}
              onClick={() => {}}
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
